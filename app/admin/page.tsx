'use client'

import { useState, useEffect } from 'react'
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardSkeleton } from "./components/skeletons"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Plane,
  MessageSquare,
  Newspaper,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Clock
} from 'lucide-react'
import Link from 'next/link'

// Datos de ejemplo (en producción vendrían de la base de datos)
const stats = [
  {
    title: "Viajes Activos",
    value: "12",
    description: "+2 este mes",
    icon: Plane,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Testimonios Pendientes",
    value: "5",
    description: "Requieren aprobación",
    icon: MessageSquare,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Novedades Publicadas",
    value: "8",
    description: "+1 esta semana",
    icon: Newspaper,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Visitas del Sitio",
    value: "1,247",
    description: "+12% vs mes anterior",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const quickActions = [
  {
    title: "Crear Nuevo Viaje",
    description: "Agregar un nuevo paquete turístico",
    href: "/admin/viajes/nuevo",
    icon: Plus,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Revisar Testimonios",
    description: "Aprobar o rechazar testimonios pendientes",
    href: "/admin/testimonios",
    icon: Eye,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "Editar Novedades",
    description: "Gestionar el blog y noticias",
    href: "/admin/novedades",
    icon: Edit,
    color: "bg-purple-600 hover:bg-purple-700",
  },
]

const recentActivity = [
  {
    action: "Viaje creado",
    description: "Crucero por el Caribe - 7 días",
    time: "Hace 2 horas",
    type: "create",
  },
  {
    action: "Testimonio aprobado",
    description: "Reseña de María González",
    time: "Hace 4 horas",
    type: "approve",
  },
  {
    action: "Novedad publicada",
    description: "Ofertas de temporada alta",
    time: "Hace 1 día",
    type: "publish",
  },
  {
    action: "Precio actualizado",
    description: "Europa en Bus - Julio 2024",
    time: "Hace 2 días",
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <RefreshButton size="default" className="mt-1" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido al panel de administración de Zamorano Turismo
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {contentSkeleton ? contentSkeleton : (
      <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
                          <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.icon === TrendingUp ? 'bg-brand-purple-100' : ''}`}>
              <stat.icon className={`h-4 w-4 ${stat.icon === TrendingUp ? 'text-brand-purple-600' : stat.color}`} />
            </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accesos directos a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardData.quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 hover:bg-accent hover:border-brand-purple-600"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white mr-4`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones realizadas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'create' ? 'bg-blue-500' :
                    activity.type === 'approve' ? 'bg-green-500' :
                    activity.type === 'publish' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {activity.action}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
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
