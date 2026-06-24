'use client'

import { useState, useEffect, useRef } from 'react'
import { Link, useTransitionRouter } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiMenuLine, RiArrowRightUpLine } from 'react-icons/ri'
import styles from '@/styles/Navbar.module.css'

const navLinks = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/about' },
  { label: 'work', href: '/work' },
  { label: 'contact', href: '/contact' },
]

/* ── Motion variants ── */
const overlayVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.45, ease: [0.77, 0, 0.18, 1], when: 'beforeChildren', staggerChildren: 0.08, delayChildren: 0.18 },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.4, ease: [0.77, 0, 0.18, 1] },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.15 } },
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const pendingHref = useRef(null)
  const pathname = usePathname()
  const router = useTransitionRouter()
  const isActiveLink = (href) => (
    href === '/'
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)
  )

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastScrollY.current && y > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Menu link click: glitch-close first, then navigate (avoids the view-transition
  // race that fired "InvalidStateError"). Navigation runs in onExitComplete.
  const handleNavClick = (e, href) => {
    e.preventDefault()
    pendingHref.current = href === pathname ? null : href
    setMenuOpen(false)
  }

  const handleExitComplete = () => {
    if (pendingHref.current) {
      router.push(pendingHref.current)
      pendingHref.current = null
    }
  }

  return (
    <>
      <div className={`${styles.navbarWrap} ${hidden ? styles.navbarWrapHidden : ''}`}>
        <nav className={styles.navbar}>
          <div className={styles.container}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoS}>S</span>
              <span className={styles.logoRest}>ANKETH.</span>
            </Link>

            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActiveLink(link.href) ? styles.navLinkActive : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Open menu"
            >
              <RiMenuLine size={22} />
            </button>
          </div>
        </nav>
      </div>

      {/* ── Full-screen glitch menu ── */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {menuOpen && (
          <motion.div
            className={styles.menuOverlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* RGB glitch flash — fires once on open AND on close */}
            <motion.div
              key="glitch"
              className={styles.glitchFlash}
              aria-hidden="true"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 0.9, 0, 0.7, 0, 0.5, 0],
                x: [0, -12, 10, -6, 8, -3, 0],
                backgroundColor: ['#FF5757', '#4361EE', '#00C49A', '#9b9b9b', '#FF5757', '#4361EE', '#00C49A'],
              }}
              exit={{
                opacity: [0, 0.9, 0, 0.7, 0, 0.5, 0],
                x: [0, 12, -10, 6, -8, 3, 0],
                backgroundColor: ['#00C49A', '#4361EE', '#FF5757', '#9b9b9b', '#00C49A', '#4361EE', '#FF5757'],
                transition: { duration: 0.42, times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1] },
              }}
              transition={{ duration: 0.5, times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1], delay: 0.12 }}
            />

            {/* scanline texture */}
            <div className={styles.scanlines} aria-hidden="true" />

            {/* header — close only */}
            <div className={styles.menuHeader}>
              <button
                className={styles.menuClose}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <RiCloseLine size={26} />
              </button>
            </div>

            {/* links */}
            <nav className={styles.menuNav}>
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`${styles.menuLink} ${isActiveLink(link.href) ? styles.menuLinkActive : ''}`}
                  >
                    <span className={styles.glitchText} data-text={link.label}>{link.label}</span>
                    <span className={styles.menuArrow}><RiArrowRightUpLine /></span>
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
