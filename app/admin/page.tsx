'use client'

import { useState, useEffect } from 'react'
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Plane,
  Calendar,
  Newspaper,
  Megaphone,
  History,
  Plus,
  Edit,
  Clock,
  Star
} from 'lucide-react'
import Link from 'next/link'

// Datos de ejemplo (en producción vendrían de la base de datos)
const stats = [
  {
    title: "Destinos Activos",
    value: "8",
    description: "+1 este mes",
    icon: Plane,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Salidas Programadas",
    value: "24",
    description: "Próximas salidas",
    icon: Calendar,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Testimonios",
    value: "15",
    description: "Rating promedio: 4.8",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Novedades Activas",
    value: "6",
    description: "+2 esta semana",
    icon: Newspaper,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Popups Activos",
    value: "3",
    description: "En diferentes secciones",
    icon: Megaphone,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Logs de Actividad",
    value: "1,247",
    description: "Últimos 30 días",
    icon: History,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const quickActions = [
  {
    title: "Crear Nuevo Destino",
    description: "Agregar un nuevo destino turístico",
    href: "/admin/viajes",
    icon: Plus,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Gestionar Salidas",
    description: "Crear y administrar fechas de salida",
    href: "/admin/salidas",
    icon: Calendar,
    color: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    title: "Ver Testimonios",
    description: "Revisar testimonios de clientes",
    href: "/admin/testimonios",
    icon: Star,
    color: "bg-yellow-600 hover:bg-yellow-700",
  },
  {
    title: "Gestionar Novedades",
    description: "Crear y editar noticias del blog",
    href: "/admin/novedades",
    icon: Edit,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "Configurar Popups",
    description: "Administrar popups promocionales",
    href: "/admin/popups",
    icon: Megaphone,
    color: "bg-orange-600 hover:bg-orange-700",
  },
  {
    title: "Ver Logs del Sistema",
    description: "Revisar actividad del sistema",
    href: "/admin/logs",
    icon: History,
    color: "bg-purple-600 hover:bg-purple-700",
  },
]

const recentActivity = [
  {
    action: "Destino creado",
    description: "Mendoza - Ruta del Vino",
    time: "Hace 2 horas",
    type: "create",
  },
  {
    action: "Salida programada",
    description: "Salida Enero - Bariloche",
    time: "Hace 4 horas",
    type: "schedule",
  },
  {
    action: "Testimonio agregado",
    description: "Reseña de Carlos Mendoza",
    time: "Hace 6 horas",
    type: "testimonial",
  },
  {
    action: "Novedad publicada",
    description: "Promociones de verano 2024",
    time: "Hace 1 día",
    type: "publish",
  },
  {
    action: "Popup activado",
    description: "Oferta especial cruceros",
    time: "Hace 2 días",
    type: "popup",
  },
  {
    action: "Precio actualizado",
    description: "Salida Febrero - Mendoza",
    time: "Hace 3 días",
    type: "update",
  },
]

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({ stats, quickActions, recentActivity })
  
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar datos del dashboard
  const fetchDashboardData = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1200))
    setDashboardData({ stats, quickActions, recentActivity })
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('dashboard-data', fetchDashboardData)

  // Mostrar skeleton solo para el contenido interno (NO el header)
  const contentSkeleton = loading || isRefreshing ? (
    <>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-20 mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <Skeleton className="h-8 w-8" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Skeleton className="h-2 w-2 rounded-full mt-2" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  ) : null

  return (
    <div className="space-y-8 min-w-0 overflow-hidden">
      {/* Header */}
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 rounded-2xl opacity-50"></div>
        
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-start gap-4 min-w-0">
            <div className="flex-shrink-0">
              <RefreshButton size="default" className="mt-1" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-green-200 shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-700">Sistema Activo</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <p className="text-slate-600 text-base">
                    ¡Hola <span className="font-semibold text-slate-900">Walter</span>! 👋
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">
                      {new Date().toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:ml-auto">
            <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">Última actualización</div>
                <div className="text-slate-500">{new Date().toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {contentSkeleton ? contentSkeleton : (
      <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardData.stats.map((stat) => (
          <Card key={stat.title} className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground break-words">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Acciones Rápidas</CardTitle>
            <CardDescription className="hidden sm:block">
              Accesos directos a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {dashboardData.quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-1.5 sm:p-3 hover:bg-accent hover:border-brand-purple-600 text-left"
                  >
                    <div className={`p-1 sm:p-2 rounded-lg ${action.color} text-white mr-1.5 sm:mr-3 flex-shrink-0`}>
                      <action.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="font-medium text-xs sm:text-sm break-words leading-tight">{action.title}</div>
                      <div className="text-xs text-muted-foreground break-words hidden sm:block leading-tight mt-0.5">
                        {action.description}
                      </div>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Actividad Reciente</CardTitle>
            <CardDescription className="hidden sm:block">
              Últimas acciones realizadas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3 min-w-0">
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'create' ? 'bg-blue-500' :
                    activity.type === 'schedule' ? 'bg-indigo-500' :
                    activity.type === 'testimonial' ? 'bg-yellow-500' :
                    activity.type === 'publish' ? 'bg-green-500' :
                    activity.type === 'popup' ? 'bg-orange-500' :
                    activity.type === 'update' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <p className="text-xs sm:text-sm font-medium truncate">
                      {activity.action}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground flex-shrink-0">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="whitespace-nowrap">{activity.time}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      </>
      )}
    </div>
  )
}
