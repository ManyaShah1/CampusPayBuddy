# CampusPay Dialogflow Agent Quick Reference

Use these intents and training phrases directly in your Dialogflow Console (**Intents > Create Intent**).

---

### 1. `CampusPay.About`
- **Training Phrases**:
  - What is CampusPay?
  - Explain this application
  - Why do we need CampusPay at DBIT?
  - How does CampusPay work?
  - What makes CampusPay offline?
- **Text Response**:
  - `CampusPay is an offline-first multi-carrier payment system engineered for DBIT Mumbai. It guarantees zero-latency, fail-safe transactions even in zero-connectivity areas like basement canteens and auditoriums.`

---

### 2. `Payment.AcousticChirps`
- **Training Phrases**:
  - How do acoustic chirps work?
  - Tell me about 18.4 kHz soundwave payment
  - What is ultrasonic sound payment?
  - How does soundwave transfer money without internet?
  - Does the soundwave payment make noise?
- **Text Response**:
  - `CampusPay utilizes Ultrasonic Acoustic Chirps modulated at 18.4 kHz (inaudible to human ears). Your smartphone speaker broadcasts an encrypted token payload directly to the canteen Soundbox microphone in ~800ms with zero internet or Bluetooth pairing required.`

---

### 3. `Payment.BLEMesh`
- **Training Phrases**:
  - How does Bluetooth or BLE payment work?
  - What is BLE Mesh fallback?
  - What happens if the canteen is too noisy for soundwaves?
  - When is BLE Mesh used?
- **Text Response**:
  - `In noisy environments where acoustic chirps might suffer acoustic interference, CampusPay seamlessly shifts to BLE Mesh advertisements. The merchant terminal captures the broadcasted transaction beacon and queues it in the local ledger.`

---

### 4. `Payment.SilentUSSD`
- **Training Phrases**:
  - What is Silent USSD *99#?
  - How do payments work on feature phones?
  - What if my phone has no data or 4G?
  - What is the tertiary payment rail?
- **Text Response**:
  - `For feature phones or zero-packet environments, CampusPay triggers a Silent USSD (*99#) session on your SIM. It communicates directly with the National Unified USSD Platform (NUUP) over GSM signaling channels without 4G/5G data.`

---

### 5. `Ledger.OfflineSync`
- **Training Phrases**:
  - How does offline sync work?
  - Will money be deducted twice?
  - What is the dual ledger?
  - How do transactions reconcile when back online?
- **Text Response**:
  - `CampusPay uses an Asynchronous Dual-Ledger system. When offline in the basement canteen, payments deduct from your Cryptographic Pre-Auth Pool locally. Nonce tracking guarantees zero double-spending. The transaction automatically reconciles with the cloud bank server once you reconnect to DBIT Wi-Fi.`

---

### 6. `Wallet.PreAuthPool`
- **Training Phrases**:
  - What is the cryptographic pre-auth pool?
  - How much can I spend offline?
  - What are nonce tokens?
  - How does wallet security work offline?
- **Text Response**:
  - `Your device holds a Cryptographic Pre-Authorization Pool (default ₹500 across 5 unique signed nonce tokens). This allows verified off-grid payments up to your pre-allocated limit without contacting the bank in real time.`

---

### 7. `Campus.Locations`
- **Training Phrases**:
  - Where can I use CampusPay?
  - Which locations support CampusPay at DBIT?
  - Can I pay in the basement canteen?
  - Does the stationery shop accept CampusPay?
- **Text Response**:
  - `CampusPay is optimized for DBIT Mumbai connectivity dead zones: Basement Canteen, Central Stationery Store, Quadrangle event stalls, and the St. John Baptist campus grounds.`

---

### 8. `Default Fallback Intent`
- **Action / Response**:
  - `I am specifically trained on CampusPay and DBIT payment rails. You can ask me about acoustic chirps (18.4 kHz), offline sync, cryptographic pre-auth tokens, or how canteen payments work!`
