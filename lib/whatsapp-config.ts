export interface WhatsAppConfig {
  phoneNumber: string
  message: string
  displayNumber: string
}

// Configuración por página
export const whatsappConfigs: Record<string, WhatsAppConfig> = {
  // Página principal
  '/': {
    phoneNumber: '5492234933500',
    message: '¡Hola! Me interesa conocer más sobre sus viajes. ¿Podrían ayudarme?',
    displayNumber: '+54 9 223 493-3500'
  },
  
  // Cruceros
  '/cruceros': {
    phoneNumber: '5492234933500',
    message: '¡Hola! Me interesa conocer más sobre sus cruceros. ¿Podrían ayudarme?',
    displayNumber: '+54 9 223 493-3500'
  },
  
  // Financiación
  '/financiacion': {
    phoneNumber: '5492234933500',
    message: '¡Hola! Me interesa conocer más sobre sus opciones de financiación para viajes. ¿Podrían ayudarme?',
    displayNumber: '+54 9 223 493-3500'
  },
  
  // Paquetes aéreos
  '/paquetes-aereos': {
    phoneNumber: '5492234933500',
    message: '¡Hola! Me interesa conocer más sobre sus paquetes aéreos. ¿Podrían ayudarme?',
    displayNumber: '+54 9 223 493-3500'
  },
  
  // Paquetes en bus
  '/paquetes-bus': {
    phoneNumber: '5492234933500',
    message: '¡Hola! Me interesa conocer más sobre sus paquetes en bus. ¿Podrían ayudarme?',
    displayNumber: '+54 9 223 493-3500'
  },
  
  // Servicios terrestres
  '/servicios-terrestres': {
    phoneNumber: '5492234933500',
    message: '¡Hola! Me interesa conocer más sobre sus servicios terrestres. ¿Podrían ayudarme?',
    displayNumber: '+54 9 223 493-3500'
  },
  
  // Transporte
  '/transporte': {
    phoneNumber: '5492234933500',
    message: '¡Hola! Me interesa conocer más sobre sus servicios de transporte. ¿Podrían ayudarme?',
    displayNumber: '+54 9 223 493-3500'
  },
  
  // Páginas de viaje individuales (usar el patrón de la página principal)
  '/viaje': {
    phoneNumber: '5492234933500',
    message: '¡Hola! Me interesa este viaje. ¿Podrían darme más información?',
    displayNumber: '+54 9 223 493-3500'
  }
}

// Función para obtener la configuración de WhatsApp basada en la ruta actual
export function getWhatsAppConfig(pathname: string): WhatsAppConfig {
  // Buscar coincidencia exacta primero
  if (whatsappConfigs[pathname]) {
    return whatsappConfigs[pathname]
  }
  
  // Buscar coincidencia parcial para rutas dinámicas como /viaje/[id]
  for (const [route, config] of Object.entries(whatsappConfigs)) {
    if (pathname.startsWith(route)) {
      return config
    }
  }
  
  // Configuración por defecto
  return whatsappConfigs['/']!
}

// Función para generar la URL de WhatsApp
export function generateWhatsAppUrl(config: WhatsAppConfig): string {
  return `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`
}
