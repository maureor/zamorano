import "styles/tailwind.css"
import { Navigation } from "../components/navigation"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
