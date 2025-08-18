"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "María González",
    location: "Buenos Aires",
    rating: 5,
    text: "Increíble experiencia en Bariloche. Todo perfectamente organizado, desde el transporte hasta el hotel. El equipo de Zamorano hizo que nuestras vacaciones fueran inolvidables.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Carlos Rodríguez",
    location: "Córdoba",
    rating: 5,
    text: "Ya es la tercera vez que viajo con Zamorano y siempre superan mis expectativas. La atención al detalle y el servicio personalizado los distingue del resto.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Ana Martínez",
    location: "Rosario",
    rating: 5,
    text: "El viaje a Mendoza fue espectacular. La ruta del vino, los hoteles, todo de primera calidad. Definitivamente volvería a elegir Zamorano para mis próximas vacaciones.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Roberto Silva",
    location: "La Plata",
    rating: 5,
    text: "Profesionalismo y calidez humana. Nos acompañaron en cada momento del viaje y resolvieron todas nuestras dudas. Una agencia de confianza total.",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Lo que dicen nuestros viajeros</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Miles de experiencias únicas respaldan nuestra trayectoria
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-purple-400 mb-4" />

                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>

                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-lg font-semibold">4/5</span>
            <span className="text-gray-400">• +500 reseñas verificadas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
