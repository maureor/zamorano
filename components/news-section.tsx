"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"

const news = [
  {
    title: "Nuevos destinos para el verano 2024",
    excerpt: "Descubrí las increíbles opciones que tenemos preparadas para la próxima temporada de verano.",
    image: "/placeholder.svg?height=300&width=400",
    date: "15 Ago 2024",
    category: "Novedades",
  },
  {
    title: "Promociones especiales de septiembre",
    excerpt: "Aprovechá nuestras ofertas exclusivas para viajar en septiembre con descuentos de hasta el 30%.",
    image: "/placeholder.svg?height=300&width=400",
    date: "10 Ago 2024",
    category: "Promociones",
  },
  {
    title: "Consejos para viajar en primavera",
    excerpt: "Todo lo que necesitás saber para disfrutar al máximo tus viajes durante la temporada primaveral.",
    image: "/placeholder.svg?height=300&width=400",
    date: "05 Ago 2024",
    category: "Consejos",
  },
]

export function NewsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Novedades y Consejos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mantente al día con las últimas noticias, promociones y consejos de viaje
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                    {article.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>

                <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-700 font-semibold">
                  Leer más
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
            Ver Todas las Novedades
          </Button>
        </div>
      </div>
    </section>
  )
}
