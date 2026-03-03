import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, Play, Loader2, Check, X } from 'lucide-react'
import { runStressTest } from '../api'

export default function StressTest() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleRun = async () => {
    setLoading(true); setError(null)
    try {
      const data = await runStressTest()
      setResult(data)
    } catch (e) {
      setError(e?.response?.data?.detail || 'Test failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="card" style={{
        display: 'flex', alignItems: 'flex-start', gap: '16px',
      }}>
        <FlaskConical size={22} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h3 style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--text)', fontSize: '0.95rem' }}>
            Sarcastic Sentiment Flip Test
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
            Runs &ldquo;positive-worded&rdquo; insults through the model to check whether it correctly
            labels them as <strong style={{ color: 'var(--sarcastic)' }}>Sarcastic</strong> rather
            than <strong style={{ color: 'var(--sincere)' }}>Sincere</strong>.
            Pass threshold: <strong style={{ color: 'var(--text)' }}>70%</strong> accuracy.
          </p>
        </div>
      </div>

      <button
        onClick={handleRun}
        disabled={loading}
        className="btn-primary"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        {loading ? (
          <>
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            Running...
          </>
        ) : (
          <>
            <Play size={16} />
            Run Stress Test
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
            {/* Overall result */}
            <div className="card" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '12px',
              borderLeft: `3px solid ${result.accuracy >= 0.7 ? 'var(--sincere)' : 'var(--gaslight)'}`,
            }}>
              <div>
                <p style={{
                  fontWeight: 700, fontSize: '1.1rem',
                  color: result.accuracy >= 0.7 ? 'var(--sincere)' : 'var(--gaslight)',
                  marginBottom: '4px',
                }}>
                  {result.verdict}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {result.correct}/{result.total} correctly identified as Sarcastic
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontSize: '2.2rem', fontWeight: 700,
                  color: result.accuracy >= 0.7 ? 'var(--sincere)' : 'var(--gaslight)',
                }}>
                  {(result.accuracy * 100).toFixed(0)}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>%</span>
                </p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>threshold: 70%</p>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              height: '6px', background: 'var(--bg4)', borderRadius: '3px', overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.accuracy * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%', borderRadius: '3px',
                  background: result.accuracy >= 0.7
                    ? 'linear-gradient(90deg, var(--sincere), #22c55e)'
                    : 'linear-gradient(90deg, var(--gaslight), #ef4444)',
                }}
              />
            </div>

            {/* Individual results */}
            <div className="card">
              <p className="section-label">Sample Results</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {result.results.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    style={{
                      display: 'flex', gap: '10px', alignItems: 'center',
                      background: 'var(--bg2)', borderRadius: '8px', padding: '10px 14px',
                      borderLeft: `3px solid ${r.passed ? 'var(--sincere)' : 'var(--gaslight)'}`,
                    }}
                  >
                    <span style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: r.passed ? 'var(--sincere-bg)' : 'var(--gaslight-bg)',
                      border: `1px solid ${r.passed ? 'var(--sincere-border)' : 'var(--gaslight-border)'}`,
                      flexShrink: 0,
                    }}>
                      {r.passed
                        ? <Check size={12} style={{ color: 'var(--sincere)' }} />
                        : <X size={12} style={{ color: 'var(--gaslight)' }} />
                      }
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'var(--text)', fontSize: '0.83rem', lineHeight: 1.5 }}>{r.text}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '3px' }}>
                        Predicted: <strong style={{ color: r.passed ? 'var(--sincere)' : 'var(--gaslight)' }}>{r.predicted}</strong>
                        {' '}({(r.confidence * 100).toFixed(0)}%) — Expected: {r.expected}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
