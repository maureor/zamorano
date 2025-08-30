'use client'

import { useState, useEffect } from 'react'
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Target,
  BarChart3,
  Settings
} from 'lucide-react'
import Link from 'next/link'

// Datos de ejemplo
const popupsEjemplo = [
  {
    id: '1',
    title: 'Oferta Especial - Cruceros 2024',
    content: '¡Descuento del 25% en todos los cruceros! Válido hasta fin de mes.',
    type: 'promocional',
    active: true,
    showDelay: 3000,
    position: 'center',
    createdAt: '2024-01-15T10:30:00Z',
    views: 2547,
    clicks: 187,
    conversionRate: 7.3
  },
  {
    id: '2',
    title: 'Suscríbete al Newsletter',
    content: 'Recibe las mejores ofertas y destinos directamente en tu email.',
    type: 'suscripcion',
    active: true,
    showDelay: 10000,
    position: 'bottom-right',
    createdAt: '2024-01-12T14:20:00Z',
    views: 1834,
    clicks: 234,
    conversionRate: 12.8
  },
  {
    id: '3',
    title: 'Encuesta de Satisfacción',
    content: 'Ayúdanos a mejorar. Tu opinión es muy importante para nosotros.',
    type: 'encuesta',
    active: false,
    showDelay: 5000,
    position: 'center',
    createdAt: '2024-01-08T09:15:00Z',
    views: 892,
    clicks: 45,
    conversionRate: 5.0
  },
]

const tiposPopup = [
  { value: 'promocional', label: 'Promocional', color: 'bg-blue-100 text-blue-800' },
  { value: 'suscripcion', label: 'Suscripción', color: 'bg-green-100 text-green-800' },
  { value: 'encuesta', label: 'Encuesta', color: 'bg-purple-100 text-purple-800' },
  { value: 'informativo', label: 'Informativo', color: 'bg-gray-100 text-gray-800' },
]

export default function PopupsAdminPage() {
  const [selectedPopup, setSelectedPopup] = useState<typeof popupsEjemplo[0] | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [popups, setPopups] = useState(popupsEjemplo)
  
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar datos
  const fetchPopups = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 900))
    setPopups(popupsEjemplo)
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('popups-list', fetchPopups)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTipoColor = (tipo: string) => {
    const tipoConfig = tiposPopup.find(t => t.value === tipo)
    return tipoConfig?.color || 'bg-gray-100 text-gray-800'
  }

  const getTipoLabel = (tipo: string) => {
    const tipoConfig = tiposPopup.find(t => t.value === tipo)
    return tipoConfig?.label || tipo
  }

  const handleToggleActive = (id: string, currentState: boolean) => {
    console.log(`Toggle popup ${id}: ${!currentState}`)
    // Aquí iría la lógica para activar/desactivar el popup
  }

  const totalActivos = popups.filter(p => p.active).length
  const totalVistas = popups.reduce((acc, p) => acc + p.views, 0)
  const totalClicks = popups.reduce((acc, p) => acc + p.clicks, 0)
  const conversionPromedio = totalVistas > 0 ? (totalClicks / totalVistas * 100) : 0

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
            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  ) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <RefreshButton size="default" className="mt-1" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Popups</h1>
            <p className="text-muted-foreground">
              Configura popups promocionales y de engagement
            </p>
          </div>
        </div>
        <Button variant="brand" asChild>
          <Link href="/admin/popups/nuevo">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Popup
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      {contentSkeleton ? contentSkeleton : (
      <>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Popups
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{popupsEjemplo.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Activos
            </CardTitle>
            <Settings className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalActivos}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vistas
            </CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalVistas.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversión Promedio
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {conversionPromedio.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar popups..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de popups */}
      <Card>
        <CardHeader>
          <CardTitle>Popups ({popupsEjemplo.length})</CardTitle>
          <CardDescription>
            Lista de popups configurados en el sitio web
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Popup</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Vistas</TableHead>
                <TableHead className="text-center">Clicks</TableHead>
                <TableHead className="text-center">Conversión</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popups.map((popup) => (
                <TableRow key={popup.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{popup.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {popup.content}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTipoColor(popup.type)}>
                      {getTipoLabel(popup.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={popup.active}
                        onCheckedChange={() => handleToggleActive(popup.id, popup.active)}
                      />
                      <span className="text-sm">
                        {popup.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {popup.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {popup.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={popup.conversionRate > 10 ? 'default' : 'secondary'}>
                      {popup.conversionRate.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(popup.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {
                          setSelectedPopup(popup)
                          setPreviewOpen(true)
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          Vista previa
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/popups/${popup.id}/editar`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de vista previa */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vista Previa del Popup</DialogTitle>
            <DialogDescription>
              Así se verá el popup en el sitio web
            </DialogDescription>
          </DialogHeader>
          
          {selectedPopup && (
            <div className="space-y-4">
              <div className="p-6 bg-white border rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-3">{selectedPopup.title}</h3>
                <p className="text-gray-600 mb-4">{selectedPopup.content}</p>
                <div className="flex gap-2">
                  <Button size="sm">Acción Principal</Button>
                  <Button variant="outline" size="sm">Cerrar</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Posición:</span>
                  <p className="capitalize">{selectedPopup.position.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Retraso:</span>
                  <p>{selectedPopup.showDelay / 1000}s</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Tipo:</span>
                  <p>{getTipoLabel(selectedPopup.type)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Estado:</span>
                  <p>{selectedPopup.active ? 'Activo' : 'Inactivo'}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </>
      )}
    </div>
  )
}
