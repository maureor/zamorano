import { AdminLayoutClient } from './admin-layout-client'
import { RefreshProvider } from '@/components/ui/refresh-button'
import { PreferencesProvider } from '@/contexts/preferences-context'

export const metadata = {
  title: 'Admin - Zamorano',
  description: 'Panel de administración',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PreferencesProvider>
      <RefreshProvider>
        <AdminLayoutClient>
          {children}
        </AdminLayoutClient>
      </RefreshProvider>
    </PreferencesProvider>
  )
}
