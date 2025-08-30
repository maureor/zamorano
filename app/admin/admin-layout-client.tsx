'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from './components/admin-sidebar'
import { useUserPreferences } from '@/contexts/preferences-context'

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUserPreferences()
  

  
  if (pathname === '/admin/login') {
    return <div className="min-h-screen">{children}</div>
  }

  // Renderizar siempre, pero con transición suave
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex h-screen">
        <AdminSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
          onSetCollapsed={setSidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto transition-all duration-200">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
