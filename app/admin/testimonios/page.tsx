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
  Check,
  X,
  Star
} from 'lucide-react'

// Datos de ejemplo
const testimoniosEjemplo = [
  {
    id: 1,
    author: "María González",
    email: "maria@email.com",
    content: "Excelente experiencia en Bariloche. Todo muy bien organizado y los guías fueron fantásticos.",
    rating: 5,
    status: "Aprobado",
    date: "2024-01-15",
    location: "Buenos Aires, Argentina"
  },
  {
    id: 2,
    author: "Carlos Rodríguez",
    email: "carlos@email.com",
    content: "El viaje a Mendoza superó nuestras expectativas. Las bodegas fueron increíbles y el hotel excelente.",
    rating: 5,
    status: "Pendiente",
    date: "2024-01-10",
    location: "Córdoba, Argentina"
  },
  {
    id: 3,
    author: "Ana Martín",
    email: "ana@email.com",
    content: "Muy buena atención al cliente. Recomiendo totalmente los servicios de Zamorano Turismo.",
    rating: 4,
    status: "Aprobado",
    date: "2024-01-08",
    location: "Rosario, Argentina"
  },
]

export default function TestimoniosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
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

  const filteredTestimonios = testimonios.filter(testimonio => {
    const matchesSearch = testimonio.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonio.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || testimonio.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprobado': return 'bg-green-100 text-green-800'
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'Rechazado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <RefreshButton size="default" className="mt-1" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Testimonios</h1>
            <p className="text-muted-foreground">
              Revisa y aprueba los testimonios de los clientes
            </p>
          </div>
        </div>
        <TestimonioForm open={sheetOpen} onOpenChange={setSheetOpen} />
      </div>

      {contentSkeleton ? contentSkeleton : (
      <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonios</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonios.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <div className="h-4 w-4 rounded-full bg-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testimonios.filter(t => t.status === 'Pendiente').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requieren revisión
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testimonios.filter(t => t.status === 'Aprobado').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Publicados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating Promedio</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(testimonios.reduce((acc, t) => acc + t.rating, 0) / testimonios.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
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
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Pendiente">Pendientes</SelectItem>
                <SelectItem value="Aprobado">Aprobados</SelectItem>
                <SelectItem value="Rechazado">Rechazados</SelectItem>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Testimonio</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
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
                    <Badge className={getStatusColor(testimonio.status)}>
                      {testimonio.status}
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
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Check className="h-4 w-4 mr-2" />
                          Aprobar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <X className="h-4 w-4 mr-2" />
                          Rechazar
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