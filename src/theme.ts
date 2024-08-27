import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      // Avoid setting any background styles here
      body: {
        color: 'white', // Set text color to white for better visibility on dark background
      }
    }
  },
  // ... other theme configurations
})

export default theme