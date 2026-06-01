'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/Hero.module.css'

const STATEMENT = 'i get obsessed with making things run on their own.'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const words = STATEMENT.split(' ')

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={`${styles.statement} ${mounted ? styles.play : ''}`}>
          {words.map((word, i) => (
            <span key={i} className={styles.word}>
              <span
                className={styles.wordInner}
                style={{ transitionDelay: `${0.1 + i * 0.07}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}
