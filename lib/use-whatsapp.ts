"use client"

import { usePathname } from 'next/navigation'
import { generateWhatsAppUrl, getWhatsAppConfig, WhatsAppConfig } from './whatsapp-config'

export function useWhatsApp() {
  const pathname = usePathname()
  const config = getWhatsAppConfig(pathname)
  
  const openWhatsApp = () => {
    const url = generateWhatsAppUrl(config)
    window.open(url, '_blank')
  }
  
  return {
    config,
    openWhatsApp,
    phoneNumber: config.phoneNumber,
    displayNumber: config.displayNumber,
    message: config.message
  }
}
