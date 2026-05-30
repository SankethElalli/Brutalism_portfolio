'use client'

import { useState } from 'react'
import { experiences } from '@/data/experiences'
import styles from '@/styles/ExperienceTable.module.css'

export default function ExperienceTable() {
  const [active, setActive] = useState(null)

  return (
    <>
      <div className={styles.table}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.row}>
            <div
              className={styles.logo}
              style={exp.logoSrc ? {} : { background: exp.logoColor, color: exp.logoTextColor }}
            >
              {exp.logoSrc
                ? <img src={exp.logoSrc} alt={exp.company} className={styles.logoImg} />
                : exp.logoInitials
              }
            </div>

            <div className={styles.main}>
              <span className={styles.company}>
                {exp.company.includes('Pvt. Ltd')
                  ? <>{exp.company.replace(' Pvt. Ltd', '')}<br /><span style={{ whiteSpace: 'nowrap' }}>Pvt. Ltd</span></>
                  : exp.company
                }
              </span>
              <span className={styles.role}>{exp.role}</span>
            </div>

            <span className={styles.location}>{exp.location}</span>

            <span className={styles.desc}>{exp.description}</span>

            <button
              className={styles.infoBtn}
              onClick={() => setActive(exp)}
              title="View contributions"
            >
              i
            </button>
          </div>
        ))}
      </div>

      {/* Overlay */}
      {active && (
        <div className={styles.overlay} onClick={() => setActive(null)}>
          <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.panelHeader}>
              <div className={styles.panelMeta}>
                <h3 className={styles.panelCompany}>{active.company}</h3>
                <div className={styles.panelDivider} />
                <p className={styles.panelRole}>
                  {active.role} <span className={styles.panelSep}>|</span> {active.period}
                </p>
              </div>
              <button className={styles.close} onClick={() => setActive(null)}>✕</button>
            </div>
            <ul className={styles.panelList}>
              {active.achievements.map((a, i) => (
                <li key={i} className={styles.panelItem}>{a}</li>
              ))}
            </ul>
            <div className={styles.panelSkills}>
              {active.skills.map((s) => (
                <span key={s} className={styles.panelSkill}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
