"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Clock, HeartHandshake, Phone, Shield, Star } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Seguridad Garantizada",
    description: "Todos nuestros viajes incluyen seguros de viaje y asistencia 24/7",
  },
  {
    icon: Award,
    title: "+20 Años de Experiencia",
    description: "Más de dos décadas organizando viajes inolvidables",
  },
  {
    icon: HeartHandshake,
    title: "Atención Personalizada",
    description: "Cada viaje es único, adaptado a tus necesidades y preferencias",
  },
  {
    icon: Phone,
    title: "Soporte Constante",
    description: "Estamos disponibles antes, durante y después de tu viaje",
  },
  {
    icon: Star,
    title: "Calidad Certificada",
    description: "Hoteles seleccionados y servicios de primera calidad",
  },
  {
    icon: Clock,
    title: "Flexibilidad Total",
    description: "Opciones de pago flexibles y políticas de cancelación justas",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">¿Por qué elegir Zamorano Viajes?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Somos más que una agencia de viajes, somos tus compañeros de aventura
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-purple-600" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>

                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
