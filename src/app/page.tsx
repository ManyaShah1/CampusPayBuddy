'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, HelpCircle, Shield, Radio, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  intent?: string;
  confidence?: number;
  time: string;
  source?: string;
}

const QUICK_QUESTIONS = [
  { icon: Radio, text: 'How do 18.4 kHz acoustic chirps work?', label: 'Soundwave Pay' },
  { icon: Shield, text: 'How does the Cryptographic Pre-Auth pool prevent double-spending?', label: 'Pre-Auth Security' },
  { icon: RefreshCw, text: 'Explain the Asynchronous Dual-Ledger sync when back online', label: 'Dual-Ledger Sync' },
  { icon: HelpCircle, text: 'What is Silent USSD (*99#) fallback in zero network?', label: 'USSD Fallback' },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Welcome to CampusPay! I am your AI assistant for DBIT Mumbai. Ask me how offline soundwave payments work, how our pre-authorization tokens operate, or how we resolve zero-connectivity transactions.",
      intent: 'Default Welcome Intent',
      confidence: 1.0,
      time: 'Just now',
      source: 'dialogflow',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendMode, setBackendMode] = useState<string>('checking...');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      if (data.source) {
        setBackendMode(data.source);
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || "I didn't catch that, could you rephrase?",
        intent: data.intent,
        confidence: data.confidence,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "Sorry, I encountered a communication issue connecting to the chat service. Please check your network or try again.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'reset',
        sender: 'bot',
        text: "Chat history cleared. How can I assist you with CampusPay today?",
        time: 'Just now',
      },
    ]);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 48px' }}>
      {/* Page Title & Status Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
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
            }}>
              <Sparkles size={12} /> Dialogflow ES Agent
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--card-bg)',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-stroke)',
            }}>
              Pure Domain-Trained
            </span>
          </div>
          <h1 style={{ fontSize: '28px', color: 'var(--text-primary)' }}>
            CampusPay Intelligence Assistant
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Instant answers for offline soundwave transactions, pre-auth tokens, and DBIT campus rails.
          </p>
        </div>

        <button
          onClick={clearChat}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border-stroke)',
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} /> Clear History
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)',
        gap: '24px',
        alignItems: 'start',
      }}>
        {/* Main Chat Interface */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-stroke)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          height: '620px',
        }}>
          {/* Messages Feed */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  backgroundColor: msg.sender === 'user' ? 'var(--purple-hero)' : 'var(--card-bg)',
                  border: `1px solid ${msg.sender === 'user' ? 'var(--purple-dark)' : 'var(--border-stroke)'}`,
                  color: msg.sender === 'user' ? '#FFFFFF' : 'var(--purple-hero)',
                }}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={18} />}
                </div>

                {/* Message Bubble */}
                <div>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '14px',
                    borderTopRightRadius: msg.sender === 'user' ? '4px' : '14px',
                    borderTopLeftRadius: msg.sender === 'bot' ? '4px' : '14px',
                    backgroundColor: msg.sender === 'user'
                      ? 'linear-gradient(135deg, var(--purple-hero), var(--purple-dark))'
                      : 'var(--card-bg)',
                    background: msg.sender === 'user'
                      ? 'linear-gradient(135deg, var(--purple-hero), var(--purple-dark))'
                      : 'var(--card-bg)',
                    color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-stroke)',
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}>
                    {msg.text}
                  </div>

                  {/* Metadata below bot message */}
                  {msg.sender === 'bot' && (msg.intent || msg.time) && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '4px',
                      paddingLeft: '4px',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                    }}>
                      <span>{msg.time}</span>
                      {msg.intent && (
                        <span style={{
                          backgroundColor: '#F3F4F6',
                          color: '#4B5563',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                        }}>
                          intent: {msg.intent}
                        </span>
                      )}
                      {msg.confidence !== undefined && (
                        <span>{Math.round(msg.confidence * 100)}% match</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-stroke)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--purple-hero)',
                }}>
                  <Bot size={18} />
                </div>
                <div style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-stroke)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--purple-hero)',
                    animation: 'pulseWave 1.2s infinite',
                  }} />
                  Analyzing CampusPay intent...
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <div style={{
            padding: '14px 18px',
            borderTop: '1px solid var(--border-stroke)',
            backgroundColor: '#FFFFFF',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
          }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about 18.4 kHz chirps, USSD *99#, or offline ledger sync..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-stroke)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.2s',
                }}
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: 'var(--electric-yellow)',
                  color: '#1C1B1B',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: (loading || !inputText.trim()) ? 'not-allowed' : 'pointer',
                  opacity: (loading || !inputText.trim()) ? 0.6 : 1,
                  transition: 'transform 0.1s ease',
                }}
              >
                <span>Send</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar: Quick Prompts & Architecture Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick Prompts Bento Card */}
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--border-stroke)',
            padding: '18px',
          }}>
            <h3 style={{ fontSize: '15px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--purple-hero)" /> Suggested Queries
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUICK_QUESTIONS.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(q.text)}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-stroke)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '12px',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={14} color="var(--purple-hero)" />
                      <span>{q.label}</span>
                    </div>
                    <ArrowRight size={13} color="var(--text-muted)" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vercel & Dialogflow Status Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-stroke)',
            padding: '18px',
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--success-green)" /> Deployment Readiness
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              This web app connects to the Vercel serverless proxy at <code>/api/chat</code>.
            </p>
            <div style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)',
            }}>
              <div><strong>Status:</strong> {backendMode}</div>
              <div style={{ marginTop: '4px', color: 'var(--text-muted)' }}>
                Vercel Serverless Function Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
