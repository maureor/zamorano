'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { SalidaForm } from "../salidas/SalidaForm"
import { ViajesTableSkeleton } from "../components/skeletons"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Search, 
  MoreHorizontal,
  Calendar,
  MapPin,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'

// Datos de ejemplo para salidas
const salidasEjemplo = [
  {
    id: 1,
    destino_id: 1,
    destino_titulo: "Bariloche Clásico",
    fecha_salida: "2024-03-15",
    fecha_regreso: "2024-03-18",
    precio_base: 89900,
    precio_promocional: 79900,
    porcentaje_descuento: 11,
    mensaje_descuento: "Oferta especial",
    hotel: "Hotel Tres Reyes",
    hotel_categoria: "4 estrellas",
    hotel_ubicacion: "Centro de Bariloche",
    hotel_calificacion: 4.6,
    cupos_disponibles: 20,
    cupos_vendidos: 12,
    estado: "activo",
    destacado: true
  },
  {
    id: 2,
    destino_id: 1,
    destino_titulo: "Bariloche Clásico",
    fecha_salida: "2024-04-20",
    fecha_regreso: "2024-04-23",
    precio_base: 89900,
    precio_promocional: null,
    porcentaje_descuento: null,
    mensaje_descuento: null,
    hotel: "Hotel Tres Reyes",
    hotel_categoria: "4 estrellas",
    hotel_ubicacion: "Centro de Bariloche",
    hotel_calificacion: 4.6,
    cupos_disponibles: 20,
    cupos_vendidos: 8,
    estado: "activo",
    destacado: false
  },
  {
    id: 3,
    destino_id: 2,
    destino_titulo: "Crucero por el Mediterráneo",
    fecha_salida: "2024-05-10",
    fecha_regreso: "2024-05-15",
    precio_base: 1899900,
    precio_promocional: null,
    porcentaje_descuento: null,
    mensaje_descuento: null,
    hotel: "MSC Seaside",
    hotel_categoria: "Crucero Premium",
    hotel_ubicacion: "Mediterráneo",
    hotel_calificacion: 4.8,
    cupos_disponibles: 50,
    cupos_vendidos: 15,
    estado: "activo",
    destacado: false
  },
  {
    id: 4,
    destino_id: 3,
    destino_titulo: "Brasil - Río de Janeiro",
    fecha_salida: "2024-06-05",
    fecha_regreso: "2024-06-10",
    precio_base: 189900,
    precio_promocional: 169900,
    porcentaje_descuento: 11,
    mensaje_descuento: "2do pasajero 50% OFF",
    hotel: "Hotel Copacabana Palace",
    hotel_categoria: "5 estrellas",
    hotel_ubicacion: "Copacabana",
    hotel_calificacion: 4.9,
    cupos_disponibles: 30,
    cupos_vendidos: 25,
    estado: "activo",
    destacado: true
  },
  {
    id: 5,
    destino_id: 4,
    destino_titulo: "Mendoza - Ruta del Vino",
    fecha: "2024-07-12",
    precio_base: 75500,
    precio_promocional: null,
    porcentaje_descuento: null,
    mensaje_descuento: null,
    hotel: "Hotel Park Hyatt Mendoza",
    hotel_categoria: "5 estrellas",
    hotel_ubicacion: "Centro de Mendoza",
    hotel_calificacion: 4.7,
    cupos_disponibles: 15,
    cupos_vendidos: 0,
    estado: "inactivo",
    destacado: false
  },
]

export default function SalidasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDestino, setSelectedDestino] = useState('all')
  const [selectedEstado, setSelectedEstado] = useState('all')
  const [sortBy, setSortBy] = useState('fecha_salida')
  const [sortOrder, setSortOrder] = useState('asc')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [salidas, setSalidas] = useState(salidasEjemplo)
  
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar datos
  const fetchSalidas = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSalidas(salidasEjemplo)
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('salidas-list', fetchSalidas)

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

  const filteredSalidas = salidas.filter(salida => {
    const matchesSearch = salida.destino_titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salida.hotel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDestino = selectedDestino === 'all' || salida.destino_id.toString() === selectedDestino
    const matchesEstado = selectedEstado === 'all' || salida.estado === selectedEstado
    
    return matchesSearch && matchesDestino && matchesEstado
  }).sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'fecha_salida':
        aValue = new Date(a.fecha_salida || '').getTime()
        bValue = new Date(b.fecha_salida || '').getTime()
        break
      case 'fecha_regreso':
        aValue = new Date(a.fecha_regreso || '').getTime()
        bValue = new Date(b.fecha_regreso || '').getTime()
        break
      case 'precio_base':
        aValue = a.precio_base
        bValue = b.precio_base
        break
      case 'destino':
        aValue = a.destino_titulo.toLowerCase()
        bValue = b.destino_titulo.toLowerCase()
        break
      case 'hotel':
        aValue = a.hotel.toLowerCase()
        bValue = b.hotel.toLowerCase()
        break
      default:
        aValue = new Date(a.fecha_salida || '').getTime()
        bValue = new Date(b.fecha_salida || '').getTime()
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
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-full sm:w-48" />
            <Skeleton className="h-10 w-full sm:w-32" />
          </div>
        </CardContent>
      </Card>
      <ViajesTableSkeleton />
    </>
  ) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <RefreshButton size="default" className="mt-1" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestión de Salidas</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Administra todas las salidas y fechas disponibles
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <SalidaForm open={sheetOpen} onOpenChange={setSheetOpen} />
        </div>
      </div>

      {contentSkeleton || (
        <>
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>
                Busca y filtra las salidas por destino, estado y más
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por destino o hotel..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedDestino} onValueChange={setSelectedDestino}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Todos los destinos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los destinos</SelectItem>
                    <SelectItem value="1">Bariloche Clásico</SelectItem>
                    <SelectItem value="2">Crucero por el Mediterráneo</SelectItem>
                    <SelectItem value="3">Brasil - Río de Janeiro</SelectItem>
                    <SelectItem value="4">Mendoza - Ruta del Vino</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedEstado} onValueChange={setSelectedEstado}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                    <SelectItem value="agotado">Agotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              

            </CardContent>
          </Card>

          {/* Lista de salidas */}
          <Card>
            <CardHeader>
              <CardTitle>Salidas ({filteredSalidas.length})</CardTitle>
              <CardDescription>
                Lista de todas las salidas disponibles
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
                          onClick={() => handleSort('destino')}
                        >
                          Destino
                          {getSortIcon('destino')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="h-auto p-0 font-semibold hover:bg-transparent"
                          onClick={() => handleSort('fecha_salida')}
                        >
                          Fechas
                          {getSortIcon('fecha_salida')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="h-auto p-0 font-semibold hover:bg-transparent"
                          onClick={() => handleSort('hotel')}
                        >
                          Hotel
                          {getSortIcon('hotel')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          className="h-auto p-0 font-semibold hover:bg-transparent"
                          onClick={() => handleSort('precio_base')}
                        >
                          Precio
                          {getSortIcon('precio_base')}
                        </Button>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSalidas.map((salida) => (
                      <TableRow key={salida.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {salida.destino_titulo}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">Salida:</span>
                              <span>{salida.fecha_salida ? new Date(salida.fecha_salida).toLocaleDateString('es-ES') : '-'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>Regreso:</span>
                              <span>{salida.fecha_regreso ? new Date(salida.fecha_regreso).toLocaleDateString('es-ES') : '-'}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{salida.hotel}</span>
                            <span className="text-sm text-muted-foreground">
                              {salida.hotel_ubicacion}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            {salida.precio_promocional ? (
                              <>
                                <span className="text-sm text-gray-500 line-through">${salida.precio_base.toLocaleString()}</span>
                                <span className="text-green-600 font-bold">${salida.precio_promocional.toLocaleString()}</span>
                                <span className="text-xs text-orange-600">
                                  {salida.porcentaje_descuento}% OFF
                                </span>
                              </>
                            ) : (
                              <span>${salida.precio_base.toLocaleString()}</span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={salida.estado === 'activo'}
                              onCheckedChange={(checked) => {
                                // Aquí iría la lógica para cambiar el estado
                                console.log('Cambiando estado de salida', salida.id, checked ? 'activo' : 'inactivo')
                              }}
                            />
                            <span className="text-sm text-muted-foreground">
                              {salida.estado === 'activo' ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Clonar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
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
                {filteredSalidas.map((salida) => (
                  <Card key={salida.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{salida.destino_titulo}</h3>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span className="font-medium">Salida:</span>
                            <span>{salida.fecha_salida ? new Date(salida.fecha_salida).toLocaleDateString('es-ES') : '-'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>Regreso:</span>
                            <span>{salida.fecha_regreso ? new Date(salida.fecha_regreso).toLocaleDateString('es-ES') : '-'}</span>
                          </div>
                        </div>
                      </div>
                                          <div className="flex items-center gap-2">
                      <Switch 
                        checked={salida.estado === 'activo'}
                        onCheckedChange={(checked) => {
                          // Aquí iría la lógica para cambiar el estado
                          console.log('Cambiando estado de salida', salida.id, checked ? 'activo' : 'inactivo')
                        }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {salida.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm">Hotel</h4>
                        <p className="text-sm text-muted-foreground">{salida.hotel}</p>
                        <p className="text-xs text-muted-foreground">
                          {salida.hotel_ubicacion}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Precio:</span>
                          {salida.precio_promocional ? (
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 line-through">${salida.precio_base.toLocaleString()}</span>
                              <span className="font-medium text-green-600">${salida.precio_promocional.toLocaleString()}</span>
                              <span className="text-xs text-orange-600">
                                {salida.porcentaje_descuento}% OFF
                              </span>
                            </div>
                          ) : (
                            <p className="font-medium">${salida.precio_base.toLocaleString()}</p>
                          )}
                        </div>

                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
