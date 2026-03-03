import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, MessageSquare, MessagesSquare, FlaskConical, Heart, ChevronRight } from 'lucide-react'
import SingleAnalyzer from './components/SingleAnalyzer'
import ConversationAnalyzer from './components/ConversationAnalyzer'
import StressTest from './components/StressTest'
import Resources from './components/Resources'

const TABS = [
  { id: 'single',       label: 'Analyze',        icon: MessageSquare,  desc: 'Single message' },
  { id: 'conversation', label: 'Conversation',    icon: MessagesSquare, desc: 'Multi-message' },
  { id: 'stress',       label: 'Stress Test',     icon: FlaskConical,   desc: 'Model evaluation' },
  { id: 'resources',    label: 'Get Help',         icon: Heart,          desc: 'Support resources' },
]

const FEATURES = [
  { title: 'Sarcasm Detection', desc: 'Catches positive-worded insults that standard sentiment tools miss', color: 'var(--sarcastic)' },
  { title: 'Gaslighting Recognition', desc: 'Identifies language designed to make you doubt your own reality', color: 'var(--gaslight)' },
  { title: 'Passive-Aggression', desc: 'Detects indirect hostility masked as politeness or compliance', color: 'var(--passive)' },
  { title: 'Sanity Validation', desc: 'Provides coping strategies and affirms your perception is valid', color: 'var(--sincere)' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState(null)

  if (!activeTab) {
    return <LandingPage onStart={() => setActiveTab('single')} onNavigate={setActiveTab} />
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
        padding: '0 24px',
        position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{
          maxWidth: '960px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '56px',
        }}>
          <button
            onClick={() => setActiveTab(null)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}
          >
            <Shield size={20} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>
              Gaslight Guard
            </span>
          </button>
          <span style={{
            border: '1px solid var(--border)',
            borderRadius: '20px', padding: '3px 12px',
            fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--sincere)', display: 'inline-block',
            }} />
            RoBERTa-base
          </span>
        </div>
      </header>

      {/* Tab nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)', padding: '0 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', overflowX: 'auto', gap: '4px' }}>
          {TABS.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '12px 16px', fontSize: '0.82rem', fontWeight: 500,
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  whiteSpace: 'nowrap', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: '7px',
                  transition: 'color 0.2s',
                }}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main content */}
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'single'       && <SingleAnalyzer />}
            {activeTab === 'conversation' && <ConversationAnalyzer />}
            {activeTab === 'stress'       && <StressTest />}
            {activeTab === 'resources'    && <Resources />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '24px', textAlign: 'center', marginTop: '40px',
      }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', lineHeight: 1.8 }}>
          For educational purposes only. Does not replace professional mental health support.
          <br />
          <span style={{ color: 'var(--text-muted)' }}>Gaslight Guard</span> · 540 Hackathon 2026 · RoBERTa-base · Zero-Shot + Pattern Matching
        </p>
      </footer>
    </div>
  )
}

function LandingPage({ onStart, onNavigate }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Background gradient */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 111, 245, 0.12), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Minimal header */}
      <header style={{ padding: '20px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{
          maxWidth: '960px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={22} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>
              Gaslight Guard
            </span>
          </div>
          <button
            onClick={() => onNavigate('resources')}
            style={{
              background: 'none', border: '1px solid var(--border)',
              borderRadius: '20px', padding: '6px 16px',
              fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 500, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <Heart size={13} style={{ marginRight: '6px', verticalAlign: '-2px' }} />
            Get Help
          </button>
        </div>
      </header>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '960px', margin: '0 auto',
          padding: '80px 24px 48px',
          textAlign: 'center', position: 'relative', zIndex: 10,
        }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--bg3)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '5px 14px',
          fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '28px',
        }}>
          <Shield size={13} style={{ color: 'var(--accent)' }} />
          NLP-Powered Verbal Abuse Detection
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '20px',
          color: 'var(--text)',
        }}>
          Recognize What Words{' '}
          <span className="gradient-text">Really Mean</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto 40px',
        }}>
          Gaslight Guard uses AI to detect sarcasm, gaslighting, and
          passive-aggression hidden behind seemingly polite language — and
          validates that your feelings are real.
        </p>

        <div style={{
          display: 'flex', gap: '12px',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <button
            onClick={onStart}
            className="btn-primary"
            style={{ width: 'auto', padding: '14px 32px', fontSize: '0.95rem' }}
          >
            Analyze a Message
            <ChevronRight size={16} style={{ marginLeft: '6px', verticalAlign: '-3px' }} />
          </button>
          <button
            onClick={() => onNavigate('conversation')}
            className="btn-secondary"
            style={{ padding: '14px 24px', fontSize: '0.88rem' }}
          >
            Conversation Mode
          </button>
        </div>
      </motion.section>

      {/* Feature cards */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          maxWidth: '960px', margin: '0 auto',
          padding: '20px 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          position: 'relative', zIndex: 10,
        }}
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            className="card"
            style={{ padding: '22px' }}
          >
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: f.color, marginBottom: '14px',
            }} />
            <h3 style={{
              fontSize: '0.88rem', fontWeight: 650,
              color: 'var(--text)', marginBottom: '8px',
            }}>
              {f.title}
            </h3>
            <p style={{
              fontSize: '0.8rem', color: 'var(--text-muted)',
              lineHeight: 1.65,
            }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* How it works */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          maxWidth: '960px', margin: '0 auto',
          padding: '0 24px 80px',
          position: 'relative', zIndex: 10,
        }}
      >
        <h2 style={{
          fontSize: '0.72rem', fontWeight: 600,
          color: 'var(--text-muted)', textTransform: 'uppercase',
          letterSpacing: '0.1em', marginBottom: '24px', textAlign: 'center',
        }}>
          How It Works
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}>
          {[
            { step: '01', title: 'Input', desc: 'Paste a message or conversation you want analyzed' },
            { step: '02', title: 'Classify', desc: 'RoBERTa-base + pattern matching scores across 4 labels' },
            { step: '03', title: 'Validate', desc: 'Get a sanity check, coping strategies, and suggested responses' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
            }}>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700,
                color: 'var(--accent)', marginBottom: '10px', display: 'block',
              }}>
                {s.step}
              </span>
              <h3 style={{
                fontSize: '0.88rem', fontWeight: 650,
                color: 'var(--text)', marginBottom: '6px',
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6,
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '24px', textAlign: 'center',
      }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', lineHeight: 1.8 }}>
          For educational purposes only. Does not replace professional mental health support.
          <br />
          <span style={{ color: 'var(--text-muted)' }}>Gaslight Guard</span> · 540 Hackathon 2026 · RoBERTa-base
        </p>
      </footer>
    </div>
  )
}
