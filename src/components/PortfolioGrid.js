'use client'

import { useRouter } from 'next/navigation'
import { RiArrowRightLine } from 'react-icons/ri'
import { projects } from '@/data/projects'
import styles from '@/styles/Portfolio.module.css'

export default function PortfolioGrid() {
  const router = useRouter()

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
      </div>
    </div>
  )
}
