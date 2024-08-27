import './globals.css'
import { Providers } from '../components/Providers'
import { AppContainer } from '../components/AppContainer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppContainer>
            {children}
          </AppContainer>
        </Providers>
      </body>
    </html>
  )
}