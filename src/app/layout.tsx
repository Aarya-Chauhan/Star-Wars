'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Providers } from '../components/Providers'
import { AppContainer } from '../components/AppContainer'
import Preloader from '../components/Preloader'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate initial loading time (you can remove this in production)
    const timer = setTimeout(() => setLoading(false), 3000)

    // Handle route change events
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events?.on('routeChangeStart', handleStart)
    router.events?.on('routeChangeComplete', handleComplete)
    router.events?.on('routeChangeError', handleComplete)

    return () => {
      clearTimeout(timer)
      router.events?.off('routeChangeStart', handleStart)
      router.events?.off('routeChangeComplete', handleComplete)
      router.events?.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <html lang="en">
      <body>
        <Providers>
          {loading ? (
            <Preloader />
          ) : (
            <AppContainer>
              {children}
            </AppContainer>
          )}
        </Providers>
      </body>
    </html>
  )
}