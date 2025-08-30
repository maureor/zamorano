'use client'

import { useState, useEffect } from 'react'
import { useRefresh } from '@/components/ui/refresh-button'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SideWindow } from "@/components/ui/side-window"
import { TestimonioFormSkeleton } from "../components/skeletons"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus,
  Save,
} from 'lucide-react'

interface TestimonioFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TestimonioForm({ open, onOpenChange }: TestimonioFormProps) {
  const [loading, setLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(true)
  
  const { isRefreshing } = useRefresh()
  
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: '',
    rating: '5',
    location: '',
    visible: true,
  })

  // Simular carga inicial del formulario
  useEffect(() => {
    if (open) {
      setFormLoading(true)
      const timer = setTimeout(() => {
        setFormLoading(false)
      }, 500)
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

  const handleSubmitNew = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Aquí iría la lógica para guardar el testimonio
      console.log('Guardando testimonio:', formData)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Resetear formulario
      setFormData({
        author: '',
        email: '',
        content: '',
        rating: '5',
        location: '',
        visible: true,
      })
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error al guardar testimonio:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SideWindow
      trigger={
        <Button variant="brand">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Testimonio
        </Button>
      }
      title="Crear Nuevo Testimonio"
      open={open}
      onOpenChange={onOpenChange}
    >
      {formLoading || isRefreshing ? (
        <TestimonioFormSkeleton />
      ) : (
        <form onSubmit={handleSubmitNew} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="author">Nombre del Cliente</Label>
              <Input
                id="author"
                placeholder="Nombre completo del cliente"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Testimonio</Label>
              <Textarea
                id="content"
                placeholder="Escribe aquí el testimonio del cliente..."
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rating">Calificación</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  placeholder="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  placeholder="Ciudad, País"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="visible"
                checked={formData.visible}
                onChange={(e) => setFormData({...formData, visible: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="visible">Publicar inmediatamente</Label>
            </div>
          </div>

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
                  Crear Testimonio
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </SideWindow>
  )
}
