import { ShieldCheck, Cpu, Radio, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid var(--border-stroke)',
      backgroundColor: 'var(--card-bg)',
      padding: '32px 24px 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {/* Top Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--border-stroke)',
          }}>
            <Radio size={20} color="var(--purple-hero)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>18.4 kHz Acoustic Chirp</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Point-to-point zero-pairing soundwave</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--border-stroke)',
          }}>
            <ShieldCheck size={20} color="var(--success-green)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Cryptographic Pre-Auth Pool</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Zero double-spending offline nonces</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--border-stroke)',
          }}>
            <Cpu size={20} color="var(--sound-teal)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Tri-Tier Payment Rails</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Soundwaves • BLE Mesh • Silent USSD</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-stroke)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}>
          <div>
            Built for <strong>Don Bosco Institute of Technology (DBIT Mumbai)</strong> • CampusPay Ecosystem
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://github.com/ManyaShah1/CampusPay"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              GitHub Project <ExternalLink size={12} />
            </a>
            <span style={{ color: 'var(--border-stroke)' }}>|</span>
            <span>Dialogflow ES Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
