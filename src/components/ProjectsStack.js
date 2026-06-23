'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTransitionRouter } from 'next-view-transitions'
import { RiArrowRightLine } from 'react-icons/ri'
import { projects } from '@/data/projects'
import styles from '@/styles/ProjectsStack.module.css'

const CARDS = 4

function useCardScale(sectionProgress, index) {
  const seg = 1 / CARDS
  const start = index * seg
  const end = start + seg
  const minScale = index === CARDS - 1 ? 1 : 1 - (CARDS - 1 - index) * 0.03
  return useTransform(sectionProgress, [start, end], [1, minScale], { clamp: true })
}

function StackCard({ project, index, sectionProgress, onClick }) {
  const scale = useCardScale(sectionProgress, index)

  return (
    <motion.article
      className={styles.entry}
      style={{
        scale,
        zIndex: index + 1,
        '--proj-bg': project.bgColor,
        '--proj-text': project.textColor,
      }}
      onClick={onClick}
    >
      <div className={styles.strip}>
        <span className={styles.year}>{project.year}</span>
        <span className={styles.category}>{project.category}</span>
      </div>

      <div className={styles.titleRow}>
        <h2 className={styles.title}>{project.title}</h2>
        <span className={styles.arrow} aria-hidden="true">
          <RiArrowRightLine />
        </span>
      </div>

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
    </motion.article>
  )
}

function SeeMoreCard({ onClick }) {
  return (
    <article
      className={`${styles.entry} ${styles.seeMore}`}
      style={{ zIndex: CARDS + 1 }}
      onClick={onClick}
    >
      <div className={styles.seeMoreInner}>
        <span className={styles.seeMoreText}>see all work</span>
        <span className={styles.seeMoreArrow}><RiArrowRightLine /></span>
      </div>
    </article>
  )
}

export default function ProjectsStack() {
  const router = useTransitionRouter()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={sectionRef} className={styles.section}>
      {projects.slice(0, CARDS).map((project, index) => (
        <StackCard
          key={project.id}
          project={project}
          index={index}
          sectionProgress={scrollYProgress}
          onClick={() => router.push(`/work/${project.id}`)}
        />
      ))}

      <SeeMoreCard onClick={() => router.push('/work')} />
    </section>
  )
}
