import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Heart, Ship, Anchor } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const cruisePackages = [
  {
    id: "crucero-mediterraneo",
    title: "Crucero por el Mediterráneo",
    location: "Europa",
    image: "/placeholder.svg?height=300&width=400",
    price: "$1.899.900",
    duration: "12 días / 11 noches",
    dates: ["15 Oct", "29 Oct", "12 Nov"],
    category: "Premium",
    highlights: ["Todo incluido", "7 puertos", "Espectáculos", "Spa y casino"],
    description: "Navegá por las aguas cristalinas del Mediterráneo visitando los puertos más hermosos.",
    ports: ["Barcelona", "Roma", "Nápoles", "Santorini", "Mykonos", "Dubrovnik", "Venecia"],
    ship: "MSC Seaside",
  },
  {
    id: "crucero-caribe",
    title: "Crucero por el Caribe",
    location: "Caribe",
    image: "/placeholder.svg?height=300&width=400",
    price: "$1.299.900",
    originalPrice: "$1.450.000",
    duration: "8 días / 7 noches",
    dates: ["22 Sep", "06 Oct", "20 Oct"],
    category: "Promoción",
    highlights: ["Playas paradisíacas", "Actividades acuáticas", "Entretenimiento", "Gastronomía"],
    description: "Experiencia tropical única navegando por las islas más hermosas del Caribe.",
    ports: ["Miami", "Cozumel", "Jamaica", "Gran Caimán", "Bahamas"],
    ship: "Royal Caribbean Oasis",
    isPromo: true,
  },
  {
    id: "crucero-antartico",
    title: "Crucero Antártico",
    location: "Antártida",
    image: "/placeholder.svg?height=300&width=400",
    price: "$3.999.900",
    duration: "15 días / 14 noches",
    dates: ["01 Nov", "15 Nov", "01 Dec"],
    category: "Aventura",
    highlights: ["Expedición única", "Fauna antártica", "Zodiac", "Conferencias"],
    description: "Aventura única al continente blanco con avistaje de fauna y paisajes únicos.",
    ports: ["Ushuaia", "Península Antártica", "Islas Shetland", "Canal Beagle"],
    ship: "Expedition Explorer",
  },
]

export default function CrucerosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">🚢 Nuevo</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Cruceros</h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Experiencias únicas navegando por el mundo. Descubrí múltiples destinos en un solo viaje con todo
                incluido.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Ship className="h-5 w-5 mr-2" />
                  Ver Rutas Disponibles
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 bg-transparent"
                >
                  Solicitar Información
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Cruises */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">¿Por qué elegir un crucero?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                La forma más cómoda de conocer múltiples destinos con todas las comodidades incluidas
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ship className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Todo Incluido</h3>
                <p className="text-gray-600 text-sm">Alojamiento, comidas, entretenimiento y más</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Múltiples Destinos</h3>
                <p className="text-gray-600 text-sm">Conocé varios países en un solo viaje</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Para Toda la Familia</h3>
                <p className="text-gray-600 text-sm">Actividades para todas las edades</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Anchor className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Sin Complicaciones</h3>
                <p className="text-gray-600 text-sm">Desempacá una sola vez y relajate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cruise Packages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Rutas Disponibles</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Navegá por los mares más hermosos del mundo con las mejores navieras
              </p>
            </div>

            <div className="space-y-8">
              {cruisePackages.map((cruise) => (
                <Card
                  key={cruise.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={cruise.image || "/placeholder.svg"}
                        alt={cruise.title}
                        width={400}
                        height={300}
                        className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                          {cruise.category}
                        </Badge>
                      </div>
                      {cruise.originalPrice && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-gradient-to-r from-green-400 to-green-500 text-gray-900 animate-pulse">
                            ¡Oferta limitada!
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">{cruise.location}</span>
                          </div>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-purple-600">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                          {cruise.title}
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed">{cruise.description}</p>

                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {cruise.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Ship className="h-4 w-4" />
                            {cruise.ship}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Puertos de escala:</h4>
                          <div className="flex flex-wrap gap-2">
                            {cruise.ports.map((port, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                                {port}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {cruise.highlights.map((highlight, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-purple-300 text-purple-700"
                              >
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              {cruise.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">{cruise.originalPrice}</span>
                              )}
                              <span className="text-2xl font-bold text-purple-600">{cruise.price}</span>
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
                            {cruise.dates.map((date, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-cyan-300 text-cyan-700">
                                {date}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Link href={`/viaje/${cruise.id}`}>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg">
                            Ver Detalles y Reservar
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
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
