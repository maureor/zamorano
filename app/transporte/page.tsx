import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Car, Bus, Plane, Users, Clock, Shield, Star, MapPin } from "lucide-react"
import Image from "next/image"

const transportServices = [
  {
    id: 1,
    title: "Traslado Aeropuerto",
    icon: Plane,
    image: "/placeholder.svg?height=200&width=300",
    price: "Desde $8.900",
    description: "Servicio puerta a puerta desde y hacia todos los aeropuertos",
    features: ["Servicio 24/7", "Seguimiento de vuelos", "Conductor profesional", "Vehículos premium"],
    capacity: "1-4 pasajeros",
    duration: "Según destino",
    category: "Premium",
  },
  {
    id: 2,
    title: "Transporte Grupal",
    icon: Bus,
    image: "/placeholder.svg?height=200&width=300",
    price: "Desde $25.900",
    description: "Minibús y micros para grupos grandes con conductor especializado",
    features: ["Hasta 50 pasajeros", "Aire acondicionado", "Sistema de audio", "Seguro total"],
    capacity: "8-50 pasajeros",
    duration: "Por día/horas",
    category: "Grupal",
  },
  {
    id: 3,
    title: "Remis Ejecutivo",
    icon: Car,
    image: "/placeholder.svg?height=200&width=300",
    price: "Desde $12.900",
    description: "Servicio ejecutivo para empresas y eventos especiales",
    features: ["Vehículos de lujo", "Conductor bilingüe", "WiFi a bordo", "Agua y amenities"],
    capacity: "1-3 pasajeros",
    duration: "Por horas",
    category: "Ejecutivo",
  },
]

const popularRoutes = [
  {
    from: "Buenos Aires",
    to: "Ezeiza (EZE)",
    price: "$8.900",
    duration: "45 min",
    distance: "35 km",
  },
  {
    from: "Buenos Aires",
    to: "Jorge Newbery (AEP)",
    price: "$6.500",
    duration: "25 min",
    distance: "15 km",
  },
  {
    from: "Bariloche Centro",
    to: "Aeropuerto BRC",
    price: "$4.900",
    duration: "20 min",
    distance: "12 km",
  },
  {
    from: "Mendoza Centro",
    to: "Aeropuerto MDZ",
    price: "$5.500",
    duration: "30 min",
    distance: "18 km",
  },
]

export default function TransportePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">🚗 Confiable</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Transporte</h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Traslados seguros y cómodos para todos tus viajes. Desde aeropuertos hasta excursiones grupales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Car className="h-5 w-5 mr-2" />
                  Reservar Traslado
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 bg-transparent"
                >
                  Cotizar Servicio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Booking Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Reservá tu Traslado</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Origen</label>
                      <Input placeholder="Desde..." className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Destino</label>
                      <Input placeholder="Hacia..." className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Fecha y Hora</label>
                      <Input type="datetime-local" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Pasajeros</label>
                      <Input type="number" placeholder="1" min="1" max="50" className="w-full" />
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                      Cotizar Traslado
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Transport Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Nuestros Servicios</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Flota moderna y conductores profesionales para todas tus necesidades de transporte
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {transportServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <Card
                    key={service.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                          {service.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {service.capacity}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {service.duration}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Características:</h4>
                        <div className="space-y-1">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-purple-600">{service.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">4.9</span>
                        </div>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg">
                        Reservar Ahora
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Rutas Populares</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Los traslados más solicitados con precios fijos y sin sorpresas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularRoutes.map((route, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">{route.from}</span>
                    </div>
                    <div className="text-center my-2">
                      <div className="w-8 h-0.5 bg-gray-300 mx-auto relative">
                        <div className="absolute right-0 top-0 w-2 h-2 bg-purple-600 rounded-full transform translate-x-1 -translate-y-0.75"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">{route.to}</span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Duración:</span>
                        <span className="font-medium">{route.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distancia:</span>
                        <span className="font-medium">{route.distance}</span>
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <span className="text-2xl font-bold text-purple-600">{route.price}</span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                    >
                      Reservar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">¿Por qué elegir nuestro transporte?</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Seguridad Total</h3>
                <p className="text-gray-600 text-sm">Conductores profesionales y vehículos con seguro completo</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Puntualidad</h3>
                <p className="text-gray-600 text-sm">Llegamos siempre a tiempo, seguimiento en tiempo real</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Calidad Premium</h3>
                <p className="text-gray-600 text-sm">Flota moderna con aire acondicionado y comodidades</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Atención 24/7</h3>
                <p className="text-gray-600 text-sm">Soporte disponible las 24 horas todos los días</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
