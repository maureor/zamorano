"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Star } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Paisaje hermoso para agencia de viajes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white mt-4">
        <Badge className="mb-6 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 hover:from-cyan-500 hover:to-green-500 px-4 py-2 text-sm font-medium">
          ✈️ Más de 25 años de experiencia
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Descubrí el mundo
          <span className="block text-purple-300">con nosotros</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
          Viajes únicos, experiencias inolvidables. Desde aventuras grupales hasta escapadas personalizadas.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-300" />
            <span className="text-lg font-semibold">+5000 viajeros</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-300" />
            <span className="text-lg font-semibold">+50 destinos</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-300" />
            <span className="text-lg font-semibold">4.9/5 valoración</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg"
          >
            Ver Próximas Salidas
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
          >
            Consultá por WhatsApp
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
