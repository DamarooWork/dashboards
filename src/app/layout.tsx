import type { Metadata } from 'next'
import './globals.css'
import { Menu } from '@/widgets'

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
        className={`flex flex-col antialiased bg-background text-foreground max-w-[3840px] mx-auto   max-h-screen relative`}
      >
        <main className="flex flex-1 max-h-screen px-20 py-20 pt-12">{children}</main>
        <Menu />
      </body>
    </html>
  )
}
