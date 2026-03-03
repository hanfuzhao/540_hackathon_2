import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, AlertTriangle, AlertOctagon, Quote, Lightbulb, MessageCircle } from 'lucide-react'

const SEVERITY_CONFIG = {
  low: {
    label: 'Low Risk',
    color: 'var(--low)',
    bg: 'var(--sincere-bg)',
    border: 'var(--sincere-border)',
    icon: ShieldCheck,
  },
  medium: {
    label: 'Medium Risk',
    color: 'var(--medium)',
    bg: 'var(--sarcastic-bg)',
    border: 'var(--sarcastic-border)',
    icon: AlertTriangle,
  },
  high: {
    label: 'High Risk',
    color: 'var(--high)',
    bg: 'var(--gaslight-bg)',
    border: 'var(--gaslight-border)',
    icon: AlertOctagon,
  },
}

export default function SanityCheckCard({ sanityCheck, copingStrategies, suggestedResponses, severity, patternHighlights }) {
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.low
  const SeverityIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="card"
      style={{
        display: 'flex', flexDirection: 'column', gap: '22px',
        borderLeft: `3px solid ${config.color}`,
      }}
    >
      {/* Severity badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: config.bg, border: `1px solid ${config.border}`,
        borderRadius: '6px', padding: '5px 12px', alignSelf: 'flex-start',
      }}>
        <SeverityIcon size={14} style={{ color: config.color }} />
        <span style={{
          fontSize: '0.75rem', fontWeight: 600,
          color: config.color, textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          {config.label}
        </span>
      </div>

      {/* Sanity check */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
          <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
          <h3 style={{
            fontWeight: 700, fontSize: '0.78rem',
            color: 'var(--text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            Sanity Check
          </h3>
        </div>
        <p style={{
          color: 'var(--text)', lineHeight: 1.7,
          fontSize: '0.9rem', paddingLeft: '21px',
        }}>
          {sanityCheck}
        </p>
      </div>

      {/* Pattern highlights */}
      {patternHighlights?.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
            <Quote size={14} style={{ color: 'var(--passive)' }} />
            <h3 style={{
              fontWeight: 700, fontSize: '0.78rem',
              color: 'var(--text-muted)', textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              Flagged Phrases
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '21px' }}>
            {patternHighlights.map((p, i) => (
              <span key={i} style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '4px', padding: '3px 10px',
                fontSize: '0.8rem', fontFamily: 'monospace',
                color: 'var(--passive)',
              }}>
                &ldquo;{p}&rdquo;
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Coping strategies */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
          <Lightbulb size={14} style={{ color: 'var(--sarcastic)' }} />
          <h3 style={{
            fontWeight: 700, fontSize: '0.78rem',
            color: 'var(--text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            Coping Strategies
          </h3>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '21px' }}>
          {copingStrategies.map((s, i) => (
            <li key={i} style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start',
              color: 'var(--text)', fontSize: '0.86rem', lineHeight: 1.6,
            }}>
              <span style={{
                color: 'var(--sarcastic)', fontWeight: 600,
                fontSize: '0.75rem', marginTop: '3px', flexShrink: 0,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested responses */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
          <MessageCircle size={14} style={{ color: 'var(--sincere)' }} />
          <h3 style={{
            fontWeight: 700, fontSize: '0.78rem',
            color: 'var(--text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            Suggested Responses
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '21px' }}>
          {suggestedResponses.map((r, i) => (
            <div key={i} style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '8px', padding: '12px 16px',
              borderLeft: '3px solid var(--sincere-border)',
              color: 'var(--text)', fontSize: '0.86rem', lineHeight: 1.6,
              fontStyle: 'italic',
            }}>
              &ldquo;{r}&rdquo;
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
