'use client'

import { motion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { RiArrowRightLine } from 'react-icons/ri'
import styles from '@/styles/About.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
}

export default function About() {
  return (
    <section className={styles.section} id="about">
      <motion.h2
        className={styles.heading}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        about.
      </motion.h2>

      <div className={styles.content}>
        <motion.div
          className={styles.leftCol}
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className={styles.para}>
            I build AI &amp; automation systems for organizations that have outgrown manual
            operations, fragmented workflows, and fragile infrastructure.<br /><br />
            The result is scalable operational clarity & systems that process volume reliably, make
            intelligent decisions, and continue performing under real-world complexity. <br /><br />
            My work spans AI orchestration, backend infrastructure, retrieval systems,
            and workflow engineering, helping companies turn automation from isolated
            tools into dependable operational architecture built for scale.
          </p>

          <Link href="/about" className={`${styles.aboutBtn} neubrutal-btn`}>
            <span>about me</span>
            <span className={styles.aboutBtnArrow}><RiArrowRightLine /></span>
          </Link>
        </motion.div>

        <motion.div
          className={styles.rightCol}
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <img
            src="/assets/images/profile.jpeg"
            alt="Sanketh Elalli"
            className={styles.photo}
          />
        </motion.div>
      </div>
    </section>
  )
}
