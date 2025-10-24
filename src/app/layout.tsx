import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
})
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
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon/jpg" href="icon.jpg" />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
