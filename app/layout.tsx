import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PreferencesProvider } from "@/contexts/preferences-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zamorano Viajes - Tu próxima aventura te espera",
  description: "Más de 20 años organizando viajes únicos e inolvidables. Paquetes en bus, aéreos, cruceros y más.",
  generator: 'Zamorano Viajes',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning={true}>
        <PreferencesProvider>
          {children}
        </PreferencesProvider>
      </body>
    </html>
  )
}
