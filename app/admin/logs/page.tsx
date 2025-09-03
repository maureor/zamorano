'use client'

import { useState, useEffect } from 'react'
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
  Plus,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Datos de ejemplo de logs
const logsEjemplo = [
  {
    id: '1',
    action: 'Crear',
    resource: 'Destinos',
    resourceId: 'destino-001',
    resourceName: 'Mendoza - Ruta del Vino',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-15T10:30:00Z',
    details: 'Creó un nuevo destino con galería de imágenes'
  },
  {
    id: '2',
    action: 'Actualizar',
    resource: 'Salidas',
    resourceId: 'salida-005',
    resourceName: 'Salida Enero - Mendoza',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-15T09:15:00Z',
    details: 'Actualizó precios y fechas de la salida'
  },
  {
    id: '3',
    action: 'Eliminar',
    resource: 'Novedades',
    resourceId: 'novedad-003',
    resourceName: 'Promoción expirada',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-14T16:45:00Z',
    details: 'Eliminó novedad caducada'
  },
  {
    id: '4',
    action: 'Crear',
    resource: 'Salidas',
    resourceId: 'salida-002',
    resourceName: 'Salida Febrero - Bariloche',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-14T14:20:00Z',
    details: 'Creó nueva salida con hoteles y precios'
  },
  {
    id: '5',
    action: 'Actualizar',
    resource: 'Popups',
    resourceId: 'popup-001',
    resourceName: 'Oferta Especial Cruceros',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-13T11:30:00Z',
    details: 'Actualizó popup promocional con nuevo descuento'
  },
  {
    id: '6',
    action: 'Iniciar Sesión',
    resource: 'Sistema',
    resourceId: 'session-001',
    resourceName: 'Acceso al panel',
    userId: 'admin',
    userName: 'Administrador',
    timestamp: '2024-01-13T09:00:00Z',
    details: 'Acceso exitoso al panel de administración'
  },
]

const acciones = ['Todas', 'Crear', 'Actualizar', 'Eliminar', 'Iniciar Sesión', 'Cerrar Sesión']
const recursos = ['Todos', 'Destinos', 'Salidas', 'Testimonios', 'Novedades', 'Popups', 'Configuración']

export default function LogsAdminPage() {
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState(logsEjemplo)
  const [sortBy, setSortBy] = useState('timestamp')
  const [sortOrder, setSortOrder] = useState('desc')
  
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

  // Función para manejar el ordenamiento
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  // Función para obtener el icono de ordenamiento
  const getSortIcon = (column: string) => {
    if (sortBy !== column) {
      return <ChevronUp className="h-4 w-4 opacity-30" />
    }
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />
  }

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
      case 'Crear':
        return <Plus className="h-4 w-4 text-green-600" />
      case 'Actualizar':
        return <Edit className="h-4 w-4 text-blue-600" />
      case 'Eliminar':
        return <Trash2 className="h-4 w-4 text-red-600" />
      case 'Iniciar Sesión':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Cerrar Sesión':
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }



  const getResourceIcon = (resource: string) => {
    switch (resource) {
      case 'Destinos':
        return <Calendar className="h-4 w-4 text-blue-600" />
      case 'Salidas':
        return <Calendar className="h-4 w-4 text-indigo-600" />
      case 'Testimonios':
        return <User className="h-4 w-4 text-green-600" />
      case 'Novedades':
        return <FileText className="h-4 w-4 text-purple-600" />
      case 'Popups':
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case 'Configuración':
        return <Activity className="h-4 w-4 text-gray-600" />
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

  // Aplicar ordenamiento a los logs
  const sortedLogs = [...logs].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'timestamp':
        aValue = new Date(a.timestamp).getTime()
        bValue = new Date(b.timestamp).getTime()
        break
      case 'userName':
        aValue = a.userName.toLowerCase()
        bValue = b.userName.toLowerCase()
        break
      case 'action':
        aValue = a.action.toLowerCase()
        bValue = b.action.toLowerCase()
        break
      case 'resource':
        aValue = a.resource.toLowerCase()
        bValue = b.resource.toLowerCase()
        break
      case 'resourceName':
        aValue = a.resourceName.toLowerCase()
        bValue = b.resourceName.toLowerCase()
        break
      default:
        aValue = new Date(a.timestamp).getTime()
        bValue = new Date(b.timestamp).getTime()
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })


  // Mostrar skeleton solo para el contenido interno (NO el header)
  const contentSkeleton = loading || isRefreshing ? (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Logs de Actividad</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Historial completo de acciones realizadas en el sistema
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {contentSkeleton ? contentSkeleton : (
      <>
      <div className="grid gap-4 md:grid-cols-2">
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
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar en logs..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]">
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
              <SelectTrigger className="w-[140px]">
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
            <Input type="date" className="w-[140px]" />
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
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('timestamp')}
                    >
                      Fecha/Hora
                      {getSortIcon('timestamp')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('userName')}
                    >
                      Usuario
                      {getSortIcon('userName')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('action')}
                    >
                      Acción
                      {getSortIcon('action')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('resource')}
                    >
                      Recurso
                      {getSortIcon('resource')}
                    </Button>
                  </TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLogs.map((log) => (
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
                        <Badge 
                          style={{
                            backgroundColor: log.action === 'Crear' ? '#10b981' :
                                            log.action === 'Actualizar' ? '#3b82f6' :
                                            log.action === 'Eliminar' ? '#ef4444' :
                                            log.action === 'Iniciar Sesión' ? '#10b981' :
                                            log.action === 'Cerrar Sesión' ? '#6b7280' :
                                            '#6b7280',
                            color: 'white',
                            border: 'none'
                          }}
                        >
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

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {sortedLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getActionIcon(log.action)}
                    <Badge 
                      style={{
                        backgroundColor: log.action === 'Crear' ? '#10b981' :
                                        log.action === 'Actualizar' ? '#3b82f6' :
                                        log.action === 'Eliminar' ? '#ef4444' :
                                        log.action === 'Iniciar Sesión' ? '#10b981' :
                                        log.action === 'Cerrar Sesión' ? '#6b7280' :
                                        '#6b7280',
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      {log.action}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(log.timestamp)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{log.userName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getResourceIcon(log.resource)}
                    <span className="font-medium">{log.resource}</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {log.resourceName}
                  </div>
                  
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {log.details}
                  </div>
                  

                </div>
              </div>
            ))}
          </div>
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
