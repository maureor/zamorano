'use client'

import { useState, useEffect } from 'react'
import { useRefresh } from '@/components/ui/refresh-button'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SideWindow } from "@/components/ui/side-window"
import { SalidaFormSkeleton } from "../components/skeletons"
import { Label } from "@/components/ui/label"
import { 
  Plus, 
  Save,
  Bed,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Coffee,
  Shield,
  Check,
  ChevronsUpDown,
  Calendar as CalendarIcon,
  AlertCircle
} from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ViajeForm } from "../viajes/ViajeForm"

interface SalidaFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SalidaForm({ open, onOpenChange }: SalidaFormProps) {
  const [loading, setLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(true)
  const [salidaCalendarOpen, setSalidaCalendarOpen] = useState(false)
  const [regresoCalendarOpen, setRegresoCalendarOpen] = useState(false)
  const [dateErrors, setDateErrors] = useState<{salida?: string, regreso?: string}>({})
  
  const { isRefreshing } = useRefresh()
  const [formData, setFormData] = useState({
    destino_id: '',
    fecha_salida: '',
    fecha_regreso: '',
    precio_base: '',
    precio_promocional: '',
    porcentaje_descuento: '',
    mensaje_descuento: '',
    moneda: 'USD',
    estado: true, // true = activo, false = inactivo
    destacado: false,
  })
  
  // Información de hoteles (múltiples hoteles por salida)
  const [hoteles, setHoteles] = useState([
    {
      nombre: '',
      ubicacion: '',
      amenidades: [] as string[],
    }
  ])
  
  // Amenidades predefinidas
  const amenidadesDisponibles = [
    { id: 'wifi', label: 'WiFi gratuito', icon: Wifi },
    { id: 'desayuno', label: 'Desayuno incluido', icon: Coffee },
    { id: 'almuerzo', label: 'Almuerzo incluido', icon: Utensils },
    { id: 'cena', label: 'Cena incluida', icon: Utensils },
    { id: 'spa', label: 'Spa', icon: Shield },
    { id: 'gimnasio', label: 'Gimnasio', icon: Dumbbell },
    { id: 'restaurante', label: 'Restaurante', icon: Utensils },
    { id: 'estacionamiento', label: 'Estacionamiento', icon: Car },
    { id: 'room-service', label: 'Room Service', icon: Bed },
  ]
  
  // Amenidades personalizadas
  const [amenidadesPersonalizadas, setAmenidadesPersonalizadas] = useState<string[]>([])
  const [nuevaAmenidad, setNuevaAmenidad] = useState('')
  
  // Estado para el buscador de destinos
  const [destinoSearchOpen, setDestinoSearchOpen] = useState(false)
  
  // Estado para el formulario de destino
  const [destinoFormOpen, setDestinoFormOpen] = useState(false)

  // Función para validar fechas
  const validateDates = (salida: string, regreso: string) => {
    const errors: {salida?: string, regreso?: string} = {}
    
    if (salida && regreso) {
      const salidaDate = new Date(salida)
      const regresoDate = new Date(regreso)
      
      if (regresoDate <= salidaDate) {
        errors.regreso = 'La fecha de regreso debe ser posterior a la fecha de salida'
      }
    }
    
    if (salida) {
      const salidaDate = new Date(salida)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (salidaDate < today) {
        errors.salida = 'La fecha de salida no puede ser anterior a hoy'
      }
    }
    
    setDateErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Función para formatear fecha para display
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Destinos disponibles (esto vendría de la API)
  const destinosDisponibles = [
    { id: 1, titulo: "Bariloche Clásico" },
    { id: 2, titulo: "Crucero por el Mediterráneo" },
    { id: 3, titulo: "Brasil - Río de Janeiro" },
    { id: 4, titulo: "Mendoza - Ruta del Vino" },
  ]

  // Simular carga inicial del formulario
  useEffect(() => {
    if (open) {
      setFormLoading(true)
      const timer = setTimeout(() => {
        setFormLoading(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Escuchar eventos de refresh del sheet
  useEffect(() => {
    const handleSheetRefresh = () => {
      setFormLoading(true)
    }

    const handleSheetRefreshComplete = () => {
      setFormLoading(false)
    }

    document.addEventListener('sheet-refresh', handleSheetRefresh)
    document.addEventListener('sheet-refresh-complete', handleSheetRefreshComplete)
    
    return () => {
      document.removeEventListener('sheet-refresh', handleSheetRefresh)
      document.removeEventListener('sheet-refresh-complete', handleSheetRefreshComplete)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar fechas antes de enviar
    if (!validateDates(formData.fecha_salida, formData.fecha_regreso)) {
      return // No enviar si hay errores de fecha
    }
    
    setLoading(true)
    
    try {
      // Aquí iría la lógica para guardar la salida
      console.log('Guardando salida:', { formData, hoteles })
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Resetear formulario
      setFormData({
        destino_id: '',
        fecha_salida: '',
        fecha_regreso: '',
        precio_base: '',
        precio_promocional: '',
        porcentaje_descuento: '',
        mensaje_descuento: '',
        moneda: 'USD',
        estado: true,
        destacado: false,
      })
      setHoteles([{
        nombre: '',
        ubicacion: '',
        amenidades: [],
      }])
      setAmenidadesPersonalizadas([])
      setNuevaAmenidad('')
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error al guardar salida:', error)
    } finally {
      setLoading(false)
    }
  }

  // Funciones para hoteles
  const addHotel = () => {
    setHoteles([...hoteles, {
      nombre: '',
      ubicacion: '',
      amenidades: [],
    }])
  }

  const removeHotel = (index: number) => {
    if (hoteles.length > 1) {
      setHoteles(hoteles.filter((_, i) => i !== index))
    }
  }

  const updateHotel = (index: number, field: string, value: string | string[]) => {
    const updated = [...hoteles]
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value }
      setHoteles(updated)
    }
  }

  // Funciones para amenidades del hotel
  const toggleAmenidad = (hotelIndex: number, amenidadId: string) => {
    const hotel = hoteles[hotelIndex]
    if (hotel) {
      const updated = hotel.amenidades.includes(amenidadId)
        ? hotel.amenidades.filter(id => id !== amenidadId)
        : [...hotel.amenidades, amenidadId]
      updateHotel(hotelIndex, 'amenidades', updated)
    }
  }

  // Funciones para amenidades personalizadas
  const addAmenidadPersonalizada = () => {
    if (nuevaAmenidad.trim() && !amenidadesPersonalizadas.includes(nuevaAmenidad.trim())) {
      setAmenidadesPersonalizadas([...amenidadesPersonalizadas, nuevaAmenidad.trim()])
      setNuevaAmenidad('')
    }
  }

  const removeAmenidadPersonalizada = (amenidad: string) => {
    setAmenidadesPersonalizadas(amenidadesPersonalizadas.filter(a => a !== amenidad))
  }

  const toggleAmenidadPersonalizada = (hotelIndex: number, amenidad: string) => {
    const hotel = hoteles[hotelIndex]
    if (hotel) {
      const updated = hotel.amenidades.includes(amenidad)
        ? hotel.amenidades.filter(a => a !== amenidad)
        : [...hotel.amenidades, amenidad]
      updateHotel(hotelIndex, 'amenidades', updated)
    }
  }

  return (
    <>
    <SideWindow
      trigger={
        <Button variant="brand">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Salida
        </Button>
      }
      title="Crear Nueva Salida"
      open={open}
      onOpenChange={onOpenChange}
      primary
    >
          {formLoading || isRefreshing ? (
            <SalidaFormSkeleton />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información básica */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Información de la Salida</h3>
          
          {/* Destino */}
          <div className="space-y-2">
            <Label htmlFor="destino_id">Destino</Label>
            <Popover open={destinoSearchOpen} onOpenChange={setDestinoSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={destinoSearchOpen}
                  className="w-full justify-between"
                >
                  {formData.destino_id 
                    ? destinosDisponibles.find((destino) => destino.id.toString() === formData.destino_id)?.titulo
                    : "Seleccionar destino..."
                  }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar destino..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron destinos.</CommandEmpty>
                    <CommandGroup>
                      {/* Opción para crear nuevo destino */}
                      <CommandItem
                        onSelect={() => {
                          setDestinoFormOpen(true)
                          setDestinoSearchOpen(false)
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4 text-blue-600" />
                        <span className="text-blue-600 font-medium">Crear nuevo destino</span>
                      </CommandItem>
                      
                      {/* Lista de destinos */}
                      {destinosDisponibles.map((destino) => (
                        <CommandItem
                          key={destino.id}
                          value={destino.titulo}
                          onSelect={() => {
                            setFormData({...formData, destino_id: destino.id.toString()})
                            setDestinoSearchOpen(false)
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              formData.destino_id === destino.id.toString() ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {destino.titulo}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Fechas - Lado a lado */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fecha_salida">Fecha de Salida</Label>
              <Popover open={salidaCalendarOpen} onOpenChange={setSalidaCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!formData.fecha_salida ? 'text-muted-foreground' : ''} ${dateErrors.salida ? 'border-red-500' : ''}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.fecha_salida ? formatDateForDisplay(formData.fecha_salida) : 'Seleccionar fecha de salida'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.fecha_salida ? new Date(formData.fecha_salida) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const formattedDate = date.toISOString().split('T')[0] as string
                        setFormData(prev => ({...prev, fecha_salida: formattedDate}))
                        validateDates(formattedDate, formData.fecha_regreso || '')
                        setSalidaCalendarOpen(false)
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {dateErrors.salida && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {dateErrors.salida}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fecha_regreso">Fecha de Regreso</Label>
              <Popover open={regresoCalendarOpen} onOpenChange={setRegresoCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!formData.fecha_regreso ? 'text-muted-foreground' : ''} ${dateErrors.regreso ? 'border-red-500' : ''}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.fecha_regreso ? formatDateForDisplay(formData.fecha_regreso) : 'Seleccionar fecha de regreso'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.fecha_regreso ? new Date(formData.fecha_regreso) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const formattedDate = date.toISOString().split('T')[0] as string
                        setFormData(prev => ({...prev, fecha_regreso: formattedDate}))
                        validateDates(formData.fecha_salida || '', formattedDate)
                        setRegresoCalendarOpen(false)
                      }
                    }}
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const salidaDate = formData.fecha_salida ? new Date(formData.fecha_salida) : today
                      return date < salidaDate
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {dateErrors.regreso && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {dateErrors.regreso}
                </div>
              )}
            </div>
          </div>

          {/* Precios y configuración */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-muted-foreground">Precios y Configuración</h4>
            
            <div className="space-y-2">
              <Label htmlFor="moneda">Moneda</Label>
              <Select 
                value={formData.moneda} 
                onValueChange={(value) => setFormData({...formData, moneda: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - Dólares</SelectItem>
                  <SelectItem value="ARS">ARS - Pesos Argentinos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Precios en una sola línea */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="precio_base">Precio Base</Label>
                <div className="relative">
                  <Input
                    id="precio_base"
                    type="number"
                    placeholder="1200"
                    value={formData.precio_base}
                    onChange={(e) => setFormData({...formData, precio_base: e.target.value})}
                    required
                    className="pr-12"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-sm text-muted-foreground">{formData.moneda}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="porcentaje_descuento">% Descuento</Label>
                <Input
                  id="porcentaje_descuento"
                  type="number"
                  placeholder="20"
                  value={formData.porcentaje_descuento}
                  onChange={(e) => {
                    const porcentaje = e.target.value
                    setFormData({...formData, porcentaje_descuento: porcentaje})
                    
                    // Calcular precio promocional automáticamente
                    if (porcentaje && formData.precio_base) {
                      const precioBase = parseFloat(formData.precio_base)
                      const descuento = parseFloat(porcentaje)
                      const precioPromocional = precioBase * (1 - descuento / 100)
                      setFormData(prev => ({...prev, precio_promocional: precioPromocional.toFixed(2)}))
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="precio_promocional">Precio Promocional</Label>
                <div className="relative">
                  <Input
                    id="precio_promocional"
                    type="number"
                    placeholder="960"
                    value={formData.precio_promocional}
                    onChange={(e) => setFormData({...formData, precio_promocional: e.target.value})}
                    className="pr-12"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-sm text-muted-foreground">{formData.moneda}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuración adicional */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-muted-foreground">Configuración Adicional</h4>
            
            <div className="space-y-2">
              <Label htmlFor="mensaje_descuento">Mensaje de Descuento</Label>
              <Input
                id="mensaje_descuento"
                placeholder="2do pasajero 50% OFF"
                value={formData.mensaje_descuento}
                onChange={(e) => setFormData({...formData, mensaje_descuento: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="estado">Estado de la Salida</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.estado ? 'La salida está activa y visible' : 'La salida está inactiva y oculta'}
                </p>
              </div>
              <Switch
                id="estado"
                checked={formData.estado}
                onCheckedChange={(checked) => setFormData({...formData, estado: checked})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destacado">Destacado</Label>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="destacado"
                  checked={formData.destacado}
                  onChange={(e) => setFormData({...formData, destacado: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="destacado">Mostrar como destacado</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Información de hoteles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Hoteles de la Salida</h3>
            <Button type="button" variant="outline" size="sm" onClick={addHotel}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Hotel
            </Button>
          </div>
          
          {hoteles.map((hotel, hotelIndex) => (
            <div key={hotelIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium">Hotel {hotelIndex + 1}</h4>
                {hoteles.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeHotel(hotelIndex)}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`hotel_nombre_${hotelIndex}`}>Nombre del Hotel</Label>
                  <Input
                    id={`hotel_nombre_${hotelIndex}`}
                    placeholder="Hotel Sheraton"
                    value={hotel.nombre}
                    onChange={(e) => updateHotel(hotelIndex, 'nombre', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`hotel_ubicacion_${hotelIndex}`}>Ubicación/Zona</Label>
                  <Input
                    id={`hotel_ubicacion_${hotelIndex}`}
                    placeholder="Centro de la ciudad"
                    value={hotel.ubicacion}
                    onChange={(e) => updateHotel(hotelIndex, 'ubicacion', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {/* Amenidades del hotel */}
              <div className="space-y-4">
                <h5 className="text-sm font-medium">Amenidades del Hotel</h5>
                
                {/* Amenidades predefinidas */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenidadesDisponibles.map((amenidad) => {
                    const IconComponent = amenidad.icon
                    return (
                      <div key={amenidad.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`amenidad-${hotelIndex}-${amenidad.id}`}
                          checked={hotel.amenidades.includes(amenidad.id)}
                          onChange={() => toggleAmenidad(hotelIndex, amenidad.id)}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`amenidad-${hotelIndex}-${amenidad.id}`} className="flex items-center gap-2 text-sm">
                          <IconComponent className="h-4 w-4" />
                          {amenidad.label}
                        </label>
                      </div>
                    )
                  })}
                </div>
                
                {/* Amenidades personalizadas */}
                <div className="space-y-2">
                  <Label>Amenidades Personalizadas</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ej: Piscina climatizada"
                      value={nuevaAmenidad}
                      onChange={(e) => setNuevaAmenidad(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenidadPersonalizada())}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={addAmenidadPersonalizada}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {amenidadesPersonalizadas.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {amenidadesPersonalizadas.map((amenidad) => (
                        <div key={amenidad} className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded text-sm">
                          <input
                            type="checkbox"
                            id={`amenidad-personalizada-${hotelIndex}-${amenidad}`}
                            checked={hotel.amenidades.includes(amenidad)}
                            onChange={() => toggleAmenidadPersonalizada(hotelIndex, amenidad)}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={`amenidad-personalizada-${hotelIndex}-${amenidad}`} className="text-sm">
                            {amenidad}
                          </label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAmenidadPersonalizada(amenidad)}
                            className="h-4 w-4 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje de error de fechas */}
        {Object.keys(dateErrors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Error en las fechas</span>
            </div>
            <p className="text-red-700 text-sm mt-1">
              Por favor corrige los errores en las fechas antes de continuar.
            </p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="brand" 
            disabled={loading || Object.keys(dateErrors).length > 0}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-brand-purple-600 border-t-transparent" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Crear Salida
              </>
            )}
          </Button>
        </div>
      </form>
          )}
    </SideWindow>
    
    {/* Formulario de destino - solo se abre desde el selector */}
    {destinoFormOpen && (
      <ViajeForm 
        open={destinoFormOpen} 
        onOpenChange={setDestinoFormOpen} 
      />
    )}
  </>
  )
}
