'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from './admin-sidebar'

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  if (pathname === '/admin/login') {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
