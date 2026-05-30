'use client'

import { useState } from 'react'
import { RiLinkedinFill, RiMailFill, RiPhoneFill } from 'react-icons/ri'
import styles from '@/styles/Contact.module.css'

const socials = [
  {
    key: 'email',
    label: 'Email',
    handle: 'elallisanketh7@gmail.com',
    href: 'mailto:elallisanketh7@gmail.com',
    icon: <RiMailFill />,
  },
  {
    key: 'phone',
    label: 'Phone',
    handle: '+91 80889 72078',
    href: 'tel:+918088972078',
    icon: <RiPhoneFill />,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/snketh',
    href: 'https://www.linkedin.com/in/snketh',
    icon: <RiLinkedinFill />,
  }

]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', msg: "Message sent! I'll get back to you soon." })
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus({ type: 'error', msg: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>say hi.</h1>
          <p className={styles.statement}>
            If you&apos;re building with AI, scaling operations, or looking to modernize how your
            business executes, let&apos;s connect. Reach out to discuss a project, collaboration, or
            explore how intelligent systems, automation, and software engineering can create
            measurable impact.
          </p>
        </div>
      </div>

      {/* ── Form + socials ── */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* Left — form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={styles.input}
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className={styles.input}
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell me about your project or idea..."
                className={styles.textarea}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {status && (
              <div
                className={`${styles.statusMsg} ${
                  status.type === 'success' ? styles.statusSuccess : styles.statusError
                }`}
              >
                {status.msg}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>

          {/* Right — socials */}
          <div className={styles.socials}>
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === 'linkedin' ? '_blank' : undefined}
                rel={s.key === 'linkedin' ? 'noopener noreferrer' : undefined}
                className={`${styles.socialRow} ${styles[s.key]}`}
              >
                <span className={styles.socialIcon}>{s.icon}</span>
                <span className={styles.socialMeta}>
                  <span className={styles.socialLabel}>{s.label}</span>
                  <span className={styles.socialHandle}>{s.handle}</span>
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}
