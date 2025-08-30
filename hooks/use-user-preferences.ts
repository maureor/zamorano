                                                                                                                                                        'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  getUserPreferences, 
  saveUserPreferences, 
  updateUserPreference,
  resetUserPreferences,
  type UserPreferences 
} from '@/lib/user-preferences'

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    // Inicializar con las preferencias guardadas o por defecto
    if (typeof window !== 'undefined') {
      const stored = getUserPreferences()
      // Marcar como cargado inmediatamente si estamos en el cliente
      setTimeout(() => setIsLoaded(true), 0)
      return stored
    }
    return {
      sidebar: { collapsed: false }
    }
  })

  const [isLoaded, setIsLoaded] = useState(false)

  // Función para actualizar una preferencia específica
  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
    updateUserPreference(key, value)
  }, [])

  // Función para actualizar múltiples preferencias
  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }))
    saveUserPreferences(newPreferences)
  }, [])

  // Función para resetear preferencias
  const resetPreferences = useCallback(() => {
    resetUserPreferences()
    setPreferences({
      sidebar: { collapsed: false }
    })
  }, [])

  // Función específica para toggle del sidebar
  const toggleSidebar = useCallback(() => {
    setPreferences(prev => {
      const newCollapsed = !prev.sidebar.collapsed
      const newPreferences = { ...prev, sidebar: { ...prev.sidebar, collapsed: newCollapsed } }
      updateUserPreference('sidebar', { collapsed: newCollapsed })
      return newPreferences
    })
  }, [])

  // Función para colapsar/expandir sidebar
  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, sidebar: { ...prev.sidebar, collapsed } }
      updateUserPreference('sidebar', { collapsed })
      return newPreferences
    })
  }, [])

  return {
    preferences,
    isLoaded,
    updatePreference,
    updatePreferences,
    resetPreferences,
    toggleSidebar,
    setSidebarCollapsed,
    // Accesos directos para comodidad
    sidebarCollapsed: preferences.sidebar.collapsed
  }
}
