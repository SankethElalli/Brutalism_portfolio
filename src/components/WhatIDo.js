'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from '@/styles/WhatIDo.module.css'

const services = [
  'AI & Automation',
  'Backend Infrastructure',
  'RAG Systems',
  'GTM Workflows',
  'Multi-Agent Workflows',
  'Full-Stack Development',
]

const TOTAL = services.length

function ScrollItem({ text, index, sectionProgress }) {
  // Each item gets its own slice of the scroll timeline
  const step = 1 / (TOTAL + 1)
  const start = (index + 1) * step - step * 0.2
  const end = start + step * 0.6

  const opacity = useTransform(sectionProgress, [start, end], [0, 1], { clamp: true })
  const y = useTransform(sectionProgress, [start, end], [40, 0], { clamp: true })

  return (
    <motion.li className={styles.listItem} style={{ opacity, y }}>
      {text}
    </motion.li>
  )
}

export default function WhatIDo() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={sectionRef} className={styles.section} id="what-i-do">
      <div className={styles.sticky}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, margin: '-60px' }}
        >
          what I do.
        </motion.h2>

        <ul className={styles.list}>
          {services.map((svc, i) => (
            <ScrollItem
              key={svc}
              text={svc}
              index={i}
              sectionProgress={scrollYProgress}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
