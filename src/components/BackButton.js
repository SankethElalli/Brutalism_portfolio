'use client'

import { motion } from 'framer-motion'
import { useTransitionRouter } from 'next-view-transitions'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function BackButton({ className, fallback = '/' }) {
  const router = useTransitionRouter()

  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return (
    <motion.button
      onClick={handleBack}
      className={className}
      aria-label="Go back"
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    >
      <RiArrowLeftLine />
    </motion.button>
  )
}
