"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function PromotionalBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const heroHeight = window.innerHeight
      
      // Buscar el elemento contact-section
      const sections = document.querySelectorAll('section')
      let contactSection: HTMLElement | null = null
      
      // Buscar la sección que tenga las clases específicas del contact-section
      sections.forEach(section => {
        const classes = section.className
        if (classes.includes('py-16') && classes.includes('bg-gradient-to-r') && classes.includes('from-purple-600')) {
          contactSection = section as HTMLElement
        }
      })
      
      if (contactSection) {
        const contactSectionTop = (contactSection as HTMLElement).getBoundingClientRect().top + scrolled
        
        // Mostrar banner cuando se haya scrolleado más allá del hero
        if (scrolled > heroHeight) {
          // Ocultar banner cuando llegue a la sección de contacto
          if (scrolled >= contactSectionTop - 100) { // 100px de margen para detectar antes
            setShowBanner(false)
          } else {
            setShowBanner(true)
          }
        } else {
          setShowBanner(false)
        }
      } else {
        // Si no encuentra el contact-section, mostrar el banner normalmente
        if (scrolled > heroHeight) {
          setShowBanner(true)
        } else {
          setShowBanner(false)
        }
      }
    }

    // Ejecutar una vez al montar para verificar el estado inicial
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!showBanner) return null

  return (
    <div className="bg-purple-600 text-white py-2 animate-in slide-in-from-bottom duration-300 fixed bottom-0 left-0 right-0 z-20">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-center space-x-4 text-sm">
          <span>🎉 Promociones especiales de septiembre</span>
          <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs">
            Hasta 30% OFF
          </Badge>
          <span>en destinos seleccionados</span>
        </div>
        
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2">
            <span className="text-xs">🎉 Promociones especiales de septiembre</span>
          </div>
          <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs px-3 py-1">
            Hasta 30% OFF
          </Badge>
          <div className="text-xs">en destinos seleccionados</div>
        </div>
      </div>
    </div>
  )
}