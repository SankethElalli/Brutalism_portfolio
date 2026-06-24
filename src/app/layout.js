import { Space_Grotesk, Bricolage_Grotesque } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
})

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata = {
  title: 'Sanketh Elalli - AI & Automation | Full-Stack Developer',
  description:
    'Portfolio of Sanketh Elalli - AI & Automation Engineer and Full-Stack Developer building reliable systems, RAG pipelines, and multi-agent AI workflows.',
  icons: {
    icon: '/assets/logos/favicon.png',
    shortcut: '/assets/logos/favicon.png',
    apple: '/assets/logos/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${spaceGrotesk.variable} ${bricolageGrotesque.variable}`}>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  )
}
