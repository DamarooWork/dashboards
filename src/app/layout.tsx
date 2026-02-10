import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/shared/components/providers'

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
        <link rel="icon" type="image/png" href="icon.png" />
      </head>
      <Providers>
        <body
          suppressHydrationWarning
          className={`flex flex-col antialiased text-foreground max-w-[3840px] mx-auto h-screen overflow-hidden relative`}
        >
          <main className="flex flex-col gap-12 h-full px-20 pb-20 pt-8 overflow-hidden">
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}
