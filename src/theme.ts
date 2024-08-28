import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: '"Audiowide", "Quantico"',  // or '"Quantico", sans-serif' if you prefer Quantico
    body: 'system-ui, sans-serif',
  },
})

export default theme