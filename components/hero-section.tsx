"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let hasScrolled = false
    let animationTriggered = false
    
    const handleScroll = () => {
      // Solo en móvil (ancho < 768px)
      if (window.innerWidth >= 768) return
      
      if (!heroRef.current) return
      
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      // Solo activar si el usuario está scrolleando hacia abajo
      if (scrollDelta > 0 && currentScrollY > 100) {
        hasScrolled = true
      }
      
      // Resetear el estado cuando vuelva al hero (scroll < 200px)
      if (currentScrollY < 200) {
        animationTriggered = false
        hasScrolled = false
      }
      
      // Solo activar si ya ha hecho scroll manual, está scrolleando hacia abajo y no se ha activado aún
      if (hasScrolled && scrollDelta > 0 && currentScrollY > 300 && !animationTriggered) {
        console.log('Activando scroll automático...') // Debug
        
        // Buscar por ID específico
        const featuredTripsSection = document.getElementById('featured-trips')
        if (featuredTripsSection) {
          console.log('Sección encontrada, haciendo scroll...') // Debug
          featuredTripsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
          
          // Marcar como activada para esta sesión
          animationTriggered = true
        }
      }
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Paisaje hermoso para agencia de viajes"
          fill
          className="object-cover w-full"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white -mt-32 max-w-full">
        <Badge className="mb-8 md:mb-10 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 hover:from-cyan-500 hover:to-green-500 px-4 py-2 text-sm font-medium">
          ✈️ Más de 20 años de experiencia
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-10 leading-tight">
          Descubrí el mundo
          <span className="block text-purple-300">con nosotros</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200">
          Viajes únicos, experiencias inolvidables. Desde aventuras grupales hasta escapadas personalizadas.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 md:mb-12">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-300" />
            <span className="text-base md:text-lg font-semibold">+10000 viajeros</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-300" />
            <span className="text-base md:text-lg font-semibold">+50 destinos</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-300" />
            <span className="text-base md:text-lg font-semibold">4.0/5 valoración</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg"
          >
            Ver Próximas Salidas
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full bg-transparent"
          >
            Consultá por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
