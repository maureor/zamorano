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
  Edit,
  Trash2,
  Target,
  Settings,
  Eye,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

// Datos de ejemplo
const popupsEjemplo = [
  {
    id: '1',
    title: 'Oferta Especial - Cruceros 2024',
    content: '¡Descuento del 25% en todos los cruceros! Válido hasta fin de mes.',
    category: 'Cruceros',
    active: true,
    showDelay: 3000,
    position: 'center',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Suscríbete al Newsletter',
    content: 'Recibe las mejores ofertas y destinos directamente en tu email.',
    category: 'Home',
    active: true,
    showDelay: 10000,
    position: 'bottom-right',
    createdAt: '2024-01-12T14:20:00Z'
  },
  {
    id: '3',
    title: 'Encuesta de Satisfacción',
    content: 'Ayúdanos a mejorar. Tu opinión es muy importante para nosotros.',
    category: 'Home',
    active: false,
    showDelay: 5000,
    position: 'center',
    createdAt: '2024-01-08T09:15:00Z'
  },
]



export default function PopupsAdminPage() {
  const [selectedPopup, setSelectedPopup] = useState<typeof popupsEjemplo[0] | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [popups, setPopups] = useState(popupsEjemplo)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  
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
      day: 'numeric'
    })
  }



  const handleToggleActive = (id: string, currentState: boolean) => {
    console.log(`Toggle popup ${id}: ${!currentState}`)
    // Aquí iría la lógica para activar/desactivar el popup
  }

  const totalActivos = popups.filter(p => p.active).length

  // Aplicar ordenamiento a los popups
  const sortedPopups = [...popups].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case 'category':
        aValue = a.category.toLowerCase()
        bValue = b.category.toLowerCase()
        break
      case 'active':
        aValue = a.active ? 1 : 0
        bValue = b.active ? 1 : 0
        break
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
        break
      default:
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <RefreshButton size="default" className="mt-1" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestión de Popups</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Configura popups promocionales y de engagement
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Button variant="brand" asChild>
            <Link href="/admin/popups/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Popup
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {contentSkeleton ? contentSkeleton : (
      <>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate pr-1 sm:pr-2">
              Total Popups
            </CardTitle>
            <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{popupsEjemplo.length}</div>
            <p className="text-xs text-muted-foreground break-words hidden sm:block">
              Popups configurados
            </p>
          </CardContent>
        </Card>
        
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate pr-1 sm:pr-2">
              Activos
            </CardTitle>
            <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
          </CardHeader>
          <CardContent className="pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {totalActivos}
            </div>
            <p className="text-xs text-muted-foreground break-words hidden sm:block">
              Mostrándose actualmente
            </p>
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
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('title')}
                    >
                      Popup
                      {getSortIcon('title')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('category')}
                    >
                      Sección
                      {getSortIcon('category')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('active')}
                    >
                      Estado
                      {getSortIcon('active')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('createdAt')}
                    >
                      Fecha
                      {getSortIcon('createdAt')}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPopups.map((popup) => (
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
                      <Badge variant="outline">
                        {popup.category}
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
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-2">
            {sortedPopups.map((popup) => (
              <div key={popup.id} className="border rounded-lg p-2 space-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-xs">{popup.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {popup.content}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      {popup.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Switch
                      checked={popup.active}
                      onCheckedChange={() => handleToggleActive(popup.id, popup.active)}
                    />
                    <span className="text-xs">
                      {popup.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  <span className="font-medium text-muted-foreground">Sección:</span>
                  <p>{selectedPopup.category}</p>
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
