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
import { TestimonioForm } from "./TestimonioForm"
import { TestimoniosTableSkeleton } from "../components/skeletons"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Search, 
  MoreHorizontal,
  Eye,
  Star,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

// Datos de ejemplo
const testimoniosEjemplo = [
  {
    id: 1,
    author: "María González",
    email: "maria@email.com",
    content: "Excelente experiencia en Bariloche. Todo muy bien organizado y los guías fueron fantásticos.",
    rating: 5,
    date: "2024-01-15",
    location: "Buenos Aires, Argentina",
    destination: "Bariloche"
  },
  {
    id: 2,
    author: "Carlos Rodríguez",
    email: "carlos@email.com",
    content: "El viaje a Mendoza superó nuestras expectativas. Las bodegas fueron increíbles y el hotel excelente.",
    rating: 5,
    date: "2024-01-10",
    location: "Córdoba, Argentina",
    destination: "Mendoza"
  },
  {
    id: 3,
    author: "Ana Martín",
    email: "ana@email.com",
    content: "Muy buena atención al cliente. Recomiendo totalmente los servicios de Zamorano Turismo.",
    rating: 4,
    date: "2024-01-08",
    location: "Rosario, Argentina",
    destination: "General"
  },
]

export default function TestimoniosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [testimonios, setTestimonios] = useState(testimoniosEjemplo)
  
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 900)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar datos
  const fetchTestimonios = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1200))
    setTestimonios(testimoniosEjemplo)
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('testimonios-list', fetchTestimonios)

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

  const filteredTestimonios = testimonios.filter(testimonio => {
    const matchesSearch = testimonio.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonio.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonio.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDestination = selectedDestination === 'all' || testimonio.destination === selectedDestination
    
    return matchesSearch && matchesDestination
  }).sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.date).getTime()
        bValue = new Date(b.date).getTime()
        break
      case 'rating':
        aValue = a.rating
        bValue = b.rating
        break
      case 'author':
        aValue = a.author.toLowerCase()
        bValue = b.author.toLowerCase()
        break
      case 'destination':
        aValue = a.destination.toLowerCase()
        bValue = b.destination.toLowerCase()
        break
      default:
        aValue = new Date(a.date).getTime()
        bValue = new Date(b.date).getTime()
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })



  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

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
      <TestimoniosTableSkeleton />
    </>
  ) : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <RefreshButton size="default" className="mt-1" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestión de Testimonios</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Revisa y aprueba los testimonios de los clientes
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <TestimonioForm open={sheetOpen} onOpenChange={setSheetOpen} />
        </div>
      </div>

      {contentSkeleton ? contentSkeleton : (
      <>
      {/* Stats Cards */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate pr-1 sm:pr-2">
              Total Testimonios
            </CardTitle>
            <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-blue-400 flex-shrink-0" />
          </CardHeader>
          <CardContent className="pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{testimonios.length}</div>
            <p className="text-xs text-muted-foreground break-words hidden sm:block">
              Testimonios publicados
            </p>
          </CardContent>
        </Card>
        
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate pr-1 sm:pr-2">
              Rating Promedio
            </CardTitle>
            <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-yellow-400 flex-shrink-0" />
          </CardHeader>
          <CardContent className="pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">
              {(testimonios.reduce((acc, t) => acc + t.rating, 0) / testimonios.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground break-words hidden sm:block">
              De 5 estrellas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
          <CardDescription>
            Busca y filtra testimonios específicos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o contenido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedDestination} onValueChange={setSelectedDestination}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Destino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los destinos</SelectItem>
                <SelectItem value="Bariloche">Bariloche</SelectItem>
                <SelectItem value="Mendoza">Mendoza</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de testimonios */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonios ({filteredTestimonios.length})</CardTitle>
          <CardDescription>
            Gestiona los testimonios de los clientes
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
                      onClick={() => handleSort('author')}
                    >
                      Cliente
                      {getSortIcon('author')}
                    </Button>
                  </TableHead>
                  <TableHead>Testimonio</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('rating')}
                    >
                      Rating
                      {getSortIcon('rating')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('destination')}
                    >
                      Destino
                      {getSortIcon('destination')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                      onClick={() => handleSort('date')}
                    >
                      Fecha
                      {getSortIcon('date')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonios.map((testimonio) => (
                  <TableRow key={testimonio.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{testimonio.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonio.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="text-sm line-clamp-2">
                          {testimonio.content}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(testimonio.rating)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {testimonio.destination}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(testimonio.date).toLocaleDateString()}
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
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
            {filteredTestimonios.map((testimonio) => (
              <div key={testimonio.id} className="border rounded-lg p-2 space-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-xs">{testimonio.author}</h3>
                    <p className="text-xs text-muted-foreground">{testimonio.location}</p>
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
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {testimonio.content}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(testimonio.rating)}
                  </div>
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    {testimonio.destination}
                  </Badge>
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