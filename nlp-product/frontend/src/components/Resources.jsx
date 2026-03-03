import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, BookOpen, GraduationCap, ExternalLink, Heart } from 'lucide-react'
import { getResources } from '../api'

const SECTION_CONFIG = {
  crisis:    { label: 'Crisis Support — Immediate Help', icon: Phone, color: 'var(--gaslight)' },
  self_help: { label: 'Self-Help Resources', icon: BookOpen, color: 'var(--sarcastic)' },
  education: { label: 'Educational', icon: GraduationCap, color: 'var(--sincere)' },
}

const STATIC_DATA = {
  crisis: [
    { name: 'Crisis Text Line', detail: 'Text HOME to 741741', url: 'https://www.crisistextline.org' },
    { name: 'National Domestic Violence Hotline', detail: '1-800-799-7233', url: 'https://www.thehotline.org' },
    { name: 'SAMHSA Helpline', detail: '1-800-662-4357 (free, 24/7)', url: 'https://www.samhsa.gov/find-help/national-helpline' },
  ],
  self_help: [
    { name: 'Loveisrespect', detail: 'Chat, call, or text for relationship help', url: 'https://www.loveisrespect.org' },
    { name: '7 Cups', detail: 'Free online chat with trained listeners', url: 'https://www.7cups.com' },
    { name: 'Gaslighting Recovery Workbook', detail: 'Book by Amy Marlow-MaCoy', url: 'https://www.amazon.com/dp/1648481043' },
  ],
  education: [
    { name: 'Psychology Today — Gaslighting', detail: 'Articles on recognizing gaslighting', url: 'https://www.psychologytoday.com/us/basics/gaslighting' },
    { name: 'NAMI', detail: 'National Alliance on Mental Illness', url: 'https://www.nami.org' },
  ],
}

export default function Resources() {
  const [data, setData] = useState(null)
  useEffect(() => { getResources().then(setData).catch(() => setData(null)) }, [])

  const resources = data || STATIC_DATA

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Banner */}
      <div className="card" style={{
        display: 'flex', alignItems: 'flex-start', gap: '14px',
        borderLeft: '3px solid var(--accent)',
      }}>
        <Heart size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          If you or someone you know is experiencing verbal abuse, gaslighting, or emotional harm —{' '}
          <strong style={{ color: 'var(--text)' }}>help is available</strong>. You are not alone.
        </p>
      </div>

      {Object.entries(resources).map(([section, items], si) => {
        const config = SECTION_CONFIG[section]
        if (!config) return null
        const Icon = config.icon
        return (
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: si * 0.08 }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '12px',
            }}>
              <Icon size={15} style={{ color: config.color }} />
              <h3 style={{
                fontWeight: 600, fontSize: '0.78rem',
                color: 'var(--text-muted)', textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {config.label}
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {items.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 18px', textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <p style={{
                      color: 'var(--text)', fontWeight: 600,
                      fontSize: '0.88rem', marginBottom: '3px',
                    }}>
                      {item.name}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {item.detail}
                    </p>
                  </div>
                  <ExternalLink size={16} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
