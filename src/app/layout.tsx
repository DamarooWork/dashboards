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
        className={`flex flex-col antialiased bg-background text-foreground max-w-[3840px] mx-auto p-5 max-h-screen`}
      >
        <main className="flex flex-1">{children}</main>
      </body>
    </html>
  )
}
