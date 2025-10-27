import type { Metadata } from 'next'
import './globals.css'
import { Menu } from '@/widgets'
import { LogoRZD } from '@/shared/components'

export const metadata: Metadata = {
  title: 'Dashboards',
  description: 'Demo dashboards',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon/jpg" href="icon.jpg" />
      </head>
      <body
        className={`flex flex-col antialiased bg-background text-foreground max-w-[3840px] mx-auto h-screen overflow-hidden relative`}
      >
        <main className="flex flex-col h-full px-20 py-8 overflow-hidden">
           {children}
        </main>
        <Menu />
      </body>
    </html>
  )
}
