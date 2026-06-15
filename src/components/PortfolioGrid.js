'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RiArrowRightLine } from 'react-icons/ri'
import { automationWorkflows, projects } from '@/data/projects'
import styles from '@/styles/Portfolio.module.css'

export default function PortfolioGrid() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('product')
  const isAutomation = activeSection === 'automation'

  return (
    <div className={styles.page}>

      {/* ── Intro hero ── */}
      <div className={styles.hero}>
        <h1 className={styles.heading}>work.</h1>
        <p className={styles.statement}>
          Intelligent systems at the intersection of AI &amp; Automation, GTM and
          Full-stack engineering - built to help organizations scale with precision.
        </p>
      </div>

      <div className={styles.cardsSection}>
        <div className={styles.switcherWrap}>
          <div className={styles.switcher} role="tablist" aria-label="Work sections">
            <button
              type="button"
              role="tab"
              aria-selected={!isAutomation}
              className={`${styles.switchButton} ${!isAutomation ? styles.switchButtonActive : ''}`}
              onClick={() => setActiveSection('product')}
            >
              Product &amp; Engineering
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isAutomation}
              className={`${styles.switchButton} ${isAutomation ? styles.switchButtonActive : ''}`}
              onClick={() => setActiveSection('automation')}
            >
              AI Agents &amp; Automation
            </button>
          </div>

          <div className={styles.sectionIntro}>
            <h2 className={styles.sectionTitle}>
              {isAutomation ? 'AI Agents & Automation' : 'Product & Engineering'}
            </h2>
          </div>
        </div>

        <div key={activeSection} className={styles.sectionPanel}>
          {isAutomation ? (
            <div className={styles.automationGrid}>
              {automationWorkflows.map((workflow) => (
                <article
                  key={workflow.id}
                  className={styles.automationCard}
                  style={{
                    '--auto-bg': workflow.bgColor,
                    '--auto-text': workflow.textColor,
                  }}
                  onClick={() => router.push(`/work/${workflow.id}`)}
                >
                  <div className={styles.automationStrip}>
                    <span>{workflow.year}</span>
                    <span>{workflow.category}</span>
                  </div>
                  <div className={styles.automationBody}>
                    <h3 className={styles.automationTitle}>{workflow.title}</h3>
                    <p className={styles.automationDesc}>{workflow.description}</p>
                  </div>
                  <div className={styles.automationFooter}>
                    <span>view case study</span>
                    <span className={styles.automationArrow} aria-hidden="true">
                      <RiArrowRightLine />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.list}>
              {projects.map((project) => (
                <div key={project.id} className={styles.entry} style={{ '--proj-bg': project.bgColor }}>

                  {/* Clickable card */}
                  <article
                    className={styles.card}
                    style={{
                      '--proj-text': project.textColor,
                    }}
                    onClick={() => router.push(`/work/${project.id}`)}
                  >
                    {/* Year + category strip */}
                    <div className={styles.strip}>
                      <span className={styles.year}>{project.year}</span>
                      <span className={styles.category}>{project.category}</span>
                    </div>

                    {/* Title + arrow */}
                    <div className={styles.titleRow}>
                      <h2 className={`${styles.title} ${project.title.length > 28 ? styles.titleLong : ''}`}>{project.title}</h2>
                      <span className={styles.arrow} aria-hidden="true">
                        <RiArrowRightLine />
                      </span>
                    </div>

                    {/* Wide image */}
                    <div className={styles.imageWrap}>
                      {project.imageSrc ? (
                        <img
                          src={project.imageSrc}
                          alt={project.title}
                          className={styles.image}
                        />
                      ) : (
                        <div
                          className={styles.imagePlaceholder}
                          style={{ background: project.bgColor, filter: 'brightness(0.82)' }}
                        >
                          <span className={styles.placeholderNum}>
                            {String(project.id).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                    </div>
                  </article>

                  {/* Sticky side description — stays while card is in view */}
                  <div className={styles.sideDesc} style={{ color: project.descColor }}>
                    <p>{project.description}</p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
