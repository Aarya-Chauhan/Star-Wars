// src/components/Providers.tsx
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}