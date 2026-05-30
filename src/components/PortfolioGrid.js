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
        <h1 className={styles.heading}>work.</h1><br />
        <p className={styles.statement}>
          I work at the intersection of AI & Automation, Full-Stack engineering, and GTM strategy -
          designing intelligent systems that automate repetitive work, orchestrate AI and marketing
          pipelines, and help organizations scale operations with greater efficiency and precision.
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
                <h2 className={styles.title}>{project.title}</h2>
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
