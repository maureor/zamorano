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
import { PageListSkeleton, ViajesTableSkeleton, FiltersSkeleton } from "../components/skeletons"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Search, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'

// Datos de ejemplo (en producción vendrían de la base de datos)
const viajesEjemplo = [
  {
    id: 1,
    titulo: "Aventura en Patagonia",
    destino: "El Calafate",
    categoria: "Aventura",
    precio: 1200,
    duracion: "7 días",
    estado: "Activo",
    fechas_disponibles: 3,
    reservas: 12
  },
  {
    id: 2,
    titulo: "Tour Gastronómico Buenos Aires",
    destino: "Buenos Aires",
    categoria: "Gastronómico",
    precio: 450,
    duracion: "3 días",
    estado: "Activo",
    fechas_disponibles: 5,
    reservas: 8
  },
  {
    id: 3,
    titulo: "Relax en Termas",
    destino: "Villa La Angostura",
    categoria: "Relax",
    precio: 800,
    duracion: "4 días",
    estado: "Borrador",
    fechas_disponibles: 2,
    reservas: 0
  },
]

export default function ViajesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [viajes, setViajes] = useState(viajesEjemplo)
  
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar datos
  const fetchViajes = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setViajes(viajesEjemplo)
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('viajes-list', fetchViajes)

  const filteredViajes = viajes.filter(viaje => {
    const matchesSearch = viaje.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         viaje.destino.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || viaje.categoria === selectedCategory
    const matchesStatus = selectedStatus === 'all' || viaje.estado === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-100 text-green-800 border border-green-200'
      case 'Borrador': return 'bg-gray-100 text-gray-800 border border-gray-200'
      case 'Pausado': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      default: return 'bg-brand-purple-100 text-brand-purple-800 border border-brand-purple-200'
    }
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
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <RefreshButton size="default" className="mt-1" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Viajes</h1>
            <p className="text-muted-foreground">
              Administra todos los viajes y paquetes turísticos
            </p>
          </div>
        </div>
        <ViajeForm open={sheetOpen} onOpenChange={setSheetOpen} />
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
                <SelectItem value="Aventura">Aventura</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Relax">Relax</SelectItem>
                <SelectItem value="Gastronómico">Gastronómico</SelectItem>
                <SelectItem value="Naturaleza">Naturaleza</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Borrador">Borrador</SelectItem>
                <SelectItem value="Pausado">Pausado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de viajes */}
      <Card>
        <CardHeader>
          <CardTitle>Viajes ({filteredViajes.length})</CardTitle>
          <CardDescription>
            Lista de todos los paquetes turísticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Viaje</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fechas</TableHead>
                <TableHead>Reservas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredViajes.map((viaje) => (
                <TableRow key={viaje.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{viaje.titulo}</div>
                      <div className="text-sm text-muted-foreground">{viaje.destino} • {viaje.duracion}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{viaje.categoria}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${viaje.precio}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(viaje.estado)}>
                      {viaje.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{viaje.fechas_disponibles} disponibles</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{viaje.reservas}</div>
                      <div className="text-muted-foreground">reservas</div>
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
        </CardContent>
      </Card>
      </>
      )}
    </div>
  )
}