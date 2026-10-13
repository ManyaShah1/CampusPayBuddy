'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, CheckCircle, Clock, ArrowUpRight, Lock, Hash, Bot } from 'lucide-react';

interface LedgerItem {
  id: string;
  merchant: string;
  amount: number;
  time: string;
  carrier: '18.4kHz Chirp' | 'BLE Mesh' | 'Silent USSD *99#';
  status: 'SYNCED' | 'QUEUED_OFFLINE';
  hash: string;
  nonce: number;
}

const INITIAL_TRANSACTIONS: LedgerItem[] = [
  {
    id: 'TXN-9021',
    merchant: 'DBIT Basement Canteen (Counter 2)',
    amount: 60.00,
    time: '12:42 PM (Today)',
    carrier: '18.4kHz Chirp',
    status: 'QUEUED_OFFLINE',
    hash: '0x8f3a...b24c',
    nonce: 104,
  },
  {
    id: 'TXN-8842',
    merchant: 'Campus Stationery & Print Hub',
    amount: 140.00,
    time: '10:15 AM (Today)',
    carrier: 'BLE Mesh',
    status: 'SYNCED',
    hash: '0x3e1d...9f80',
    nonce: 103,
  },
  {
    id: 'TXN-7910',
    merchant: 'Engineering Quadrangle Juice Stall',
    amount: 45.00,
    time: 'Yesterday',
    carrier: 'Silent USSD *99#',
    status: 'SYNCED',
    hash: '0x9a7b...110e',
    nonce: 102,
  },
];

export default function LedgerPage() {
  const [transactions, setTransactions] = useState<LedgerItem[]>(INITIAL_TRANSACTIONS);
  const [syncing, setSyncing] = useState(false);

  const handleSimulateSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((item) => ({
          ...item,
          status: 'SYNCED',
        }))
      );
      setSyncing(false);
    }, 1200);
  };

  const queuedCount = transactions.filter((t) => t.status === 'QUEUED_OFFLINE').length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 48px' }}>
      {/* Header */}
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
            backgroundColor: '#DCFCE7',
            color: '#15803D',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '6px',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}>
            <ShieldCheck size={12} /> Cryptographic Nonce Vault
          </span>
          <h1 style={{ fontSize: '28px', color: 'var(--text-primary)' }}>
            Offline Ledger & Pre-Auth Pool
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Dual-ledger audit trail reconciling zero-connectivity canteen payments with DBIT cloud servers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSimulateSync}
            disabled={syncing || queuedCount === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: queuedCount > 0 ? 'var(--electric-yellow)' : 'var(--card-bg)',
              color: '#1C1B1B',
              fontSize: '13px',
              fontWeight: 700,
              cursor: queuedCount > 0 ? 'pointer' : 'default',
              transition: 'all 0.2s',
            }}
          >
            <RefreshCw size={15} style={{ animation: syncing ? 'spin 1s infinite linear' : 'none' }} />
            <span>{syncing ? 'Reconciling Ledger...' : queuedCount > 0 ? `Reconcile ${queuedCount} Offline Txns` : 'Ledger In Sync'}</span>
          </button>
        </div>
      </div>

      {/* Hero Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {/* Hero ID-1 Wallet Card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--purple-hero), var(--purple-dark))',
          borderRadius: '20px',
          padding: '24px',
          color: '#FFFFFF',
          boxShadow: '0 8px 24px var(--purple-glow)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '210px',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>
                DBIT Mumbai • Student ID Card
              </span>
              <Lock size={16} />
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '12px', opacity: 0.85 }}>Available Pre-Auth Pool</div>
              <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                ₹420.00
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          }}>
            <div>
              <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Student UID</div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>DBIT-2024-CS-094</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Active Nonces</div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>3 of 5 Available</div>
            </div>
          </div>
        </div>

        {/* Cryptographic Pre-Auth Health Card */}
        <div style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid var(--border-stroke)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px' }}>Pre-Auth Token Health</h3>
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: '#DCFCE7',
                color: '#166534',
                padding: '2px 8px',
                borderRadius: '6px',
              }}>
                Secured
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Pre-allocated cryptographically signed nonces protect your wallet against double-spending when paying in dead zones.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
            }}>
              {[
                { id: 1, spent: true, nonce: '#101' },
                { id: 2, spent: true, nonce: '#102' },
                { id: 3, spent: false, nonce: '#103' },
                { id: 4, spent: false, nonce: '#104' },
                { id: 5, spent: false, nonce: '#105' },
              ].map((token) => (
                <div
                  key={token.id}
                  style={{
                    backgroundColor: token.spent ? '#E5E7EB' : '#FFFFFF',
                    border: `1px solid ${token.spent ? '#D1D5DB' : 'var(--sound-teal)'}`,
                    borderRadius: '8px',
                    padding: '8px 4px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: token.spent ? '#9CA3AF' : '#0F766E' }}>
                    {token.nonce}
                  </div>
                  <div style={{ fontSize: '9px', color: token.spent ? '#9CA3AF' : '#14B8A6' }}>
                    {token.spent ? 'Used' : 'Ready'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/"
              style={{
                fontSize: '12px',
                color: 'var(--purple-hero)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Bot size={13} /> Ask Assistant about Pre-Auth security
            </Link>
          </div>
        </div>
      </div>

      {/* Ledger Table Section */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-stroke)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-stroke)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontSize: '16px' }}>Dual-Ledger Audit Trail</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Real-time synchronization status across DBIT offline soundboxes and cloud ledger.
            </p>
          </div>
          <span style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
          }}>
            Showing {transactions.length} records
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-stroke)' }}>
                <th style={{ padding: '12px 18px', fontWeight: 600 }}>Transaction ID</th>
                <th style={{ padding: '12px 18px', fontWeight: 600 }}>Merchant / Zone</th>
                <th style={{ padding: '12px 18px', fontWeight: 600 }}>Carrier Rail</th>
                <th style={{ padding: '12px 18px', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '12px 18px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '12px 18px', fontWeight: 600 }}>Payload Hash</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-stroke)' }}>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {tx.id}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{tx.merchant}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tx.time}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border-stroke)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}>
                      {tx.carrier}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '14px' }}>
                    -₹{tx.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {tx.status === 'SYNCED' ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}>
                        <CheckCircle size={12} /> Synced
                      </span>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#FEF3C7',
                        color: '#B45309',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}>
                        <Clock size={12} /> Queued Offline
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Hash size={12} />
                      <span>{tx.hash}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
