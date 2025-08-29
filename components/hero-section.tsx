"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useWhatsApp } from "@/lib/use-whatsapp"
import { WordRotate } from "@/components/magicui/word-rotate"

export function HeroSection() {
  const { openWhatsApp } = useWhatsApp()
  const heroRef = useRef<HTMLElement>(null)
  const [availableHeight, setAvailableHeight] = useState<number>(0)
  const [isReady, setIsReady] = useState<boolean>(false)
  // Eliminamos dependencias de estado para clases responsivas para evitar hydration mismatch

  useEffect(() => {
    const calculateAvailableHeight = () => {
      // Obtener la altura total de la ventana
      const windowHeight = window.innerHeight
      
      // Buscar el header y calcular su altura
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 0
      
      // Calcular altura disponible
      const available = windowHeight - headerHeight
      
      setAvailableHeight(available)
    }

    // Calcular altura inicial
    calculateAvailableHeight()
    setIsReady(true)
    
    // Recalcular en resize
    const handleResize = () => {
      calculateAvailableHeight()
    }
    
    window.addEventListener('resize', handleResize)
    
    // Recalcular cuando el DOM cambie
    const observer = new MutationObserver(calculateAvailableHeight)
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

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
        // Buscar por ID específico
        const featuredTripsSection = document.getElementById('featured-trips')
        if (featuredTripsSection) {
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
    <section 
      ref={heroRef}
      className="relative w-full overflow-hidden hero-section"
      style={{ 
        minHeight: availableHeight > 0 ? `${availableHeight}px` : '100dvh'
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 w-full"
        style={{ height: '100dvh' }}
      >
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Paisaje hermoso para agencia de viajes"
          fill
          className="object-cover object-center w-full h-full"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div 
        className={"absolute z-10 grid place-items-center w-full h-full px-4 py-8 sm:py-6 md:py-8"} 
        style={{ 
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          transform: isReady ? 'translateY(0)' : 'translateY(20px)',
          transitionProperty: 'opacity, transform'
        }}
      >
        <div className="container mx-auto text-center text-white max-w-6xl">
          <Badge className={"mb-4 sm:mb-3 md:mb-4 px-3 py-1.5 text-sm sm:text-xs bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 hover:from-cyan-500 hover:to-green-500 font-medium"}>
            ✈️ Más de 20 años de experiencia
          </Badge>

          <h1 className={"text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-4 md:mb-6 leading-tight px-2"}>
            <WordRotate 
              words={["Descubri", "Conoce", "Viaja", "Recorre", "Explora"]} 
              duration={3000}
              className="text-white"
              motionProps={{
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 },
                transition: { duration: 0.5, ease: "easeOut" }
              }}
            />
            <span className={"block text-purple-300 mt-2 sm:mt-1.5 md:mt-2"}>el mundo con nosotros</span>
          </h1>

          <p className={"text-base sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-5 md:mb-6 max-w-2xl md:max-w-3xl mx-auto leading-relaxed text-gray-200 px-4"}>
            Viajes únicos, experiencias inolvidables. Desde aventuras grupales hasta escapadas personalizadas.
          </p>

          {/* Stats */}
          <div className={"flex flex-wrap justify-center gap-4 md:gap-5 mb-6 sm:mb-5 md:mb-6 px-4"}>
            <div className={"flex items-center gap-2 sm:gap-2"}>
              <Users className={"h-4 w-4 text-cyan-300 flex-shrink-0"} />
              <span className={"text-sm font-semibold"}>+10000 viajeros</span>
            </div>
            <div className={"flex items-center gap-2 sm:gap-2"}>
              <MapPin className={"h-4 w-4 text-green-300 flex-shrink-0"} />
              <span className={"text-sm font-semibold"}>+50 destinos</span>
            </div>
            <div className={"flex items-center gap-2 sm:gap-2"}>
              <Star className={"h-4 w-4 text-yellow-300 flex-shrink-0"} />
              <span className={"text-sm font-semibold"}>4.0/5 valoración</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={"flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center px-4"}>
            <Button
              size="lg"
              className={"bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg w-full sm:w-auto px-6 py-3 text-base sm:px-5 sm:py-2.5 sm:text-sm font-semibold"}
            >
              Ver Próximas Salidas
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={"border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 rounded-full bg-transparent w-full sm:w-auto px-6 py-3 text-base sm:px-5 sm:py-2.5 sm:text-sm font-semibold"}
              onClick={openWhatsApp}
            >
              Consultá por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
