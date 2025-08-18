"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Heart, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredTrips = [
  {
    id: "bariloche-clasico",
    title: "Bariloche & San Martín de los Andes",
    location: "Patagonia Argentina",
    image: "/placeholder.svg?height=400&width=600",
    price: "$89.900",
    originalPrice: "$99.900",
    duration: "4 días",
    dates: ["15 Sep", "22 Sep", "29 Sep"],
    category: "Promoción",
    rating: 4.8,
    reviews: 124,
    highlights: ["Hotel 4★", "Desayuno incluido", "Excursiones"],
    isPromo: true,
  },
  {
    id: "mendoza-vino",
    title: "Mendoza - Ruta del Vino",
    location: "Mendoza, Argentina",
    image: "/placeholder.svg?height=400&width=600",
    price: "$75.500",
    duration: "3 días",
    dates: ["18 Sep", "25 Sep", "02 Oct"],
    category: "Gastronómico",
    rating: 4.9,
    reviews: 89,
    highlights: ["Cata de vinos", "Almuerzo gourmet", "Guía especializado"],
    isPromo: false,
  },
  {
    id: "cataratas-iguazu",
    title: "Cataratas del Iguazú",
    location: "Misiones, Argentina",
    image: "/placeholder.svg?height=400&width=600",
    price: "$65.900",
    duration: "2 días",
    dates: ["20 Sep", "27 Sep", "04 Oct"],
    category: "Naturaleza",
    rating: 4.7,
    reviews: 156,
    highlights: ["Lado argentino y brasileño", "Tren ecológico", "Garganta del Diablo"],
    isPromo: false,
  },
]

export function FeaturedTrips() {
  return (
    <section id="featured-trips" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 hover:from-cyan-500 hover:to-green-500">
            🔥 Más Populares
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Próximas Salidas Destacadas</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Los destinos más elegidos por nuestros viajeros con las mejores ofertas del mes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrips.map((trip) => (
            <Card
              key={trip.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={trip.image || "/placeholder.svg"}
                  alt={trip.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">{trip.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                {trip.originalPrice && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-gradient-to-r from-green-400 to-green-500 text-gray-900 animate-pulse">
                      ¡Oferta limitada!
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{trip.location}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {trip.title}
                </h3>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {trip.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {trip.reviews} reseñas
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {trip.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {trip.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{trip.originalPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-purple-600">{trip.price}</span>
                    </div>
                    <span className="text-sm text-gray-500">por persona</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Próximas fechas:</span>
                  </div>
                  <div className="flex gap-2">
                    {trip.dates.map((date, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-cyan-300 text-cyan-700">
                        {date}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href={`/viaje/${trip.id}`}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg">
                    Ver Detalles y Reservar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 bg-transparent border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            Ver Todos los Destinos
          </Button>
        </div>
      </div>
    </section>
  )
}
