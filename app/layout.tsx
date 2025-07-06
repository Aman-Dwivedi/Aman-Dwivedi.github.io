import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aman Dwivedi - Computer Science Researcher & Software Developer',
  description: 'Portfolio of Aman Dwivedi, Computer Science graduate student at UC Davis specializing in memory management systems, full-stack development, and research.',
  keywords: ['Aman Dwivedi', 'Computer Science', 'UC Davis', 'Software Developer', 'Research', 'Memory Management', 'Full-Stack Development'],
  authors: [{ name: 'Aman Dwivedi' }],
  creator: 'Aman Dwivedi',
  publisher: 'Aman Dwivedi',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Aman Dwivedi Portfolio',
    title: 'Aman Dwivedi - Computer Science Researcher & Software Developer',
    description: 'Portfolio of Aman Dwivedi, Computer Science graduate student at UC Davis specializing in memory management systems, full-stack development, and research.',
    images: [
      {
        url: '/aman-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Aman Dwivedi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Dwivedi - Computer Science Researcher & Software Developer',
    description: 'Portfolio of Aman Dwivedi, Computer Science graduate student at UC Davis specializing in memory management systems, full-stack development, and research.',
    images: ['/aman-profile.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
