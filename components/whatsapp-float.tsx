"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón después de hacer scroll 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = "5491112345678" // Número de WhatsApp de Zamorano Viajes
    const message = "¡Hola! Me interesa conocer más sobre sus viajes. ¿Podrían ayudarme?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Expanded Card */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-[280px] md:max-w-xs mx-4 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-gray-900" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Zamorano Viajes</h4>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  En línea
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              onClick={() => setIsExpanded(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-600 mb-3">¡Hola! 👋 ¿En qué podemos ayudarte con tu próximo viaje?</p>

          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm"
          >
            Iniciar conversación
          </Button>
        </div>
      )}

      {/* Floating Button */}
      <div className="relative">
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-ping opacity-75"></div>

        {/* Main Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
        </Button>

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex items-center justify-center">
          <span className="text-[10px] md:text-xs font-bold text-gray-900">1</span>
        </div>
      </div>
    </div>
  )
}
