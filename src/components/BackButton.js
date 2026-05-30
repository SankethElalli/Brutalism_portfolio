'use client'

import { useRouter } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function BackButton({ className, fallback = '/' }) {
  const router = useRouter()

  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return (
    <button onClick={handleBack} className={className} aria-label="Go back">
      <RiArrowLeftLine />
    </button>
  )
}
