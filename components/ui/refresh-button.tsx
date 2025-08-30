"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

// Context para manejar refresh global
interface RefreshContextType {
  refresh: () => void
  isRefreshing: boolean
  registerRefreshable: (id: string, refreshFn: () => void | Promise<void>) => void
  unregisterRefreshable: (id: string) => void
}

const RefreshContext = React.createContext<RefreshContextType | null>(null)

// Provider para el contexto de refresh
export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const refreshablesRef = React.useRef<Map<string, () => void | Promise<void>>>(new Map())

  const registerRefreshable = useCallback((id: string, refreshFn: () => void | Promise<void>) => {
    refreshablesRef.current.set(id, refreshFn)
  }, [])

  const unregisterRefreshable = useCallback((id: string) => {
    refreshablesRef.current.delete(id)
  }, [])

  const refresh = useCallback(async () => {
    if (isRefreshing) return
    
    setIsRefreshing(true)
    
    try {
      // Ejecutar todos los refresh functions registrados
      const refreshPromises = Array.from(refreshablesRef.current.values()).map(async (refreshFn) => {
        try {
          await refreshFn()
        } catch (error) {
          console.warn('Error durante refresh:', error)
        }
      })
      
      await Promise.allSettled(refreshPromises)
      
      // Invalidar cache de fetch/SWR si existe
      if (typeof window !== 'undefined') {
        // Disparar evento personalizado para invalidar caches
        window.dispatchEvent(new CustomEvent('refresh-all-data'))
        
        // Si hay SWR, invalidar todo
        if ((window as any).mutate) { // eslint-disable-line @typescript-eslint/no-explicit-any
          (window as any).mutate(() => true, undefined, { revalidate: true }) // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        
        // Si hay React Query, invalidar todo
        if ((window as any).queryClient) { // eslint-disable-line @typescript-eslint/no-explicit-any
          await (window as any).queryClient.invalidateQueries() // eslint-disable-line @typescript-eslint/no-explicit-any
        }
      }
      
    } finally {
      // Delay mínimo para mostrar el spinner
      setTimeout(() => {
        setIsRefreshing(false)
      }, 500)
    }
  }, [isRefreshing])

  return (
    <RefreshContext.Provider 
      value={{ refresh, isRefreshing, registerRefreshable, unregisterRefreshable }}
    >
      {children}
    </RefreshContext.Provider>
  )
}

// Hook para usar el contexto de refresh
export function useRefresh() {
  const context = React.useContext(RefreshContext)
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider')
  }
  return context
}

// Hook para registrar un componente como refreshable
export function useRefreshable(id: string, refreshFn: () => void | Promise<void>) {
  const { registerRefreshable, unregisterRefreshable } = useRefresh()
  const refreshFnRef = React.useRef(refreshFn)
  
  // Actualizar la referencia cuando cambie la función
  React.useEffect(() => {
    refreshFnRef.current = refreshFn
  }, [refreshFn])
  
  React.useEffect(() => {
    const stableRefreshFn = () => refreshFnRef.current()
    registerRefreshable(id, stableRefreshFn)
    return () => unregisterRefreshable(id)
  }, [id, registerRefreshable, unregisterRefreshable])
}

// Hook para auto-refresh de fetch/API calls
export function useAutoRefresh<T>(
  key: string,
  fetchFn: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchFnRef = React.useRef(fetchFn)
  
  // Actualizar la referencia cuando cambie la función
  React.useEffect(() => {
    fetchFnRef.current = fetchFn
  }, [fetchFn])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchFnRef.current()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, deps)

  // Registrar este fetch para refresh automático
  useRefreshable(key, fetchData)

  // Fetch inicial
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  // Escuchar evento global de refresh
  React.useEffect(() => {
    const handleRefresh = () => fetchData()
    window.addEventListener('refresh-all-data', handleRefresh)
    return () => window.removeEventListener('refresh-all-data', handleRefresh)
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

interface RefreshButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
  showText?: boolean
}

export function RefreshButton({ 
  variant = "ghost", 
  size = "icon", 
  className,
  children,
  showText = false
}: RefreshButtonProps) {
  const [isLocalRefreshing, setIsLocalRefreshing] = useState(false)
  const { refresh, isRefreshing } = useRefresh()

  const handleRefresh = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLocalRefreshing(true)
    
    try {
      // Detectar automáticamente el contexto donde está el botón
      const button = e.currentTarget as HTMLButtonElement
      
      // Si está dentro de un SideWindow/Sheet, solo refrescar el contenido del sheet
      const sheetContent = button.closest('[data-slot="sheet-content"]')
      if (sheetContent) {
        // Disparar evento INMEDIATAMENTE para mostrar skeleton
        sheetContent.dispatchEvent(new CustomEvent('sheet-refresh', { bubbles: true }))
        
        // Simular recarga del formulario
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Disparar evento de finalización
        sheetContent.dispatchEvent(new CustomEvent('sheet-refresh-complete', { bubbles: true }))
        return
      }
      
      // Si está en una página normal, usar refresh global
      await refresh()
      
    } finally {
      setTimeout(() => setIsLocalRefreshing(false), 500)
    }
  }, [refresh])

  const currentlyRefreshing = isLocalRefreshing || isRefreshing

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleRefresh}
      disabled={currentlyRefreshing}
      className={cn(
        "ring-offset-background focus:ring-ring hover:bg-accent rounded-sm p-2 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden",
        className
      )}
    >
              <RefreshCw className={cn("size-4", currentlyRefreshing && "animate-spin text-brand-purple-600")} />
      {showText && (
        <span className="ml-2">
          {currentlyRefreshing ? "Actualizando..." : "Actualizar"}
        </span>
      )}
      {children}
      <span className="sr-only">Refresh</span>
    </Button>
  )
}
