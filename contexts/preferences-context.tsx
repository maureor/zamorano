'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { 
  getUserPreferences, 
  saveUserPreferences, 
  updateUserPreference,
  resetUserPreferences,
  type UserPreferences 
} from '@/lib/user-preferences'

interface PreferencesContextType {
  preferences: UserPreferences
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void
  resetPreferences: () => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  sidebarCollapsed: boolean
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  // Estado inicial siempre fijo para SSR
  const [preferences, setPreferences] = useState<UserPreferences>({
    sidebar: { collapsed: false }
  })

  // Solo cargar preferencias en el cliente después de la hidratación
  useEffect(() => {
    // Usar setTimeout para asegurar que estamos en el cliente
    const timer = setTimeout(() => {
      const stored = getUserPreferences()
      setPreferences(stored)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  // Función para actualizar una preferencia específica
  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, [key]: value }
      updateUserPreference(key, value)
      return newPreferences
    })
  }, [])

  // Función para actualizar múltiples preferencias
  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences }
      saveUserPreferences(newPreferences)
      return updated
    })
  }, [])

  // Función para resetear preferencias
  const resetPreferences = useCallback(() => {
    resetUserPreferences()
    const defaultPrefs = {
      sidebar: { collapsed: false }
    }
    setPreferences(defaultPrefs)
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

  const value: PreferencesContextType = {
    preferences,
    updatePreference,
    updatePreferences,
    resetPreferences,
    toggleSidebar,
    setSidebarCollapsed,
    sidebarCollapsed: preferences.sidebar.collapsed
  }

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function useUserPreferences(): PreferencesContextType {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a PreferencesProvider')
  }
  return context
}
