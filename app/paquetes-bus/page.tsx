import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Heart, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const busPackages = [
  {
    id: "bariloche-clasico",
    title: "Bariloche Clásico",
    location: "San Carlos de Bariloche",
    image: "/placeholder.svg?height=300&width=400",
    price: "$89.900",
    originalPrice: "$99.900",
    duration: "4 días / 3 noches",
    dates: ["15 Sep", "22 Sep", "29 Sep", "06 Oct"],
    category: "Promoción",
    highlights: ["Hotel 4★", "Desayuno incluido", "Excursiones", "Traslados"],
    description: "Descubrí la belleza de la Patagonia con nuestro paquete más completo a Bariloche.",
    isPromo: true,
  },
  {
    id: "mendoza-vino",
    title: "Mendoza - Ruta del Vino",
    location: "Mendoza Capital",
    image: "/placeholder.svg?height=300&width=400",
    price: "$75.500",
    duration: "3 días / 2 noches",
    dates: ["18 Sep", "25 Sep", "02 Oct", "09 Oct"],
    category: "Gastronómico",
    highlights: ["Cata de vinos", "Almuerzo gourmet", "Guía especializado", "Transporte"],
    description: "Experiencia única en las mejores bodegas de Mendoza con degustaciones exclusivas.",
    isPromo: false,
  },
  {
    id: "cataratas-iguazu",
    title: "Cataratas del Iguazú",
    location: "Puerto Iguazú, Misiones",
    image: "/placeholder.svg?height=300&width=400",
    price: "$65.900",
    duration: "2 días / 1 noche",
    dates: ["20 Sep", "27 Sep", "04 Oct", "11 Oct"],
    category: "Naturaleza",
    highlights: ["Lado argentino y brasileño", "Tren ecológico", "Garganta del Diablo", "Hotel 3★"],
    description: "Maravillate con una de las 7 maravillas naturales del mundo.",
    isPromo: false,
  },
  {
    id: "salta-linda",
    title: "Salta la Linda",
    location: "Salta Capital",
    image: "/placeholder.svg?height=300&width=400",
    price: "$82.000",
    duration: "4 días / 3 noches",
    dates: ["12 Sep", "19 Sep", "26 Sep", "03 Oct"],
    category: "Cultural",
    highlights: ["Tren a las Nubes", "Quebrada de Humahuaca", "Purmamarca", "Guía local"],
    description: "Recorrido por el norte argentino con paisajes únicos y cultura ancestral.",
    isPromo: false,
  },
  {
    id: "villa-carlos-paz",
    title: "Villa Carlos Paz",
    location: "Córdoba",
    image: "/placeholder.svg?height=300&width=400",
    price: "$45.900",
    originalPrice: "$52.000",
    duration: "3 días / 2 noches",
    dates: ["16 Sep", "23 Sep", "30 Sep", "07 Oct"],
    category: "Promoción",
    highlights: ["Hotel frente al lago", "Espectáculos", "Actividades acuáticas", "Pensión completa"],
    description: "Escapada perfecta a las sierras cordobesas con entretenimiento garantizado.",
    isPromo: true,
  },
  {
    id: "mar-del-plata",
    title: "Mar del Plata",
    location: "Buenos Aires",
    image: "/placeholder.svg?height=300&width=400",
    price: "$58.900",
    duration: "3 días / 2 noches",
    dates: ["14 Sep", "21 Sep", "28 Sep", "05 Oct"],
    category: "Playa",
    highlights: ["Hotel céntrico", "Lobos marinos", "Casino", "Peatonal Güemes"],
    description: "La ciudad feliz te espera con sus playas, entretenimiento y gastronomía.",
    isPromo: false,
  },
]

export default function PaquetesBusPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">🚌 Más Popular</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Paquetes en Bus</h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Viajá cómodo y económico a los mejores destinos de Argentina. Salidas grupales con todo incluido.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Ver Ofertas Especiales
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 bg-transparent"
                >
                  Consultá por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Buscar destino..." className="pl-10 w-full sm:w-64" />
                </div>
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
              <div className="text-sm text-gray-600">Mostrando {busPackages.length} paquetes disponibles</div>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {busPackages.map((pkg) => (
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
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{pkg.location}</span>
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
                        <Users className="h-4 w-4" />
                        Grupal
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
                        <span className="text-sm font-medium">Próximas fechas:</span>
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

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">¿No encontrás lo que buscás?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactanos y armamos el viaje perfecto para vos con salidas personalizadas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Solicitar Cotización
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                Ver Todos los Destinos
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
