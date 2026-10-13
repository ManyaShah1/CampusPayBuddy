import { NextResponse } from 'next/server';

// Local matcher used when Google Cloud credentials have not yet been provided in .env.local / Vercel
function simulateCampusPayDialogflow(message: string): { reply: string; intent: string; confidence: number } {
  const query = message.toLowerCase().trim();

  if (/\b(hi|hello|hey|greetings)\b/i.test(query)) {
    return {
      intent: 'Default Welcome Intent',
      confidence: 0.99,
      reply: "Hello! I'm the CampusPay Assistant for DBIT Mumbai. Ask me anything about offline soundwave payments (18.4 kHz), BLE Mesh, our Cryptographic Pre-Auth pool, or canteen transactions!",
    };
  }

  if (query.includes('soundwave') || query.includes('chirp') || query.includes('acoustic') || query.includes('18.4') || query.includes('ultrasonic')) {
    return {
      intent: 'Payment.AcousticChirps',
      confidence: 0.96,
      reply: "CampusPay utilizes Ultrasonic Acoustic Chirps modulated at 18.4 kHz (inaudible to human ears). Your smartphone speaker broadcasts an encrypted token payload directly to the canteen Soundbox microphone in ~800ms with zero internet or Bluetooth pairing required.",
    };
  }

  if (query.includes('ble') || query.includes('bluetooth') || query.includes('mesh')) {
    return {
      intent: 'Payment.BLEMesh',
      confidence: 0.94,
      reply: "In noisy environments where acoustic chirps might suffer acoustic interference, CampusPay seamlessly shifts to BLE Mesh advertisements. The merchant terminal captures the broadcasted transaction beacon and queues it in the local ledger.",
    };
  }

  if (query.includes('ussd') || query.includes('*99#') || query.includes('telecom') || query.includes('sim')) {
    return {
      intent: 'Payment.SilentUSSD',
      confidence: 0.95,
      reply: "For feature phones or zero-packet environments, CampusPay triggers a Silent USSD (*99#) session on your SIM. It communicates directly with the National Unified USSD Platform (NUUP) over GSM signaling channels without 4G/5G data.",
    };
  }

  if (query.includes('sync') || query.includes('offline') || query.includes('double spend') || query.includes('ledger') || query.includes('deduct')) {
    return {
      intent: 'Ledger.OfflineSync',
      confidence: 0.93,
      reply: "CampusPay uses an Asynchronous Dual-Ledger system. When offline in the basement canteen, payments deduct from your Cryptographic Pre-Auth Pool locally. Nonce tracking guarantees zero double-spending. The transaction automatically reconciles with the cloud bank server once you reconnect to DBIT Wi-Fi.",
    };
  }

  if (query.includes('wallet') || query.includes('pre-auth') || query.includes('token') || query.includes('balance') || query.includes('vault')) {
    return {
      intent: 'Wallet.PreAuthPool',
      confidence: 0.92,
      reply: "Your device holds a Cryptographic Pre-Authorization Pool (default ₹500 across 5 unique signed nonce tokens). This allows verified off-grid payments up to your pre-allocated limit without contacting the bank in real time.",
    };
  }

  if (query.includes('canteen') || query.includes('where') || query.includes('location') || query.includes('dbit') || query.includes('shop') || query.includes('basement')) {
    return {
      intent: 'Campus.Locations',
      confidence: 0.95,
      reply: "CampusPay is optimized for DBIT Mumbai connectivity dead zones: Basement Canteen, Central Stationery Store, Quadrangle event stalls, and the St. John Baptist campus grounds.",
    };
  }

  if (/\b(who are you|what is campuspay|about campuspay|about this app|overview)\b/i.test(query) || query === 'about') {
    return {
      intent: 'CampusPay.About',
      confidence: 0.98,
      reply: "CampusPay is an offline-first multi-carrier payment system built for DBIT Mumbai. It guarantees zero-latency, fail-safe transactions even in zero-connectivity areas using Ultrasonic Acoustic Chirps, BLE Mesh, and Silent USSD.",
    };
  }

  return {
    intent: 'Default Fallback Intent',
    confidence: 0.35,
    reply: "I am specifically trained on CampusPay and DBIT payment rails. You can ask me about acoustic chirps (18.4 kHz), offline sync, cryptographic pre-auth tokens, or how canteen payments work!",
  };
}

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message text is required' }, { status: 400 });
    }

    const projectId = process.env.DIALOGFLOW_PROJECT_ID;
    const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
    const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY;

    // If Google Cloud credentials are configured in environment variables, call real Dialogflow API
    if (projectId && clientEmail && privateKey) {
      try {
        const dialogflow = await import('@google-cloud/dialogflow');
        const sessionClient = new dialogflow.v2.SessionsClient({
          credentials: {
            client_email: clientEmail,
            private_key: privateKey.replace(/\\n/g, '\n'),
          },
        });

        const sessionPath = sessionClient.projectAgentSessionPath(
          projectId,
          sessionId || 'campuspay-web-session'
        );

        const request = {
          session: sessionPath,
          queryInput: {
            text: {
              text: message,
              languageCode: 'en',
            },
          },
        };

        const [response] = await sessionClient.detectIntent(request);
        const result = response.queryResult;

        return NextResponse.json({
          reply: result?.fulfillmentText || "No response received from Dialogflow agent.",
          intent: result?.intent?.displayName || 'Unknown',
          confidence: result?.intentDetectionConfidence || 0,
          source: 'dialogflow-live',
        });
      } catch (dfErr: any) {
        console.error('Error connecting to Dialogflow API, falling back to local simulation:', dfErr.message);
        // Fallback gracefully so the user is never stranded with an error screen
        const simulated = simulateCampusPayDialogflow(message);
        return NextResponse.json({
          ...simulated,
          source: 'dialogflow-credentials-error-fallback',
          errorDetail: dfErr.message,
        });
      }
    }

    // Otherwise, run through the built-in CampusPay intent simulation while the user finishes configuring Dialogflow
    const simulated = simulateCampusPayDialogflow(message);
    return NextResponse.json({
      ...simulated,
      source: 'dialogflow-mock-mode',
      note: 'Dialogflow environment variables (DIALOGFLOW_PROJECT_ID, DIALOGFLOW_CLIENT_EMAIL, DIALOGFLOW_PRIVATE_KEY) not yet set. Running CampusPay test mode.',
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
