'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { 
  LayoutDashboard,
  Plane,
  Calendar,
  MessageSquare,
  Newspaper,
  Megaphone,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
          {
          name: 'Destinos',
          href: '/admin/viajes',
          icon: Plane,
        },
  {
    name: 'Salidas',
    href: '/admin/salidas',
    icon: Calendar,
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
    disabled: true,
  },
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
  onSetCollapsed: (collapsed: boolean) => void
  isMobile?: boolean
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function AdminSidebar({ 
  collapsed, 
  onToggle, 
  onSetCollapsed: _onSetCollapsed,
  isMobile = false,
  mobileOpen = false,
  onMobileClose
}: AdminSidebarProps) {
  const pathname = usePathname()

  const handleLogout = () => {
    document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.href = '/admin/login'
  }

  const handleLinkClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose()
    }
  }

  return (
    <aside className={cn(
      "flex h-screen flex-col border-r bg-white transition-all duration-300",
      // Desktop styles
      !isMobile && collapsed ? "w-16 px-2" : !isMobile ? "w-64 px-4" : "",
      // Mobile styles
      isMobile && "fixed left-0 top-0 z-50 w-64 px-4 transform transition-transform duration-300",
      isMobile && !mobileOpen && "-translate-x-full",
      isMobile && mobileOpen && "translate-x-0"
    )} style={{ 
      // Forzar el ancho para evitar cambios bruscos durante la hidratación
      minWidth: isMobile ? '256px' : collapsed ? '64px' : '256px',
      maxWidth: isMobile ? '256px' : collapsed ? '64px' : '256px'
    }}>
      {/* Header con botón de toggle */}
      <div className="flex items-center justify-between py-4">
        {(!collapsed || isMobile) && (
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
        
        {!isMobile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggle}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent/50 transition-colors",
                  collapsed ? "mx-auto" : ""
                )}
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Logo centrado cuando está colapsada (solo desktop) */}
      {collapsed && !isMobile && (
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
      <nav className="mt-4 space-y-1 flex-1 overflow-hidden">
        {(!collapsed || isMobile) && (
          <div className="px-2 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Gestión de contenido
            </h3>
          </div>
        )}
        
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          const linkContent = (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/50 hover:text-brand-purple-600 transition-all duration-200',
                isActive ? 'bg-accent text-brand-purple-600' : 'text-muted-foreground',
                collapsed && !isMobile ? 'justify-center' : ''
              )}
            >
              <item.icon className="h-4 w-4" />
              {(!collapsed || isMobile) && item.name}
            </Link>
          )

          if (collapsed && !isMobile) {
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  {linkContent}
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            )
          }

          return linkContent
        })}

        {(!collapsed || isMobile) && (
          <div className="px-2 py-2 mt-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Sistema
            </h3>
          </div>
        )}
        
        {systemNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href)
          const isDisabled = item.disabled
          
          const linkContent = isDisabled ? (
            <div
              key={item.name}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-not-allowed opacity-50',
                collapsed && !isMobile ? 'justify-center' : ''
              )}
            >
              <item.icon className="h-4 w-4 text-muted-foreground" />
              {(!collapsed || isMobile) && <span className="text-muted-foreground">{item.name}</span>}
            </div>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/50 hover:text-brand-purple-600 transition-all duration-200',
                isActive ? 'bg-accent text-brand-purple-600' : 'text-muted-foreground',
                collapsed && !isMobile ? 'justify-center' : ''
              )}
            >
              <item.icon className="h-4 w-4" />
              {(!collapsed || isMobile) && item.name}
            </Link>
          )

          if (collapsed && !isMobile) {
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  {linkContent}
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            )
          }

          return linkContent
        })}
      </nav>

      {/* Logout button */}
      <div className="pt-4 flex-shrink-0">
        {collapsed && !isMobile ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-brand-purple-600 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Cerrar Sesión
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-brand-purple-600 transition-all duration-200 w-full"
          >
            <LogOut className="h-4 w-4" />
            {(!collapsed || isMobile) && "Cerrar Sesión"}
          </button>
        )}
      </div>
    </aside>
  )
}
