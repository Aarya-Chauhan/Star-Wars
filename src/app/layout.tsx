'use client'

import './globals.css'
import '../styles/custom-cursor.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Providers } from '../components/Providers'
import { AppContainer } from '../components/AppContainer'
import Preloader from '../components/Preloader'
import Head from 'next/head'
import { Metadata } from 'next'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [rayPosition, setRayPosition] = useState({ x: 0, y: 0, angle: 0 })
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)

    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)


    //@ts-ignore
    router.events?.on('routeChangeStart', handleStart)
    //@ts-ignore
    router.events?.on('routeChangeComplete', handleComplete)
    //@ts-ignore
    router.events?.on('routeChangeError', handleComplete)

    let lastX = 0
    let lastY = 0

    const updateCursorPosition = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      const dx = x - lastX
      const dy = y - lastY
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90

      setRayPosition({ x, y, angle })
      setDotPosition({ x, y })

      lastX = x
      lastY = y
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const isInteractive = e.target.matches('button, a, input[type="submit"], [role="button"]')
        setIsHovering(isInteractive)
      }
    }

    window.addEventListener('mousemove', updateCursorPosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      clearTimeout(timer)
      //@ts-ignore
      router.events?.off('routeChangeStart', handleStart)
      //@ts-ignore
      router.events?.off('routeChangeComplete', handleComplete)
      //@ts-ignore
      router.events?.off('routeChangeError', handleComplete)
      window.removeEventListener('mousemove', updateCursorPosition)
      window.removeEventListener('mouseover', handleMouseOver)
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
              transform: `translate(-50%, -10px) rotate(${rayPosition.angle}deg)`,
            }}
          />
          <div
            className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
            style={{
              left: `${dotPosition.x}px`,
              top: `${dotPosition.y}px`,
              transform: `translate(-50%, -50%)`,
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