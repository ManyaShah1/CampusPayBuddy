import { NextResponse } from 'next/server';

function formatPrivateKey(rawKey: string): string {
  // Strip surrounding quotes if present
  let key = rawKey.trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  // Replace escaped \n with actual newlines
  if (key.includes('\\n')) {
    key = key.replace(/\\n/g, '\n');
  }
  return key;
}

function getDialogflowCredentials(): { projectId: string; clientEmail: string; privateKey: string } | null {
  const projectId = process.env.DIALOGFLOW_PROJECT_ID;
  const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
  const rawKey = process.env.DIALOGFLOW_PRIVATE_KEY;

  if (projectId && clientEmail && rawKey) {
    return {
      projectId: projectId.trim(),
      clientEmail: clientEmail.trim(),
      privateKey: formatPrivateKey(rawKey),
    };
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message text is required' }, { status: 400 });
    }

    const creds = getDialogflowCredentials();

    if (!creds) {
      return NextResponse.json(
        {
          reply: 'Dialogflow credentials missing in environment variables. Set DIALOGFLOW_PROJECT_ID, DIALOGFLOW_CLIENT_EMAIL, and DIALOGFLOW_PRIVATE_KEY in Vercel settings.',
          source: 'missing-credentials',
        },
        { status: 400 }
      );
    }

    const dialogflow = await import('@google-cloud/dialogflow');
    const sessionClient = new dialogflow.v2.SessionsClient({
      credentials: {
        client_email: creds.clientEmail,
        private_key: creds.privateKey,
      },
    });

    const sessionPath = sessionClient.projectAgentSessionPath(
      creds.projectId,
      sessionId || 'campuspay-live-session'
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
      reply: result?.fulfillmentText || "I didn't receive a response from the agent.",
      intent: result?.intent?.displayName || 'Unknown',
      confidence: result?.intentDetectionConfidence || 0,
      source: 'dialogflow-live',
      projectId: creds.projectId,
    });
  } catch (error: any) {
    console.error('Dialogflow API Error on Vercel:', error);
    return NextResponse.json(
      {
        reply: `Error communicating with Dialogflow agent: ${error.message}`,
        error: error.message,
        source: 'dialogflow-error',
      },
      { status: 500 }
    );
  }
}
