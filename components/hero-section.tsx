"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { useWhatsApp } from "@/lib/use-whatsapp"
import { WordRotate } from "@/components/magicui/word-rotate"



export function HeroSection() {
  const { openWhatsApp } = useWhatsApp()
  const heroRef = useRef<HTMLElement>(null)
  const [availableHeight, setAvailableHeight] = useState<number>(0)
  const [isReady, setIsReady] = useState<boolean>(false)
  
  // Memoizar la función de cálculo de altura para evitar recrearla
  const calculateAvailableHeight = useCallback(() => {
    const windowHeight = window.innerHeight
    const header = document.querySelector('header')
    const headerHeight = header ? header.offsetHeight : 0
    const available = windowHeight - headerHeight
    setAvailableHeight(available)
  }, [])

  // Memoizar la función de resize
  const handleResize = useCallback(() => {
    calculateAvailableHeight()
  }, [calculateAvailableHeight])



  // Memoizar el estilo del hero para evitar recálculos
  const heroStyle = useMemo(() => ({
    minHeight: availableHeight > 0 ? `${availableHeight}px` : '100dvh',
    marginTop: '80px'
  }), [availableHeight])

  // Memoizar el estilo del contenido para evitar recálculos
  const contentStyle = useMemo(() => ({
    opacity: isReady ? 1 : 0,
    transition: 'opacity 0.8s ease-in-out',
    transform: isReady ? 'translateY(0)' : 'translateY(20px)',
    transitionProperty: 'opacity, transform'
  }), [isReady])

  // Memoizar las estadísticas para evitar recrear en cada render
  const stats = useMemo(() => [
    { icon: Users, text: "+10000 viajeros", color: "text-cyan-300" },
    { icon: MapPin, text: "+50 destinos", color: "text-green-300" },
    { icon: Star, text: "4.0/5 valoración", color: "text-yellow-300" }
  ], [])

  useEffect(() => {
    // Calcular altura inicial
    calculateAvailableHeight()
    setIsReady(true)
    
    // Solo agregar event listener de resize necesario
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [calculateAvailableHeight, handleResize])

  return (
    <section 
      ref={heroRef}
      className="relative w-full overflow-hidden hero-section"
      style={heroStyle}
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
        className="absolute z-10 grid place-items-center w-full h-full px-4 py-8 sm:py-6 md:py-8"
        style={contentStyle}
      >
        <div className="container mx-auto text-center text-white max-w-6xl">
          <Badge className="mb-4 sm:mb-3 md:mb-8 lg:mb-10 px-3 py-1.5 text-sm sm:text-xs bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 hover:from-cyan-500 hover:to-green-500 font-medium">
            ✈️ Más de 20 años de experiencia
          </Badge>

          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-4 md:mb-6 leading-tight px-2">
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
            <span className="block text-purple-300 sm:mt-1.5 md:mt-2">el mundo con nosotros</span>
          </h1>

          <p className="text-base sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-5 md:mb-6 max-w-2xl md:max-w-3xl mx-auto leading-relaxed text-gray-200 px-4">
            Viajes únicos, experiencias inolvidables. Desde aventuras grupales hasta escapadas personalizadas.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-6 sm:mb-5 md:mb-12 lg:mb-16 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color} flex-shrink-0`} />
                <span className="text-sm font-semibold">{stat.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center px-4">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg w-full sm:w-auto px-6 py-3 text-base sm:px-5 sm:py-2.5 sm:text-sm font-semibold"
            >
              Ver Próximas Salidas
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 rounded-full bg-transparent w-full sm:w-auto px-6 py-3 text-base sm:px-5 sm:py-2.5 sm:text-sm font-semibold"
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
