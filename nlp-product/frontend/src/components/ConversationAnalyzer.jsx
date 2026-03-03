import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Send, Loader2, AlertTriangle, TrendingUp } from 'lucide-react'
import { analyzeConversation } from '../api'
import LabelBadge from './LabelBadge'
import SanityCheckCard from './SanityCheckCard'

export default function ConversationAnalyzer() {
  const [messages, setMessages] = useState(['', '', ''])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const addMessage = () => setMessages([...messages, ''])
  const removeMessage = (i) => setMessages(messages.filter((_, idx) => idx !== i))
  const updateMessage = (i, val) => {
    const copy = [...messages]; copy[i] = val; setMessages(copy)
  }

  const handleAnalyze = async () => {
    const valid = messages.filter(m => m.trim())
    if (valid.length === 0) return
    setLoading(true); setError(null)
    try {
      const data = await analyzeConversation(valid)
      setResult(data)
    } catch (e) {
      setError(e?.response?.data?.detail || 'Analysis failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Paste up to 5 messages in order. The model analyzes the full context window.
          </p>
          <button
            onClick={addMessage}
            disabled={messages.length >= 10}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}
          >
            <Plus size={14} />
            Add
          </button>
        </div>

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
          >
            <span style={{
              color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700,
              marginTop: '11px', width: '20px', textAlign: 'right', flexShrink: 0,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <textarea
              value={msg}
              onChange={e => updateMessage(i, e.target.value)}
              placeholder={`Message ${i + 1}`}
              rows={2}
              style={{
                flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: '8px', color: 'var(--text)', padding: '10px 14px',
                fontSize: '0.88rem', resize: 'vertical', outline: 'none',
                fontFamily: 'inherit', lineHeight: 1.5, transition: 'border-color 0.2s',
              }}
            />
            {messages.length > 1 && (
              <button
                onClick={() => removeMessage(i)}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--text-dim)', cursor: 'pointer',
                  marginTop: '8px', padding: '2px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gaslight)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
              >
                <X size={16} />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading || messages.every(m => !m.trim())}
        className="btn-primary"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        {loading ? (
          <>
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            Analyzing...
          </>
        ) : (
          <>
            <Send size={16} />
            Analyze Conversation
          </>
        )}
      </button>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {error && (
        <div className="card" style={{
          borderColor: 'var(--gaslight-border)',
          background: 'var(--gaslight-bg)',
          color: 'var(--text-muted)', fontSize: '0.85rem',
        }}>
          {error}
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Summary banner */}
            <div className="card" style={{
              borderLeft: result.escalation_detected
                ? '3px solid var(--gaslight)'
                : result.pattern_detected
                  ? '3px solid var(--passive)'
                  : '3px solid var(--sincere)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                {result.escalation_detected ? (
                  <TrendingUp size={18} style={{ color: 'var(--gaslight)' }} />
                ) : result.pattern_detected ? (
                  <AlertTriangle size={18} style={{ color: 'var(--passive)' }} />
                ) : null}
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>
                  {result.escalation_detected ? 'Escalating Pattern Detected' : result.pattern_detected ? 'Toxic Pattern Detected' : 'No Persistent Pattern'}
                </span>
                <LabelBadge label={result.dominant_pattern} size="sm" />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: result.context_note.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>') }} />
            </div>

            {/* Per-message breakdown */}
            <div className="card">
              <p className="section-label">Message Breakdown</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.individual_results.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start',
                      background: 'var(--bg2)', borderRadius: '8px', padding: '12px 14px',
                      borderLeft: `3px solid ${getLabelColor(item.label)}`,
                    }}
                  >
                    <span style={{
                      color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700,
                      width: '20px', flexShrink: 0, paddingTop: '2px', textAlign: 'right',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'var(--text)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '6px' }}>
                        {item.message}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <LabelBadge label={item.label} size="sm" />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.73rem' }}>
                          {(item.confidence * 100).toFixed(0)}% confidence
                        </span>
                        {item.pattern_highlights?.map((p, j) => (
                          <span key={j} style={{
                            background: 'var(--bg3)', color: 'var(--text-muted)',
                            border: '1px solid var(--border)', borderRadius: '4px',
                            padding: '1px 6px', fontSize: '0.7rem', fontFamily: 'monospace',
                          }}>
                            &ldquo;{p}&rdquo;
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {result.pattern_detected && (
              <SanityCheckCard
                sanityCheck={result.sanity_check}
                copingStrategies={result.coping_strategies}
                suggestedResponses={result.suggested_responses}
                severity={result.overall_severity}
                patternHighlights={[]}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function getLabelColor(label) {
  const map = {
    'Gaslighting': 'var(--gaslight)',
    'Sarcastic': 'var(--sarcastic)',
    'Passive-Aggressive': 'var(--passive)',
    'Sincere': 'var(--sincere)',
  }
  return map[label] || 'var(--border)'
}
