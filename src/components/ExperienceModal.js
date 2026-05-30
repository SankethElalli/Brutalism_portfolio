'use client'

import { useState, useEffect } from 'react'
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine, RiMapPinLine, RiTimeLine } from 'react-icons/ri'
import { experiences } from '@/data/experiences'
import styles from '@/styles/ExperienceModal.module.css'

export default function ExperienceModal({ isOpen, onClose }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) setCurrent(0)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKey(e) {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, current])

  if (!isOpen) return null

  const exp = experiences[current]
  const total = experiences.length

  function goNext() {
    setDirection(1)
    setCurrent((i) => (i + 1) % total)
  }

  function goPrev() {
    setDirection(-1)
    setCurrent((i) => (i - 1 + total) % total)
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalShell} role="dialog" aria-modal="true">

        {/* Floating header — no bar */}
        <div className={styles.floatHeader}>
          <h2 className={styles.floatTitle}>Work Experience</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <RiCloseLine />
          </button>
        </div>

        {/* Carousel row */}
        <div className={styles.carouselRow}>
          <button
            className={styles.arrowBtn}
            onClick={goPrev}
            aria-label="Previous experience"
          >
            <RiArrowLeftSLine />
          </button>

          {/* Card */}
          <div className={styles.card}>
            <div
              key={`${current}-${direction}`}
              data-dir={direction}
              className={styles.cardInner}
            >
              {/* Company header */}
              <div className={styles.companyRow}>
                <div
                  className={styles.logo}
                  style={{ background: exp.logoColor, color: exp.logoTextColor }}
                >
                  {exp.logoSrc
                    ? <img src={exp.logoSrc} alt={exp.company} className={styles.logoImg} />
                    : exp.logoInitials
                  }
                </div>
                <div className={styles.companyInfo}>
                  <h3 className={styles.companyName}>{exp.company}</h3>
                  <p className={styles.role}>{exp.role}</p>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      <RiTimeLine className={styles.metaIcon} />{exp.period}
                    </span>
                    <span className={styles.metaItem}>
                      <RiMapPinLine className={styles.metaIcon} />{exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className={styles.platform}>{exp.description}</p>

              {/* Achievements */}
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Key Achievements &amp; Contributions</h4>
                <ul className={styles.list}>
                  {exp.achievements.map((item, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.bullet}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Skills</h4>
                <div className={styles.skillTags}>
                  {exp.skills.map((s) => (
                    <span key={s} className={styles.skill}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            className={styles.arrowBtn}
            onClick={goNext}
            aria-label="Next experience"
          >
            <RiArrowRightSLine />
          </button>
        </div>

        {/* Dots + counter */}
        <div className={styles.bottomRow}>
          <div className={styles.dots}>
          {experiences.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              aria-label={`Go to experience ${i + 1}`}
            />
          ))}
          </div>
          <span className={styles.counter}>{current + 1} / {total}</span>
        </div>

      </div>
    </div>
  )
}
