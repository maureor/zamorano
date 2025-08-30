'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { 
  LayoutDashboard,
  Plane,
  MessageSquare,
  Newspaper,
  Megaphone,
  History,
  Settings,
  LogOut,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Viajes',
    href: '/admin/viajes',
    icon: Plane,
  },
  {
    name: 'Testimonios',
    href: '/admin/testimonios',
    icon: MessageSquare,
  },
  {
    name: 'Novedades',
    href: '/admin/novedades',
    icon: Newspaper,
  },
  {
    name: 'Popups',
    href: '/admin/popups',
    icon: Megaphone,
  },
]

const systemNavigation = [
  {
    name: 'Logs de Actividad',
    href: '/admin/logs',
    icon: History,
  },
  {
    name: 'Configuración',
    href: '/admin/configuracion',
    icon: Settings,
  },
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
  onSetCollapsed: (collapsed: boolean) => void
}

export function AdminSidebar({ collapsed, onToggle, onSetCollapsed }: AdminSidebarProps) {
  const pathname = usePathname()

  const handleLogout = () => {
    document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.href = '/admin/login'
  }

  return (
    <aside className={cn(
      "flex h-full flex-col overflow-y-auto border-r bg-white transition-all duration-300",
      collapsed ? "w-16 px-2" : "w-64 px-4"
    )} style={{ 
      // Forzar el ancho para evitar cambios bruscos durante la hidratación
      minWidth: collapsed ? '64px' : '256px',
      maxWidth: collapsed ? '64px' : '256px'
    }}>
      {/* Header con botón de toggle */}
      <div className="flex items-center justify-between py-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded overflow-hidden">
              <Image
                src="/logo.png"
                alt="Zamorano Turismo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Zamorano Admin</h1>
              <p className="text-xs text-muted-foreground">Panel de gestión</p>
            </div>
          </div>
        )}
        
        <button
          onClick={onToggle}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent/50 transition-colors",
            collapsed ? "mx-auto" : ""
          )}
          title={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Logo centrado cuando está colapsada */}
      {collapsed && (
        <div className="flex justify-center py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded overflow-hidden">
            <Image
              src="/logo.png"
              alt="Zamorano Turismo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-4 space-y-1">
        {!collapsed && (
          <div className="px-2 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Gestión de contenido
            </h3>
          </div>
        )}
        
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/50 hover:text-brand-purple-600 transition-all duration-200',
                isActive ? 'bg-accent text-brand-purple-600' : 'text-muted-foreground',
                collapsed ? 'justify-center' : ''
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && item.name}
            </Link>
          )
        })}

        {!collapsed && (
          <div className="px-2 py-2 mt-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Sistema
            </h3>
          </div>
        )}
        
        {systemNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/50 hover:text-brand-purple-600 transition-all duration-200',
                isActive ? 'bg-accent text-brand-purple-600' : 'text-muted-foreground',
                collapsed ? 'justify-center' : ''
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout button */}
      <div className="mt-auto pt-4">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-brand-purple-600 transition-all duration-200",
            collapsed ? "justify-center w-full" : "w-full"
          )}
          title={collapsed ? "Cerrar Sesión" : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Cerrar Sesión"}
        </button>
      </div>
    </aside>
  )
}
