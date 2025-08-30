export interface UserPreferences {
  sidebar: {
    collapsed: boolean
  }
  // Futuras preferencias que se pueden agregar aquí
  // theme: 'light' | 'dark'
  // language: 'es' | 'en'
  // notifications: boolean
}

const DEFAULT_PREFERENCES: UserPreferences = {
  sidebar: {
    collapsed: false
  }
}

const STORAGE_KEY = 'zamorano-admin-preferences'

/**
 * Valida que el objeto de preferencias tenga la estructura correcta
 */
function validatePreferences(data: unknown): UserPreferences {
  if (!data || typeof data !== 'object') {
    return DEFAULT_PREFERENCES
  }

  const preferences = data as Partial<UserPreferences>
  
  // Validar estructura de sidebar
  if (!preferences.sidebar || typeof preferences.sidebar !== 'object') {
    preferences.sidebar = DEFAULT_PREFERENCES.sidebar
  } else {
    if (typeof preferences.sidebar.collapsed !== 'boolean') {
      preferences.sidebar.collapsed = DEFAULT_PREFERENCES.sidebar.collapsed
    }
  }

  return preferences as UserPreferences
}

/**
 * Obtiene las preferencias del usuario desde localStorage
 */
export function getUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return DEFAULT_PREFERENCES
    }

    const parsed = JSON.parse(stored)
    return validatePreferences(parsed)
  } catch (error) {
    console.warn('Error al cargar preferencias del usuario:', error)
    return DEFAULT_PREFERENCES
  }
}

/**
 * Guarda las preferencias del usuario en localStorage
 */
export function saveUserPreferences(preferences: Partial<UserPreferences>): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const current = getUserPreferences()
    const updated = { ...current, ...preferences }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Error al guardar preferencias del usuario:', error)
  }
}

/**
 * Actualiza una preferencia específica
 */
export function updateUserPreference<K extends keyof UserPreferences>(
  key: K,
  value: UserPreferences[K]
): void {
  const current = getUserPreferences()
  const updated = { ...current, [key]: value }
  saveUserPreferences(updated)
}

/**
 * Resetea las preferencias a los valores por defecto
 */
export function resetUserPreferences(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error al resetear preferencias del usuario:', error)
  }
}
