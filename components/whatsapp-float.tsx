"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { useWhatsApp } from "@/lib/use-whatsapp"

export function WhatsAppFloat() {
  const { openWhatsApp, message } = useWhatsApp()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        modalRef.current &&
        buttonRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded])

  const handleWhatsAppClick = () => {
    openWhatsApp()
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Expanded Card */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-[280px] md:max-w-xs mx-4 animate-in slide-in-from-bottom-2 duration-300" ref={modalRef}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex items-center justify-center">
                <Image src="/logo.png" alt="WhatsApp Logo" width={50} height={50} className="rounded-full border border-gray-300" />
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

          <p className="text-sm text-gray-600 mb-3">{message}</p>

          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm"
          >
            Iniciar conversación
          </Button>
        </div>
      )}

      {/* Floating Button - Aligned with chat modal */}
      <div className="relative flex justify-end">
        {/* Main Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          ref={buttonRef}
        >
          {/* Pulse Animation - Inside the button */}
          <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-ping opacity-75"></div>
          
          <Image src="/logo-wpp.png" alt="WhatsApp Logo" width={80} height={0} className="w-16 h-auto" />
          
          {/* Notification Badge - Inside the button */}
          <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs md:text-sm font-bold text-gray-900">1</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
