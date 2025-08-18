"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, Plane, Ship, Car, Mountain, Users } from "lucide-react"

const categories = [
  {
    icon: Bus,
    title: "Paquetes en Bus",
    description: "Viajes cómodos y económicos a los mejores destinos",
    count: "45+ destinos",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Plane,
    title: "Paquetes Aéreos",
    description: "Escapadas rápidas y destinos internacionales",
    count: "25+ destinos",
    color: "bg-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Ship,
    title: "Cruceros",
    description: "Experiencias únicas navegando por el mundo",
    count: "8+ rutas",
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Car,
    title: "Servicios Terrestres",
    description: "Traslados y excursiones personalizadas",
    count: "Disponible",
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Mountain,
    title: "Aventura",
    description: "Para los amantes de la naturaleza y deportes",
    count: "15+ actividades",
    color: "bg-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Users,
    title: "Grupos Especiales",
    description: "Viajes corporativos, familias y eventos",
    count: "Personalizado",
    color: "bg-indigo-500",
    bgColor: "bg-indigo-50",
  },
]

export function TripCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Explorá por Categoría</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontrá el viaje perfecto según tu estilo y preferencias
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`h-8 w-8 ${category.color.replace("bg-", "text-")}`} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>

                  <Badge variant="secondary" className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
