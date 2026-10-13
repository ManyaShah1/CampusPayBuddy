'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Radio, Volume2, ShieldCheck, Zap, Bot, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function SoundboxPage() {
  const [transmitting, setTransmitting] = useState(false);
  const [soundboxState, setSoundboxState] = useState<'IDLE' | 'LISTENING' | 'RECEIVED'>('IDLE');
  const [selectedCarrier, setSelectedCarrier] = useState<'ACOUSTIC' | 'BLE' | 'USSD'>('ACOUSTIC');

  const handleTriggerChirp = () => {
    setTransmitting(true);
    setSoundboxState('LISTENING');

    // Safe short audio tone using Web Audio API if supported
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 1700 Hz harmonic audible indicator for demonstration
        osc.frequency.setValueAtTime(1760, ctx.currentTime);
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      console.log('Web Audio tone preview not supported on current device', e);
    }

    setTimeout(() => {
      setTransmitting(false);
      setSoundboxState('RECEIVED');
    }, 1100);
  };

  const handleReset = () => {
    setSoundboxState('IDLE');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 48px' }}>
      {/* Title */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px',
      }}>
        <div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#EDE9FE',
            color: 'var(--purple-hero)',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '6px',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}>
            <Radio size={12} /> Acoustic FSK Demodulation
          </span>
          <h1 style={{ fontSize: '28px', color: 'var(--text-primary)' }}>
            18.4 kHz Ultrasonic Soundbox Simulator
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Hardware & acoustic transmission testing for zero-connectivity point-to-point transactions at DBIT Mumbai.
          </p>
        </div>

        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '10px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-stroke)',
            color: 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <Bot size={15} color="var(--purple-hero)" />
          <span>Ask Assistant about Chirps</span>
        </Link>
      </div>

      {/* Tri-tier Rail Selector */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '16px',
        border: '1px solid var(--border-stroke)',
        padding: '14px',
        marginBottom: '24px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        {[
          { key: 'ACOUSTIC', label: 'Primary: 18.4 kHz Ultrasonic Chirp', icon: Volume2, tag: 'Zero-Pairing' },
          { key: 'BLE', label: 'Secondary: BLE Mesh Beacon', icon: Radio, tag: 'High-Noise Fallback' },
          { key: 'USSD', label: 'Tertiary: Silent USSD (*99#)', icon: Zap, tag: 'Zero-Packet GSM' },
        ].map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedCarrier === tier.key;
          return (
            <button
              key={tier.key}
              onClick={() => setSelectedCarrier(tier.key as any)}
              style={{
                flex: '1 1 240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                border: isSelected ? '2px solid var(--purple-hero)' : '1px solid var(--border-stroke)',
                backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} color={isSelected ? 'var(--purple-hero)' : 'var(--text-secondary)'} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{tier.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tier.tag}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Simulator Bento Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        {/* Transmitter Panel (Student Phone) */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          border: '1px solid var(--border-stroke)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px' }}>Student Mobile Transmitter</h3>
              <span style={{
                backgroundColor: 'var(--card-bg)',
                padding: '3px 8px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
              }}>
                18,400 Hz Carrier
              </span>
            </div>

            <div style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
              border: '1px solid var(--border-stroke)',
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Encrypted Pre-Auth Payload:
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                backgroundColor: '#FFFFFF',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-stroke)',
                wordBreak: 'break-all',
              }}>
                CPAY://PAY?amt=60&nonce=104&uid=DBIT-094&sig=a9f3b2
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              When clicking Broadcast, your device modulates the token payload into near-ultrasonic acoustic tones directed at the merchant soundbox.
            </p>
          </div>

          <button
            onClick={handleTriggerChirp}
            disabled={transmitting}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: transmitting ? '#FBBF24' : 'var(--electric-yellow)',
              color: '#1C1B1B',
              fontWeight: 800,
              fontSize: '14px',
              cursor: transmitting ? 'default' : 'pointer',
              boxShadow: '0 4px 14px rgba(255, 229, 0, 0.4)',
              transition: 'all 0.15s ease',
            }}
          >
            {transmitting ? (
              <>
                <Volume2 size={18} style={{ animation: 'pulseWave 0.8s infinite' }} />
                <span>Broadcasting Acoustic Chirp...</span>
              </>
            ) : (
              <>
                <Play size={18} />
                <span>Broadcast 18.4 kHz Soundwave (₹60.00)</span>
              </>
            )}
          </button>
        </div>

        {/* Receiver Panel (Merchant Canteen Soundbox) */}
        <div style={{
          backgroundColor: '#1C1B1B',
          borderRadius: '18px',
          padding: '24px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid #333333',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: soundboxState === 'RECEIVED' ? '#22C55E' : soundboxState === 'LISTENING' ? '#F59E0B' : '#6B7280',
                }} />
                <h3 style={{ fontSize: '16px', color: '#FFFFFF' }}>DBIT Canteen Soundbox Terminal</h3>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#9CA3AF' }}>
                HW-REV: 2.1
              </span>
            </div>

            {/* Soundbox screen display */}
            <div style={{
              backgroundColor: '#0F0F0F',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #2B2B2B',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '16px',
            }}>
              {soundboxState === 'IDLE' && (
                <div>
                  <Volume2 size={32} color="#6B7280" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#D1D5DB' }}>Awaiting Acoustic Chirp</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Microphone active on 18,400 Hz band</div>
                </div>
              )}

              {soundboxState === 'LISTENING' && (
                <div>
                  <Radio size={32} color="#F59E0B" style={{ marginBottom: '8px', animation: 'spin 1s infinite' }} />
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#FCD34D' }}>Demodulating Chirp Frequencies...</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Verifying payload checksum & CRC32</div>
                </div>
              )}

              {soundboxState === 'RECEIVED' && (
                <div>
                  <CheckCircle2 size={36} color="#22C55E" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                    Payment Received: ₹60.00
                  </div>
                  <div style={{ fontSize: '12px', color: '#4ADE80', marginTop: '4px' }}>
                    Nonce #104 Verified • Stored in Offline Vault
                  </div>
                </div>
              )}
            </div>

            <div style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>
              Hardware Audio Rail: 18.4 kHz (128-bit AES payload)
            </div>
          </div>

          {soundboxState === 'RECEIVED' && (
            <button
              onClick={handleReset}
              style={{
                marginTop: '16px',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#333333',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Reset Terminal for Next Transaction
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
