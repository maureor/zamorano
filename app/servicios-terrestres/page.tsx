import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Heart, Car, MapIcon, Camera } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const terrestrialServices = [
  {
    id: "city-tour-buenos-aires",
    title: "City Tour Buenos Aires",
    location: "Ciudad Autónoma de Buenos Aires",
    image: "/placeholder.svg?height=300&width=400",
    price: "$12.900",
    duration: "4 horas",
    dates: ["Todos los días"],
    category: "City Tour",
    highlights: ["Guía bilingüe", "Transporte incluido", "San Telmo", "La Boca", "Puerto Madero"],
    description: "Recorrido completo por los barrios más emblemáticos de Buenos Aires con guía especializado.",
    capacity: "Hasta 15 personas",
    includes: ["Transporte en minibús", "Guía profesional", "Entrada a museos", "Degustación de mate"],
  },
  {
    id: "excursion-delta-tigre",
    title: "Excursión Delta del Tigre",
    location: "Tigre, Buenos Aires",
    image: "/placeholder.svg?height=300&width=400",
    price: "$18.500",
    originalPrice: "$22.000",
    duration: "6 horas",
    dates: ["Sáb y Dom"],
    category: "Promoción",
    highlights: ["Navegación", "Mercado de Frutos", "Museo Naval", "Almuerzo incluido"],
    description: "Escapada perfecta a solo 30km de Buenos Aires navegando por los canales del Delta.",
    capacity: "Hasta 20 personas",
    includes: ["Traslado desde CABA", "Navegación 2hs", "Almuerzo", "Guía local"],
    isPromo: true,
  },
  {
    id: "ruta-vino-mendoza",
    title: "Ruta del Vino Mendoza",
    location: "Maipú, Mendoza",
    image: "/placeholder.svg?height=300&width=400",
    price: "$35.900",
    duration: "8 horas",
    dates: ["Lun a Sáb"],
    category: "Gastronómico",
    highlights: ["3 bodegas", "Cata de vinos", "Almuerzo gourmet", "Transporte premium"],
    description: "Experiencia enológica completa visitando las mejores bodegas de Maipú con degustaciones.",
    capacity: "Hasta 12 personas",
    includes: ["Transporte premium", "Visita 3 bodegas", "Cata guiada", "Almuerzo maridado"],
  },
  {
    id: "trekking-cerro-catedral",
    title: "Trekking Cerro Catedral",
    location: "Bariloche, Río Negro",
    image: "/placeholder.svg?height=300&width=400",
    price: "$28.900",
    duration: "6 horas",
    dates: ["Vie a Dom"],
    category: "Aventura",
    highlights: ["Guía de montaña", "Equipo incluido", "Vista panorámica", "Refugio"],
    description: "Aventura en la montaña más emblemática de Bariloche con vistas espectaculares del lago.",
    capacity: "Hasta 8 personas",
    includes: ["Guía especializado", "Equipo de trekking", "Seguro", "Refrigerio"],
  },
  {
    id: "safari-fotografico-valdes",
    title: "Safari Fotográfico Península Valdés",
    location: "Puerto Madryn, Chubut",
    image: "/placeholder.svg?height=300&width=400",
    price: "$45.900",
    duration: "10 horas",
    dates: ["Mar a Dom"],
    category: "Naturaleza",
    highlights: ["Ballenas francas", "Lobos marinos", "Pingüinos", "Guía naturalista"],
    description: "Experiencia única de avistaje de fauna marina en uno de los santuarios más importantes del mundo.",
    capacity: "Hasta 10 personas",
    includes: ["Transporte 4x4", "Guía naturalista", "Almuerzo", "Binoculares"],
  },
  {
    id: "circuito-quebrada-humahuaca",
    title: "Circuito Quebrada de Humahuaca",
    location: "Jujuy",
    image: "/placeholder.svg?height=300&width=400",
    price: "$52.900",
    duration: "12 horas",
    dates: ["Todos los días"],
    category: "Cultural",
    highlights: ["Patrimonio UNESCO", "Purmamarca", "Tilcara", "Humahuaca"],
    description: "Recorrido por la Quebrada declarada Patrimonio de la Humanidad con paisajes únicos.",
    capacity: "Hasta 16 personas",
    includes: ["Transporte", "Guía cultural", "Almuerzo típico", "Entradas"],
  },
]

export default function ServiciosTerrestresPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                🗺️ Experiencias Locales
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Servicios Terrestres</h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Excursiones y traslados personalizados. Descubrí cada destino con la comodidad y seguridad que te
                merecés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Car className="h-5 w-5 mr-2" />
                  Ver Excursiones
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 bg-transparent"
                >
                  Solicitar Traslado
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Nuestros Servicios</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Desde city tours hasta aventuras extremas, tenemos la excursión perfecta para vos
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">City Tours</h3>
                <p className="text-gray-600 text-sm">Conocé las ciudades con guías locales expertos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Traslados</h3>
                <p className="text-gray-600 text-sm">Transporte seguro y cómodo a cualquier destino</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Excursiones</h3>
                <p className="text-gray-600 text-sm">Aventuras únicas en los mejores destinos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Grupos Privados</h3>
                <p className="text-gray-600 text-sm">Servicios exclusivos para tu grupo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Excursiones Destacadas</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experiencias cuidadosamente seleccionadas con los mejores guías locales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {terrestrialServices.map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                        {service.category}
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
                    {service.originalPrice && (
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
                      <span className="text-sm text-gray-500">{service.location}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {service.capacity}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Incluye:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.includes.map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {service.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-purple-300 text-purple-700">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          {service.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{service.originalPrice}</span>
                          )}
                          <span className="text-2xl font-bold text-purple-600">{service.price}</span>
                        </div>
                        <span className="text-sm text-gray-500">por persona</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Disponibilidad:</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {service.dates.map((date, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-cyan-300 text-cyan-700">
                            {date}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link href={`/viaje/${service.id}`}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg">
                        Reservar Excursión
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Services CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">¿Necesitás algo personalizado?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Armamos excursiones y traslados a medida para grupos privados, empresas y eventos especiales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Solicitar Cotización Personalizada
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                Ver Servicios para Empresas
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
