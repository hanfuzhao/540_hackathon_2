import React from 'react'

const LABEL_STYLES = {
  Sincere: {
    color: 'var(--sincere)',
    background: 'var(--sincere-bg)',
    borderColor: 'var(--sincere-border)',
  },
  Sarcastic: {
    color: 'var(--sarcastic)',
    background: 'var(--sarcastic-bg)',
    borderColor: 'var(--sarcastic-border)',
  },
  'Passive-Aggressive': {
    color: 'var(--passive)',
    background: 'var(--passive-bg)',
    borderColor: 'var(--passive-border)',
  },
  Gaslighting: {
    color: 'var(--gaslight)',
    background: 'var(--gaslight-bg)',
    borderColor: 'var(--gaslight-border)',
  },
}

const DEFAULT_STYLE = {
  color: 'var(--text-muted)',
  background: 'var(--bg4)',
  borderColor: 'var(--border)',
}

export default function LabelBadge({ label, size = 'md' }) {
  const fs = size === 'lg' ? '0.88rem' : size === 'sm' ? '0.7rem' : '0.78rem'
  const px = size === 'lg' ? '14px' : size === 'sm' ? '8px' : '10px'
  const py = size === 'lg' ? '5px' : '3px'
  const style = LABEL_STYLES[label] || DEFAULT_STYLE

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: style.background,
      color: style.color,
      border: `1px solid ${style.borderColor}`,
      borderRadius: '6px',
      padding: `${py} ${px}`,
      fontSize: fs,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      letterSpacing: '0.01em',
    }}>
      <span style={{
        width: size === 'sm' ? '5px' : '6px',
        height: size === 'sm' ? '5px' : '6px',
        borderRadius: '50%',
        background: style.color,
        display: 'inline-block',
      }} />
      {label}
    </span>
  )
}
