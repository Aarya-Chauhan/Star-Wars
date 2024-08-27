'use client'

import { Box } from '@chakra-ui/react'

export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box id="app-container" minHeight="100vh">
      {children}
    </Box>
  )
}