import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'COCOIN – Blockchain educativo sin humo',
  description: 'COCOIN es un meme token educativo y cultural que enseña blockchain con humor, transparencia y propósito comunitario.',
  keywords: 'COCOIN, blockchain educativo, meme token, staking, NFTs con propósito, seguridad digital, comunidad Venezuela',
  verification: {
    google: 'y6SjQrydU_7K6vWL3xgZBQZRXavIXzKru_TqYZ2hCjs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://cocoin-web.vercel.app/" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4297167192050875"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

