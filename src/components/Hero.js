'use client'

import { motion } from 'framer-motion'
import localFont from 'next/font/local'
import styles from '@/styles/Hero.module.css'

const champs = localFont({
  src: [
    { path: '../Champs-Font/champs-regular.otf', weight: '400', style: 'normal' },
    { path: '../Champs-Font/champs-oblique.otf', weight: '400', style: 'oblique' },
  ],
  variable: '--font-champs',
})

const STATEMENT = 'i get obsessed with making things run on their own.'

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

const word = {
  hidden: { y: '60%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero() {
  const words = STATEMENT.split(' ')

  return (
    <section className={`${styles.hero} ${champs.variable}`}>
      <div className={styles.container}>
        <motion.h1
          className={styles.statement}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words.map((w, i) => (
            <motion.span key={i} className={styles.word} variants={word}>
              {w}
            </motion.span>
          ))}
        </motion.h1>
      </div>
    </section>
  )
}
