'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxImage({ src, alt, className, wrapClassName, innerClassName, style }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Image moves up slightly as you scroll past it — subtle 12% shift
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  return (
    <div ref={ref} className={wrapClassName}>
      <div className={innerClassName}>
        <motion.img
          src={src}
          alt={alt}
          className={className}
          style={{ ...style, y, willChange: 'transform' }}
        />
      </div>
    </div>
  )
}
