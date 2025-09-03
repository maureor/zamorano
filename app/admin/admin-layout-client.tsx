'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from './components/admin-sidebar'
import { useUserPreferences } from '@/contexts/preferences-context'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    setSidebarCollapsed,
    isMobile,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    toggleMobileSidebar
  } = useUserPreferences()
  
  if (pathname === '/admin/login') {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex h-screen">
        {/* Mobile Header */}
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 py-3 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileSidebar}
                  className="p-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-lg font-semibold">Zamorano Admin</h1>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <AdminSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
          onSetCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-200",
          isMobile ? "pt-16 pb-20" : "pb-8"
        )}>
          <div className={cn(
            "p-4 md:p-8",
            isMobile ? "pt-4 pb-8" : ""
          )}>
            {children}
          </div>
        </main>

        {/* Mobile Overlay */}
        {isMobile && mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
