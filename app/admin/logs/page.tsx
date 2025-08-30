'use client'

import { useState, useEffect } from 'react'
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  Calendar,
  User,
  Activity,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'

// Datos de ejemplo de logs
const logsEjemplo = [
  {
    id: '1',
    action: 'CREATE',
    resource: 'Viaje',
    resourceId: 'viaje-001',
    resourceName: 'Crucero por el Mediterráneo',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-15T10:30:00Z',
    details: 'Creó un nuevo viaje con 2 fechas de salida',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  },
  {
    id: '2',
    action: 'UPDATE',
    resource: 'Testimonio',
    resourceId: 'testimonio-005',
    resourceName: 'Testimonio de María González',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-15T09:15:00Z',
    details: 'Aprobó el testimonio para mostrar en el sitio web',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  },
  {
    id: '3',
    action: 'DELETE',
    resource: 'Novedad',
    resourceId: 'novedad-003',
    resourceName: 'Promoción expirada',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-14T16:45:00Z',
    details: 'Eliminó novedad caducada',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  },
  {
    id: '4',
    action: 'UPDATE',
    resource: 'Viaje',
    resourceId: 'viaje-002',
    resourceName: 'Europa en Bus - 15 días',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-14T14:20:00Z',
    details: 'Actualizó precios para la temporada alta',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  },
  {
    id: '5',
    action: 'CREATE',
    resource: 'Popup',
    resourceId: 'popup-001',
    resourceName: 'Oferta Especial Cruceros',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-13T11:30:00Z',
    details: 'Creó popup promocional con descuento del 25%',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  },
  {
    id: '6',
    action: 'LOGIN',
    resource: 'Sistema',
    resourceId: 'session-001',
    resourceName: 'Inicio de sesión',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-13T09:00:00Z',
    details: 'Acceso exitoso al panel de administración',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  },
]

const acciones = ['Todas', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']
const recursos = ['Todos', 'Viaje', 'Testimonio', 'Novedad', 'Popup', 'Sistema']

export default function LogsAdminPage() {
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState(logsEjemplo)
  
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar datos
  const fetchLogs = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 800))
    setLogs(logsEjemplo)
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('logs-list', fetchLogs)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE':
        return <Plus className="h-4 w-4 text-green-600" />
      case 'UPDATE':
        return <Edit className="h-4 w-4 text-blue-600" />
      case 'DELETE':
        return <Trash2 className="h-4 w-4 text-red-600" />
      case 'LOGIN':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'LOGOUT':
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-green-100 text-green-800'
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800'
      case 'DELETE':
        return 'bg-red-100 text-red-800'
      case 'LOGIN':
        return 'bg-green-100 text-green-800'
      case 'LOGOUT':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getResourceIcon = (resource: string) => {
    switch (resource) {
      case 'Viaje':
        return <Calendar className="h-4 w-4 text-blue-600" />
      case 'Testimonio':
        return <User className="h-4 w-4 text-green-600" />
      case 'Novedad':
        return <FileText className="h-4 w-4 text-purple-600" />
      case 'Popup':
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  // Estadísticas
  const totalLogs = logs.length
  const logsHoy = logs.filter(log => {
    const today = new Date().toDateString()
    const logDate = new Date(log.timestamp).toDateString()
    return today === logDate
  }).length
  const accionesCreate = logs.filter(log => log.action === 'CREATE').length
  const accionesUpdate = logs.filter(log => log.action === 'UPDATE').length

  // Mostrar skeleton solo para el contenido interno (NO el header)
  const contentSkeleton = loading || isRefreshing ? (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-6" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  ) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <RefreshButton size="default" className="mt-1" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logs de Actividad</h1>
          <p className="text-muted-foreground">
            Historial completo de acciones realizadas en el sistema
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {contentSkeleton ? contentSkeleton : (
      <>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registros
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogs}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Actividad Hoy
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {logsHoy}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Creaciones
            </CardTitle>
            <Plus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {accionesCreate}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Modificaciones
            </CardTitle>
            <Edit className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {accionesUpdate}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
          <CardDescription>
            Filtra los logs por acción, recurso o fecha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar en logs..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Acción" />
              </SelectTrigger>
              <SelectContent>
                {acciones.map(accion => (
                  <SelectItem key={accion} value={accion.toLowerCase()}>
                    {accion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Recurso" />
              </SelectTrigger>
              <SelectContent>
                {recursos.map(recurso => (
                  <SelectItem key={recurso} value={recurso.toLowerCase()}>
                    {recurso}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="date" />
          </div>
        </CardContent>
      </Card>

      {/* Tabla de logs */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Actividades ({logsEjemplo.length})</CardTitle>
          <CardDescription>
            Historial detallado de todas las acciones realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead>Recurso</TableHead>
                <TableHead>Detalles</TableHead>
                <TableHead>IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(log.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{log.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(log.action)}
                      <Badge className={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(log.resource)}
                        <span className="font-medium">{log.resource}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {log.resourceName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {log.details}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {log.ipAddress}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div>
              <h4 className="font-medium text-muted-foreground mb-2">Retención de Logs</h4>
              <p>Los logs se mantienen por 90 días</p>
            </div>
            <div>
              <h4 className="font-medium text-muted-foreground mb-2">Última Limpieza</h4>
              <p>Hace 7 días</p>
            </div>
            <div>
              <h4 className="font-medium text-muted-foreground mb-2">Espacio Utilizado</h4>
              <p>2.3 MB de logs almacenados</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </>
      )}
    </div>
  )
}
