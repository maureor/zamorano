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
  Eye,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Users,
  TrendingUp
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

const categorias = ['Todos', 'Destinos', 'Promociones', 'Guías', 'Testimonios', 'Noticias']

export default function NovedadesAdminPage() {
  const [loading, setLoading] = useState(true)
  const [novedades, setNovedades] = useState(novedadesEjemplo)
  
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalPublicadas = novedades.filter(n => n.status === 'published').length
  const totalBorradores = novedades.filter(n => n.status === 'draft').length
  const totalVistas = novedades.reduce((acc, n) => acc + n.views, 0)

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <RefreshButton size="default" className="mt-1" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Novedades</h1>
            <p className="text-muted-foreground">
              Administra el blog y las noticias del sitio web
            </p>
          </div>
        </div>
        <Button variant="brand" asChild>
          <Link href="/admin/novedades/nueva">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Novedad
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
              Total Novedades
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{novedadesEjemplo.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Publicadas
            </CardTitle>
            <Eye className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalPublicadas}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Borradores
            </CardTitle>
            <Edit className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {totalBorradores}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vistas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalVistas.toLocaleString()}
            </div>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Vistas</TableHead>
                <TableHead>Última actualización</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {novedades.map((novedad) => (
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
                    <Badge variant="outline">
                      {novedad.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        novedad.status === 'published' ? 'default' :
                        novedad.status === 'draft' ? 'secondary' : 'outline'
                      }
                    >
                      {novedad.status === 'published' ? 'Publicado' : 
                       novedad.status === 'draft' ? 'Borrador' : 'Archivado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{novedad.views.toLocaleString()}</span>
                    </div>
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
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
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
        </CardContent>
      </Card>
      </>
      )}
    </div>
  )
}
