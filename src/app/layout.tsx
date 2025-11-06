import type { Metadata } from 'next'
import './globals.css'

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
        <main className="flex flex-col gap-12 h-full px-20 pb-20 pt-8 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
