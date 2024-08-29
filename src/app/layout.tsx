'use client'

import './globals.css'
import '../styles/custom-cursor.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Providers } from '../components/Providers'
import { AppContainer } from '../components/AppContainer'
import Preloader from '../components/Preloader'
import Head from 'next/head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [rayPosition, setRayPosition] = useState({ x: 0, y: 0, angle: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)

    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events?.on('routeChangeStart', handleStart)
    router.events?.on('routeChangeComplete', handleComplete)
    router.events?.on('routeChangeError', handleComplete)

    let lastX = 0
    let lastY = 0

    const updateRayPosition = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      const dx = x - lastX
      const dy = y - lastY
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90 // Subtract 90 to make it point in the direction of movement

      setRayPosition({ x, y, angle })

      lastX = x
      lastY = y
    }

    window.addEventListener('mousemove', updateRayPosition)

    return () => {
      clearTimeout(timer)
      router.events?.off('routeChangeStart', handleStart)
      router.events?.off('routeChangeComplete', handleComplete)
      router.events?.off('routeChangeError', handleComplete)
      window.removeEventListener('mousemove', updateRayPosition)
    }
  }, [router])

  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Providers>
          <div
            className="cursor-ray"
            style={{
              left: `${rayPosition.x}px`,
              top: `${rayPosition.y}px`,
              transform: `translate(-50%, -10px) rotate(${rayPosition.angle}deg)`,  // Adjusted to center the ray on the cursor
            }}
          />
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