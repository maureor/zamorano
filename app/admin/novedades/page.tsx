'use client'

import { useState, useEffect } from 'react'
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  Eye,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

// Datos de ejemplo
const novedadesEjemplo = [
  {
    id: '1',
    title: 'Nuevos Destinos 2024: Descubre el Caribe',
    content: 'Este año incorporamos increíbles destinos en el Caribe con paquetes all-inclusive...',
    status: 'published',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    author: 'Admin',
    views: 1247,
    category: 'Destinos'
  },
  {
    id: '2',
    title: 'Ofertas Especiales de Temporada Alta',
    content: 'Aprovecha nuestras ofertas especiales para los meses de temporada alta. Descuentos de hasta 30%...',
    status: 'published',
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-14T09:15:00Z',
    author: 'Admin',
    views: 892,
    category: 'Promociones'
  },
  {
    id: '3',
    title: 'Consejos para Viajar en Crucero',
    content: 'Guía completa con todo lo que necesitas saber antes de embarcarte en tu primera experiencia de crucero...',
    status: 'draft',
    createdAt: '2024-01-10T16:45:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
    author: 'Admin',
    views: 0,
    category: 'Guías'
  },
  {
    id: '4',
    title: 'Testimonios de Nuestros Viajeros',
    content: 'Lee las experiencias reales de nuestros clientes en sus últimos viajes...',
    status: 'published',
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    author: 'Admin',
    views: 654,
    category: 'Testimonios'
  },
]

const categorias = [
  'Todos', 
  'Home', 
  'Cruceros', 
  'Paquetes Aéreos', 
  'Paquetes Bus', 
  'Servicios Terrestres', 
  'Transporte', 
  'Financiación', 
  'Destinos', 
  'Promociones', 
  'Noticias'
]

export default function NovedadesAdminPage() {
  const [loading, setLoading] = useState(true)
  const [novedades, setNovedades] = useState(novedadesEjemplo)
  const [sortBy, setSortBy] = useState('updatedAt')
  const [sortOrder, setSortOrder] = useState('desc')
  
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar datos
  const fetchNovedades = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setNovedades(novedadesEjemplo)
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('novedades-list', fetchNovedades)

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

  const handleToggleStatus = (id: string, currentStatus: string) => {
    console.log(`Toggle novedad ${id}: ${currentStatus === 'published' ? 'draft' : 'published'}`)
    // Aquí iría la lógica para cambiar el estado de la novedad
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalPublicadas = novedades.filter(n => n.status === 'published').length

  // Aplicar ordenamiento a las novedades
  const sortedNovedades = [...novedades].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case 'status':
        aValue = a.status
        bValue = b.status
        break
      case 'updatedAt':
        aValue = new Date(a.updatedAt).getTime()
        bValue = new Date(b.updatedAt).getTime()
        break
      case 'views':
        aValue = a.views
        bValue = b.views
        break
      default:
        aValue = new Date(a.updatedAt).getTime()
        bValue = new Date(b.updatedAt).getTime()
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
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-16 w-16" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-20" />
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
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestión de Novedades</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Administra el blog y las noticias del sitio web
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Button variant="brand" asChild>
            <Link href="/admin/novedades/nueva">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Novedad
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
              Total Novedades
            </CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{novedadesEjemplo.length}</div>
            <p className="text-xs text-muted-foreground break-words hidden sm:block">
              Artículos del blog
            </p>
          </CardContent>
        </Card>
        
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate pr-1 sm:pr-2">
              Publicadas
            </CardTitle>
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
          </CardHeader>
          <CardContent className="pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {totalPublicadas}
            </div>
            <p className="text-xs text-muted-foreground break-words hidden sm:block">
              Visibles en el sitio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
          <CardDescription>
            Filtra y busca novedades específicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar novedades..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map(categoria => (
                  <SelectItem key={categoria} value={categoria.toLowerCase()}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="draft">Borrador</SelectItem>
                <SelectItem value="archived">Archivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de novedades */}
      <Card>
        <CardHeader>
          <CardTitle>Novedades ({novedadesEjemplo.length})</CardTitle>
          <CardDescription>
            Lista completa de novedades y artículos del blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('title')}
                    >
                      Título
                      {getSortIcon('title')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('status')}
                    >
                      Estado
                      {getSortIcon('status')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('updatedAt')}
                    >
                      Última actualización
                      {getSortIcon('updatedAt')}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedNovedades.map((novedad) => (
                  <TableRow key={novedad.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium line-clamp-1">{novedad.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {novedad.content.substring(0, 80)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={novedad.status === 'published'}
                        onCheckedChange={() => handleToggleStatus(novedad.id, novedad.status)}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(novedad.updatedAt)}
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
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/novedades/${novedad.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalles
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/novedades/${novedad.id}/editar`}>
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
          <div className="md:hidden space-y-2">
            {sortedNovedades.map((novedad) => (
              <div key={novedad.id} className="border rounded-lg p-2 space-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-xs line-clamp-1">{novedad.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {novedad.content.substring(0, 40)}...
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
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/novedades/${novedad.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/novedades/${novedad.id}/editar`}>
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
                    <Switch
                      checked={novedad.status === 'published'}
                      onCheckedChange={() => handleToggleStatus(novedad.id, novedad.status)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {novedad.status === 'published' ? 'Publicado' : 'Borrador'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </>
      )}
    </div>
  )
}
