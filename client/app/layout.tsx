import type { Metadata } from 'next'
import { Poppins, Inter, Questrial } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import "./globals.css"
import "../components/components.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-heading',
  weight: "400"
});

const questrial = Questrial({
  subsets: ["latin"],
  variable: '--font-sans',
  weight: "400"
});

export const metadata: Metadata = {
  title: 'Leadzone - Gestor de Leads de Prospección',
  description: 'Importá CSVs de G-Maps Extractor, organizalos por niche y zone, y hacé seguimiento de cada contacto desde un solo lugar.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${poppins.variable} ${questrial.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
