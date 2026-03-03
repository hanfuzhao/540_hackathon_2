import React from 'react'
import { motion } from 'framer-motion'

const LABEL_COLORS = {
  Sincere: 'var(--sincere)',
  Sarcastic: 'var(--sarcastic)',
  'Passive-Aggressive': 'var(--passive)',
  Gaslighting: 'var(--gaslight)',
}

const LABELS = ['Sincere', 'Sarcastic', 'Passive-Aggressive', 'Gaslighting']

export default function ScoreBar({ scores }) {
  const sorted = LABELS.map(l => [l, scores[l] ?? 0]).sort((a, b) => b[1] - a[1])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sorted.map(([label, score], i) => (
        <div key={label}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: '5px', fontSize: '0.8rem',
          }}>
            <span style={{
              color: i === 0 ? LABEL_COLORS[label] : 'var(--text-muted)',
              fontWeight: i === 0 ? 600 : 400,
            }}>
              {label}
            </span>
            <span style={{
              color: i === 0 ? LABEL_COLORS[label] : 'var(--text)',
              fontWeight: 600,
            }}>
              {(score * 100).toFixed(1)}%
            </span>
          </div>
          <div style={{
            height: '6px', background: 'var(--bg4)',
            borderRadius: '3px', overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: i === 0
                  ? LABEL_COLORS[label]
                  : 'var(--text-dim)',
                borderRadius: '3px',
                opacity: i === 0 ? 1 : 0.5,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
