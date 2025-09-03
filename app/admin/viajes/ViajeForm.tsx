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
  Save,
  Upload,
  Image as ImageIcon,
  X
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
    destino: '',
    imagen_principal: null as File | null,
    video_url: '',
    destacado: false,
  })
  

  

  const [galeriaImagenes, setGaleriaImagenes] = useState<File[]>([])
  const [testimoniosAsociados, setTestimoniosAsociados] = useState<string[]>([])
  

  


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
      // Aquí iría la lógica para guardar el destino
      console.log('Guardando destino:', { formData })
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Resetear formulario
      setFormData({
        titulo: '',
        descripcion: '',
        categoria: '',
        destino: '',
        imagen_principal: null,
        video_url: '',
        destacado: false,
      })


      setGaleriaImagenes([])
      setTestimoniosAsociados([])

      
      onOpenChange(false)
    } catch (error) {
      console.error('Error al guardar viaje:', error)
    } finally {
      setLoading(false)
    }
  }





  // Funciones para galería de imágenes
  const handleGaleriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const totalImagenes = galeriaImagenes.length + files.length
    
    if (totalImagenes > 5) {
      alert('Máximo 5 imágenes permitidas')
      return
    }
    
    setGaleriaImagenes([...galeriaImagenes, ...files])
  }

  const removeImagenGaleria = (index: number) => {
    setGaleriaImagenes(galeriaImagenes.filter((_, i) => i !== index))
  }

  const moveImagen = (fromIndex: number, toIndex: number) => {
    const newImagenes = [...galeriaImagenes]
    const [movedImagen] = newImagenes.splice(fromIndex, 1)
    if (movedImagen) {
      newImagenes.splice(toIndex, 0, movedImagen)
      setGaleriaImagenes(newImagenes)
    }
  }



  // Funciones para testimonios

  const removeTestimonio = (testimonioId: string) => {
    setTestimoniosAsociados(testimoniosAsociados.filter(id => id !== testimonioId))
  }

  return (
    <SideWindow
      trigger={
        <Button variant="brand">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Destino
        </Button>
      }
      title="Crear Nuevo Destino"
      open={open}
      onOpenChange={onOpenChange}
      primary
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
              <Label htmlFor="titulo">Título del Destino</Label>
              <Input
                id="titulo"
                placeholder="Ej: Mendoza - Ruta del Vino"
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
                  <SelectItem value="bus">Paquetes en Bus</SelectItem>
                  <SelectItem value="aereos">Paquetes Aéreos</SelectItem>
                  <SelectItem value="cruceros">Cruceros</SelectItem>
                  <SelectItem value="servicios-terrestres">Servicios Terrestres</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Describe el destino, actividades, lugares a visitar..."
              rows={4}
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imagen_principal">Imagen Principal</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="imagen_principal"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setFormData({...formData, imagen_principal: file})
                    }
                  }}
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="video_url">URL del Video (opcional)</Label>
              <Input
                id="video_url"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.video_url}
                onChange={(e) => setFormData({...formData, video_url: e.target.value})}
              />
            </div>
          </div>
        </div>





        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Galería de Imágenes</h3>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGaleriaChange}
                className="hidden"
                id="galeria-input"
                disabled={galeriaImagenes.length >= 5}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => document.getElementById('galeria-input')?.click()}
                disabled={galeriaImagenes.length >= 5}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Agregar Imágenes ({galeriaImagenes.length}/5)
              </Button>
            </div>
          </div>
          
          {galeriaImagenes.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Arrastra las imágenes para reordenarlas. El orden se mantendrá en la web pública.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {galeriaImagenes.map((imagen, index) => (
                  <div 
                    key={index} 
                    className="relative group cursor-move"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
                      moveImagen(fromIndex, index)
                    }}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                      {index + 1}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImagenGaleria(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>



        {/* Testimonios asociados */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Testimonios Asociados</h3>
            <span className="text-sm text-gray-500">
              {testimoniosAsociados.length}/4 testimonios
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Selecciona hasta 4 testimonios existentes para mostrar en este destino
          </p>
          
          {/* Testimonios seleccionados */}
          {testimoniosAsociados.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Testimonios seleccionados:</h4>
              <div className="flex flex-wrap gap-2">
                {testimoniosAsociados.map((testimonioId, index) => (
                  <div key={testimonioId} className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                    <span className="text-sm font-medium">Testimonio {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-purple-600 hover:text-purple-800"
                      onClick={() => removeTestimonio(testimonioId)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Lista de testimonios disponibles */}
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Los testimonios se cargarán desde la base de datos
            </p>
            {testimoniosAsociados.length >= 4 && (
              <p className="text-sm text-orange-600 mt-2">
                Límite de 4 testimonios alcanzado
              </p>
            )}
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
                Crear Destino
              </>
            )}
          </Button>
        </div>
      </form>
          )}
    </SideWindow>
  )
}
