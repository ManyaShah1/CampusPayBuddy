'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bot, Radio, ReceiptText, Wifi, WifiOff } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const navLinks = [
    { href: '/', label: 'AI Assistant', icon: Bot },
    { href: '/ledger', label: 'Offline Ledger & Vault', icon: ReceiptText },
    { href: '/soundbox', label: '18.4kHz Soundbox', icon: Radio },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-stroke)',
      padding: '12px 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--purple-hero), var(--purple-dark))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '18px',
            boxShadow: '0 4px 12px var(--purple-glow)',
          }}>
            CP
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}>
                CampusPay
              </span>
              <span style={{
                backgroundColor: 'var(--electric-yellow)',
                color: '#1C1B1B',
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                DBIT Mumbai
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Offline-First Dialogflow Assistant
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'var(--card-bg)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--border-stroke)',
        }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: 'none',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--purple-hero)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={15} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Simulated Environment & Repo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Simulated Mode Toggle */}
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            title="Click to toggle simulated DBIT network conditions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              border: `1px solid ${isOfflineMode ? 'var(--warning-amber)' : 'var(--border-stroke)'}`,
              backgroundColor: isOfflineMode ? '#FEF3C7' : 'var(--card-bg)',
              color: isOfflineMode ? '#92400E' : 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isOfflineMode ? (
              <>
                <WifiOff size={13} color="#D97706" />
                <span>Basement Canteen (Offline)</span>
              </>
            ) : (
              <>
                <Wifi size={13} color="#16A34A" />
                <span>DBIT Wi-Fi (Online)</span>
              </>
            )}
          </button>

          {/* GitHub Source Link */}
          <a
            href="https://github.com/ManyaShah1/CampusPay"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--border-stroke)',
              backgroundColor: 'var(--canvas-bg)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
            title="View CampusPay Repository on GitHub"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
