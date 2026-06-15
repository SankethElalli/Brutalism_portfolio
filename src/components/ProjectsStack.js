'use client'

import { useRouter } from 'next/navigation'
import { RiArrowRightLine } from 'react-icons/ri'
import { projects } from '@/data/projects'
import styles from '@/styles/ProjectsStack.module.css'

export default function ProjectsStack() {
  const router = useRouter()

  return (
    <section className={styles.section}>
      {projects.slice(0, 4).map((project, index) => (
        <article
          key={project.id}
          className={styles.entry}
          style={{
            zIndex: index + 1,
            '--proj-bg': project.bgColor,
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
                style={{ objectPosition: project.imagePosition || 'center' }}
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
      ))}

      {/* See more card */}
      <article
        className={`${styles.entry} ${styles.seeMore}`}
        style={{ zIndex: 6 }}
        onClick={() => router.push('/work')}
      >
        <div className={styles.seeMoreInner}>
          <span className={styles.seeMoreText}>see more</span>
          <span className={styles.seeMoreArrow}>
            <RiArrowRightLine />
          </span>
        </div>
      </article>
    </section>
  )
}
