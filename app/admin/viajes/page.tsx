'use client'

import { useState, useEffect } from 'react'
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { ViajeForm } from "./ViajeForm"
import { ViajesTableSkeleton } from "../components/skeletons"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Search, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

// Datos de ejemplo (en producción vendrían de la base de datos)
const destinosEjemplo = [
  {
    id: 1,
    titulo: "Bariloche Clásico",
    destino: "San Carlos de Bariloche",
    categoria: "bus",
    salidas_disponibles: 3,
    destacado: true
  },
  {
    id: 2,
    titulo: "Crucero por el Mediterráneo",
    destino: "Europa",
    categoria: "cruceros",
    salidas_disponibles: 5,
    destacado: false
  },
  {
    id: 3,
    titulo: "Brasil - Río de Janeiro",
    destino: "Brasil",
    categoria: "aereos",
    salidas_disponibles: 4,
    destacado: true
  },
  {
    id: 4,
    titulo: "City Tour Buenos Aires",
    destino: "Ciudad Autónoma de Buenos Aires",
    categoria: "servicios-terrestres",
    precio: 12900,
    duracion: "4 horas",
    activo: true,
    fechas_disponibles: 7,
    reservas: 25,
    destacado: false
  },
  {
    id: 5,
    titulo: "Mendoza - Ruta del Vino",
    destino: "Mendoza Capital",
    categoria: "bus",
    salidas_disponibles: 2,
    destacado: false
  },
]

export default function ViajesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('titulo')
  const [sortOrder, setSortOrder] = useState('asc')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [destinos, setDestinos] = useState(destinosEjemplo)
  
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar datos
  const fetchDestinos = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDestinos(destinosEjemplo)
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('destinos-list', fetchDestinos)

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

  const filteredDestinos = destinos.filter(destino => {
    const matchesSearch = destino.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destino.destino.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || destino.categoria === selectedCategory

    
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'titulo':
        aValue = a.titulo.toLowerCase()
        bValue = b.titulo.toLowerCase()
        break
      case 'destino':
        aValue = a.destino.toLowerCase()
        bValue = b.destino.toLowerCase()
        break
      case 'categoria':
        aValue = a.categoria.toLowerCase()
        bValue = b.categoria.toLowerCase()
        break
      case 'precio_desde':
        aValue = a.precio || 0
        bValue = b.precio || 0
        break
      case 'salidas_disponibles':
        aValue = a.salidas_disponibles
        bValue = b.salidas_disponibles
        break
      default:
        aValue = a.titulo.toLowerCase()
        bValue = b.titulo.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return (aValue || 0) > (bValue || 0) ? 1 : -1
    } else {
      return (aValue || 0) < (bValue || 0) ? 1 : -1
    }
  })

  const getCategoryLabel = (categoria: string) => {
    const labels: { [key: string]: string } = {
      'bus': 'Paquetes en Bus',
      'aereos': 'Paquetes Aéreos',
      'cruceros': 'Cruceros',
      'servicios-terrestres': 'Servicios Terrestres'
    }
    return labels[categoria] || categoria
  }



  // Mostrar skeleton solo para el contenido interno (NO el header)
  const contentSkeleton = loading || isRefreshing ? (
    <>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
      <ViajesTableSkeleton />
    </>
  ) : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <RefreshButton size="default" className="mt-1" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestión de Destinos</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Administra todos los destinos y paquetes turísticos
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <ViajeForm open={sheetOpen} onOpenChange={setSheetOpen} />
        </div>
      </div>

      {contentSkeleton ? contentSkeleton : (
      <>
      {/* Filtros */}
              <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
            <CardDescription>
              Filtra y busca viajes específicos
            </CardDescription>
          </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título o destino..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="bus">Paquetes en Bus</SelectItem>
                <SelectItem value="aereos">Paquetes Aéreos</SelectItem>
                <SelectItem value="cruceros">Cruceros</SelectItem>
                <SelectItem value="servicios-terrestres">Servicios Terrestres</SelectItem>
              </SelectContent>
            </Select>


          </div>
        </CardContent>
      </Card>

      {/* Lista de destinos */}
      <Card>
        <CardHeader>
          <CardTitle>Destinos ({filteredDestinos.length})</CardTitle>
          <CardDescription>
            Lista de todos los destinos turísticos
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
                      onClick={() => handleSort('titulo')}
                    >
                      Destino
                      {getSortIcon('titulo')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('categoria')}
                    >
                      Categoría
                      {getSortIcon('categoria')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('salidas_disponibles')}
                    >
                      Salidas
                      {getSortIcon('salidas_disponibles')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDestinos.map((destino) => (
                  <TableRow key={destino.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{destino.titulo}</div>
                        <div className="text-sm text-muted-foreground">{destino.destino}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getCategoryLabel(destino.categoria)}</Badge>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div>{destino.salidas_disponibles} disponibles</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
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
          <div className="md:hidden space-y-4">
            {filteredDestinos.map((destino) => (
              <div key={destino.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{destino.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{destino.destino} • {destino.duracion}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{getCategoryLabel(destino.categoria)}</Badge>
                  {destino.destacado && (
                    <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
                      Destacado
                    </Badge>
                  )}
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Salidas:</span>
                  <p className="font-medium">{destino.salidas_disponibles} disponibles</p>
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