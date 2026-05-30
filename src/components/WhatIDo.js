'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '@/styles/WhatIDo.module.css'

export default function WhatIDo() {
  const bodyRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} id="what-i-do">
      <h2 className={styles.heading}>what I do.</h2>
      <p
        ref={bodyRef}
        className={`${styles.body} ${visible ? styles.visible : ''}`}
      >
        AI &amp; Automation. Backend Infrastructure. RAG Systems. 
        Multi-Agent Workflows. Full-Stack Development. Workflow Engineering.
      </p>
    </section>
  )
}
