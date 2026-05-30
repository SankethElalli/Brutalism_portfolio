'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { RiArrowRightLine } from 'react-icons/ri'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  const isContact = pathname.startsWith('/contact')
  const isLight = pathname === '/' || pathname.startsWith('/portfolio') || isContact

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={ref} className={`${styles.footer} ${visible ? styles.visible : ''} ${isLight ? styles.footerLight : ''}`}>
      <div className={styles.inner}>

        {/* Top row — brand + contact button */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.logoS}>S</span>
              <span className={styles.logoRest}>ANKETH.</span>
            </span>
            <p className={styles.role}>AI &amp; Automation Engineer | Full-Stack Developer</p>
          </div>
          {!isContact && (
            <Link href="/contact" className={styles.contactBtn}>
              <span>contact</span>
              <span className={styles.arrow}><RiArrowRightLine /></span>
            </Link>
          )}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Copyright centered */}
        <p className={styles.copyright}>
          &copy; <span className={styles.accent}>Sanketh Elalli</span> 2026 - All rights reserved
        </p>

      </div>
    </footer>
  )
}
