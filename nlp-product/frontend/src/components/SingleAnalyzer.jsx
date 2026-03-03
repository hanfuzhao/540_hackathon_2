import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { analyzeSingle } from '../api'
import LabelBadge from './LabelBadge'
import ScoreBar from './ScoreBar'
import SanityCheckCard from './SanityCheckCard'

const EXAMPLES = {
  Gaslighting: "You're way too sensitive. I never said that — you're imagining things. No one else thinks there's a problem here.",
  Sarcastic: "Oh wow, what a brilliant idea! I'm sure completely ignoring everyone's feedback will totally work out great for you.",
  'Passive-Aggressive': "Fine, do whatever you want. I'm sure you know best. Don't worry about me at all.",
  Sincere: "I appreciate you sharing that with me. It sounds really difficult, and I'm here if you want to talk.",
}

const LABEL_COLORS = {
  Gaslighting: 'var(--gaslight)',
  Sarcastic: 'var(--sarcastic)',
  'Passive-Aggressive': 'var(--passive)',
  Sincere: 'var(--sincere)',
}

export default function SingleAnalyzer() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeSingle(text.trim())
      setResult(data)
    } catch (e) {
      setError(e?.response?.data?.detail || 'Analysis failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Quick examples */}
      <div>
        <p className="section-label">Try an example</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {Object.entries(EXAMPLES).map(([label, ex]) => (
            <button
              key={label}
              onClick={() => { setText(ex); setResult(null) }}
              className="btn-secondary"
              style={{
                borderLeft: `3px solid ${LABEL_COLORS[label]}`,
                borderRadius: '6px',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Text input */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleAnalyze() }}
          placeholder="Paste or type a message to analyze... (Ctrl+Enter to run)"
          rows={5}
          maxLength={2000}
          style={{
            width: '100%', background: 'var(--bg3)',
            border: '1px solid var(--border)', borderRadius: '10px',
            color: 'var(--text)', padding: '16px', fontSize: '0.9rem',
            resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
            transition: 'border-color 0.2s',
          }}
        />
        <span style={{
          position: 'absolute', bottom: '12px', right: '14px',
          color: 'var(--text-dim)', fontSize: '0.7rem',
        }}>
          {text.length}/2000
        </span>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading || !text.trim()}
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
            Analyze
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
            {/* Result header */}
            <div className="card" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: '12px',
              borderLeft: `3px solid ${LABEL_COLORS[result.label] || 'var(--accent)'}`,
            }}>
              <div>
                <p className="section-label" style={{ marginBottom: '8px' }}>Result</p>
                <LabelBadge label={result.label} size="lg" />
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '2px' }}>Confidence</p>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: LABEL_COLORS[result.label] || 'var(--text)' }}>
                  {(result.confidence * 100).toFixed(0)}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>%</span>
                </p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>{result.elapsed_seconds}s</p>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="card">
              <p className="section-label">Score Breakdown</p>
              <ScoreBar scores={result.all_scores} />
            </div>

            <SanityCheckCard
              sanityCheck={result.sanity_check}
              copingStrategies={result.coping_strategies}
              suggestedResponses={result.suggested_responses}
              severity={result.severity}
              patternHighlights={result.pattern_highlights}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
