'use client'

import {useEffect, useState} from 'react'
import {Button} from '@/components/ui/button'

type Props = {
  title: string
  description: string
  accept: string
  decline: string
}

const STORAGE_KEY = 'psoriatinin-cookie-consent'

type Consent = 'accepted' | 'declined'

export function CookieBanner({title, description, accept, decline}: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(STORAGE_KEY) as Consent | null
    if (!stored) {
      setVisible(true)
    }
  }, [])

  const handleChoice = (value: Consent) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 py-6 shadow-soft">
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-sm text-neutral-700">
          <p className="text-base font-semibold text-neutral-900">{title}</p>
          <p>{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => handleChoice('accepted')} className="px-6 py-2 text-sm">
            {accept}
          </Button>
          <Button onClick={() => handleChoice('declined')} variant="secondary" className="px-6 py-2 text-sm">
            {decline}
          </Button>
        </div>
      </div>
    </div>
  )
}
