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
import { SideWindow } from "@/components/ui/side-window"
import { ViajeFormSkeleton } from "../components/skeletons"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Calendar,
  DollarSign,
  Save,
  Upload
} from 'lucide-react'

interface ViajeFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViajeForm({ open, onOpenChange }: ViajeFormProps) {
  const [loading, setLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(true)
  
  const { isRefreshing } = useRefresh()
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    precio_base: '',
    duracion: '',
    destino: '',
    imagen: null as File | null,
  })
  
  const [fechasSalida, setFechasSalida] = useState([
    { fecha: '', precio: '', disponible: true }
  ])
  
  const [inclusiones, setInclusiones] = useState([''])
  const [exclusiones, setExclusiones] = useState([''])

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
      // Mostrar skeleton INMEDIATAMENTE
      setFormLoading(true)
    }

    const handleSheetRefreshComplete = () => {
      // Ocultar skeleton cuando termine
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
    setLoading(true)
    
    try {
      // Aquí iría la lógica para guardar el viaje
      console.log('Guardando viaje:', { formData, fechasSalida, inclusiones, exclusiones })
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Resetear formulario
      setFormData({
        titulo: '',
        descripcion: '',
        categoria: '',
        precio_base: '',
        duracion: '',
        destino: '',
        imagen: null,
      })
      setFechasSalida([{ fecha: '', precio: '', disponible: true }])
      setInclusiones([''])
      setExclusiones([''])
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error al guardar viaje:', error)
    } finally {
      setLoading(false)
    }
  }

  const addFechaSalida = () => {
    setFechasSalida([...fechasSalida, { fecha: '', precio: '', disponible: true }])
  }

  const removeFechaSalida = (index: number) => {
    setFechasSalida(fechasSalida.filter((_, i) => i !== index))
  }

  const updateFechaSalida = (index: number, field: string, value: string | boolean) => {
    const updated = [...fechasSalida]
    updated[index] = { ...updated[index], [field]: value } as any // eslint-disable-line @typescript-eslint/no-explicit-any
    setFechasSalida(updated)
  }

  const addInclusion = () => {
    setInclusiones([...inclusiones, ''])
  }

  const removeInclusion = (index: number) => {
    setInclusiones(inclusiones.filter((_, i) => i !== index))
  }

  const updateInclusion = (index: number, value: string) => {
    const updated = [...inclusiones]
    updated[index] = value
    setInclusiones(updated)
  }

  const addExclusion = () => {
    setExclusiones([...exclusiones, ''])
  }

  const removeExclusion = (index: number) => {
    setExclusiones(exclusiones.filter((_, i) => i !== index))
  }

  const updateExclusion = (index: number, value: string) => {
    const updated = [...exclusiones]
    updated[index] = value
    setExclusiones(updated)
  }

  return (
    <SideWindow
      trigger={
        <Button variant="brand">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Viaje
        </Button>
      }
      title="Crear Nuevo Viaje"
      open={open}
      onOpenChange={onOpenChange}
            >
          {formLoading || isRefreshing ? (
            <ViajeFormSkeleton />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información básica */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Información Básica</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título del Viaje</Label>
              <Input
                id="titulo"
                placeholder="Ej: Aventura en Patagonia"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select 
                value={formData.categoria} 
                onValueChange={(value) => setFormData({...formData, categoria: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aventura">Aventura</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="relax">Relax</SelectItem>
                  <SelectItem value="gastronomico">Gastronómico</SelectItem>
                  <SelectItem value="naturaleza">Naturaleza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="destino">Destino</Label>
              <Input
                id="destino"
                placeholder="Ej: Bariloche"
                value={formData.destino}
                onChange={(e) => setFormData({...formData, destino: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duracion">Duración</Label>
              <Input
                id="duracion"
                placeholder="Ej: 5 días / 4 noches"
                value={formData.duracion}
                onChange={(e) => setFormData({...formData, duracion: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="precio_base">Precio Base (USD)</Label>
              <Input
                id="precio_base"
                type="number"
                placeholder="1200"
                value={formData.precio_base}
                onChange={(e) => setFormData({...formData, precio_base: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Describe el viaje, actividades, lugares a visitar..."
              rows={4}
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagen">Imagen Principal</Label>
            <div className="flex items-center gap-4">
              <Input
                id="imagen"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, imagen: e.target.files?.[0] || null})}
              />
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Subir
              </Button>
            </div>
          </div>
        </div>

        {/* Fechas de salida */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Fechas de Salida</h3>
            <Button type="button" variant="outline" size="sm" onClick={addFechaSalida}>
              <Calendar className="h-4 w-4 mr-2" />
              Agregar Fecha
            </Button>
          </div>
          
          <div className="space-y-3">
            {fechasSalida.map((fecha, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <Label htmlFor={`fecha-${index}`}>Fecha</Label>
                  <Input
                    id={`fecha-${index}`}
                    type="date"
                    value={fecha.fecha}
                    onChange={(e) => updateFechaSalida(index, 'fecha', e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex-1">
                  <Label htmlFor={`precio-${index}`}>Precio (USD)</Label>
                  <Input
                    id={`precio-${index}`}
                    type="number"
                    placeholder="1200"
                    value={fecha.precio}
                    onChange={(e) => updateFechaSalida(index, 'precio', e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id={`disponible-${index}`}
                    checked={fecha.disponible}
                    onChange={(e) => updateFechaSalida(index, 'disponible', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor={`disponible-${index}`}>Disponible</Label>
                </div>
                
                {fechasSalida.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFechaSalida(index)}
                    className="mt-6"
                  >
                    Eliminar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inclusiones */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Inclusiones</h3>
            <Button type="button" variant="outline" size="sm" onClick={addInclusion}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Inclusión
            </Button>
          </div>
          
          <div className="space-y-2">
            {inclusiones.map((inclusion, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Ej: Alojamiento en hotel 4 estrellas"
                  value={inclusion}
                  onChange={(e) => updateInclusion(index, e.target.value)}
                  required
                />
                {inclusiones.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeInclusion(index)}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exclusiones */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Exclusiones</h3>
            <Button type="button" variant="outline" size="sm" onClick={addExclusion}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Exclusión
            </Button>
          </div>
          
          <div className="space-y-2">
            {exclusiones.map((exclusion, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Ej: Vuelos internacionales"
                  value={exclusion}
                  onChange={(e) => updateExclusion(index, e.target.value)}
                  required
                />
                {exclusiones.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeExclusion(index)}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" variant="brand" disabled={loading}>
            {loading ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-brand-purple-600 border-t-transparent" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Crear Viaje
              </>
            )}
          </Button>
        </div>
      </form>
          )}
    </SideWindow>
  )
}
