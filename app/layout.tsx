import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientSessionProvider from './components/ClientSessionProvider';


export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather with Google OAuth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  )
}
