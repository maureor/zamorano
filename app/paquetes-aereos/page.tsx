import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Heart, Plane, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const aerialPackages = [
  {
    id: "brasil-rio",
    title: "Brasil - Río de Janeiro",
    location: "Brasil",
    image: "/placeholder.svg?height=300&width=400",
    price: "$189.900",
    originalPrice: "$210.000",
    duration: "5 días / 4 noches",
    dates: ["20 Sep", "27 Sep", "04 Oct", "11 Oct"],
    category: "Internacional",
    highlights: ["Vuelos incluidos", "Hotel 4★ Copacabana", "City Tour", "Cristo Redentor"],
    description: "Descubrí la ciudad maravillosa con vuelos directos y las mejores excursiones.",
    isPromo: true,
    rating: 4.8,
  },
  {
    id: "europa-madrid-barcelona",
    title: "Europa - Madrid y Barcelona",
    location: "España",
    image: "/placeholder.svg?height=300&width=400",
    price: "$899.900",
    duration: "10 días / 9 noches",
    dates: ["15 Oct", "22 Oct", "29 Oct"],
    category: "Premium",
    highlights: ["Vuelos directos", "Hoteles céntricos", "Tren AVE", "Guías en español"],
    description: "Recorrido completo por las dos ciudades más importantes de España.",
    isPromo: false,
    rating: 4.9,
  },
  {
    id: "miami-orlando",
    title: "Miami y Orlando",
    location: "Estados Unidos",
    image: "/placeholder.svg?height=300&width=400",
    price: "$1.299.900",
    duration: "8 días / 7 noches",
    dates: ["18 Sep", "25 Sep", "02 Oct"],
    category: "Familiar",
    highlights: ["Disney incluido", "Universal Studios", "South Beach", "Shopping"],
    description: "El viaje perfecto en familia con parques temáticos y playas paradisíacas.",
    isPromo: false,
    rating: 4.7,
  },
  {
    id: "ushuaia-fin-del-mundo",
    title: "Ushuaia - Fin del Mundo",
    location: "Tierra del Fuego",
    image: "/placeholder.svg?height=300&width=400",
    price: "$145.900",
    duration: "4 días / 3 noches",
    dates: ["22 Sep", "29 Sep", "06 Oct", "13 Oct"],
    category: "Aventura",
    highlights: ["Vuelo directo", "Canal Beagle", "Tren del Fin del Mundo", "Parque Nacional"],
    description: "Aventura única en el fin del mundo con paisajes inolvidables.",
    isPromo: false,
    rating: 4.6,
  },
]

export default function PaquetesAereosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                ✈️ Vuelos Incluidos
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Paquetes Aéreos</h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Escapadas rápidas y destinos internacionales. Viajá cómodo y llegá más rápido a tu destino soñado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Plane className="h-5 w-5 mr-2" />
                  Ver Destinos Internacionales
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 bg-transparent"
                >
                  Consultá Disponibilidad
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Vuelos Incluidos</h3>
                <p className="text-gray-600">Todos nuestros paquetes incluyen vuelos ida y vuelta</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hoteles Seleccionados</h3>
                <p className="text-gray-600">Alojamiento en hoteles de calidad garantizada</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Asistencia 24/7</h3>
                <p className="text-gray-600">Coordinador de viajes disponible las 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Destinos Destacados</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Seleccionamos los mejores destinos con vuelos directos y experiencias únicas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {aerialPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                        {pkg.category}
                      </Badge>
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
                    {pkg.originalPrice && (
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-gradient-to-r from-green-400 to-green-500 text-gray-900 animate-pulse">
                          ¡Oferta limitada!
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{pkg.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{pkg.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                      {pkg.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{pkg.description}</p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Plane className="h-4 w-4" />
                        Vuelos incluidos
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {pkg.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                          )}
                          <span className="text-2xl font-bold text-purple-600">{pkg.price}</span>
                        </div>
                        <span className="text-sm text-gray-500">por persona</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Próximas salidas:</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {pkg.dates.map((date, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-cyan-300 text-cyan-700">
                            {date}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link href={`/viaje/${pkg.id}`}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg">
                        Ver Detalles y Reservar
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
