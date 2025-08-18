"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Star,
  Bed,
  CheckCircle,
  Phone,
  MessageCircle,
  Share2,
  Download,
  ArrowLeft,
  Users,
  Shield,
  CreditCard,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Datos simulados del viaje (en una app real vendría de la base de datos)
const tripData = {
  id: "bariloche-clasico",
  title: "Bariloche Clásico",
  subtitle: "San Carlos de Bariloche",
  location: "Patagonia Argentina",
  category: "Promoción",
  price: "$89.900",
  originalPrice: "$99.900",
  duration: "4 días / 3 noches",
  rating: 4.8,
  reviews: 124,
  isPromo: true,
  urgency: "¡Solo quedan 3 lugares!",
  discount: "Ahorrás $10.000",
  mainImage: "/placeholder.svg?height=600&width=900&text=Bariloche+Principal",
  gallery: [
    "/placeholder.svg?height=400&width=600&text=Bariloche+Vista+1",
    "/placeholder.svg?height=400&width=600&text=Bariloche+Vista+2",
    "/placeholder.svg?height=400&width=600&text=Bariloche+Vista+3",
    "/placeholder.svg?height=400&width=600&text=Bariloche+Vista+4",
    "/placeholder.svg?height=400&width=600&text=Bariloche+Vista+5",
    "/placeholder.svg?height=400&width=600&text=Bariloche+Vista+6",
  ],
  videoUrl: "/placeholder.svg?height=400&width=600&text=Video+Preview",
  description:
    "Descubrí la belleza incomparable de la Patagonia argentina en este viaje completo a Bariloche. Disfrutá de paisajes únicos, actividades al aire libre y la hospitalidad característica de la región. Un destino perfecto para conectar con la naturaleza y vivir experiencias inolvidables.",
  highlights: [
    "Hotel 4★ céntrico con desayuno incluido",
    "Excursión al Cerro Catedral con aerosilla",
    "Navegación por el Lago Nahuel Huapi",
    "City tour por el centro de Bariloche",
    "Visita a la Chocolatería Havanna",
    "Traslados aeropuerto incluidos",
    "Guía local especializado",
    "Seguro de viaje completo",
  ],
  itinerary: [
    {
      day: 1,
      title: "Llegada a Bariloche",
      description:
        "Recepción en el aeropuerto y traslado al hotel. Check-in y tarde libre para conocer el centro de la ciudad.",
      activities: [
        "Traslado aeropuerto-hotel",
        "Check-in en hotel 4★",
        "Tarde libre en el centro",
        "Cena por cuenta propia",
      ],
      image: "/placeholder.svg?height=200&width=300&text=Día+1",
    },
    {
      day: 2,
      title: "Cerro Catedral",
      description: "Excursión de día completo al centro de esquí más importante de Sudamérica con vistas panorámicas.",
      activities: [
        "Desayuno en hotel",
        "Excursión Cerro Catedral",
        "Almuerzo en la montaña",
        "Aerosilla y actividades",
        "Regreso al hotel",
      ],
      image: "/placeholder.svg?height=200&width=300&text=Día+2",
    },
    {
      day: 3,
      title: "Circuito Chico",
      description: "Recorrido por los puntos más emblemáticos de Bariloche incluyendo navegación por el lago.",
      activities: [
        "Desayuno en hotel",
        "Circuito Chico completo",
        "Navegación Lago Nahuel Huapi",
        "Visita Puerto Blest",
        "Tarde libre",
      ],
      image: "/placeholder.svg?height=200&width=300&text=Día+3",
    },
    {
      day: 4,
      title: "City Tour y Partida",
      description: "Último día con city tour por el centro y visita a chocolaterías antes del traslado al aeropuerto.",
      activities: [
        "Desayuno en hotel",
        "City tour centro",
        "Chocolatería Havanna",
        "Check-out",
        "Traslado al aeropuerto",
      ],
      image: "/placeholder.svg?height=200&width=300&text=Día+4",
    },
  ],
  includes: [
    "Traslados aeropuerto-hotel-aeropuerto",
    "Alojamiento 3 noches en hotel 4★",
    "Desayuno diario",
    "Excursión Cerro Catedral con aerosilla",
    "Circuito Chico con navegación",
    "City tour por Bariloche",
    "Guía local en todas las excursiones",
    "Seguro de viaje",
    "Coordinador permanente",
  ],
  notIncludes: [
    "Pasajes aéreos",
    "Almuerzos y cenas",
    "Bebidas",
    "Excursiones opcionales",
    "Gastos personales",
    "Propinas",
  ],
  dates: [
    { date: "15 Sep 2024", available: true, price: "$89.900", spots: 3 },
    { date: "22 Sep 2024", available: true, price: "$89.900", spots: 8 },
    { date: "29 Sep 2024", available: false, price: "$89.900", spots: 0 },
    { date: "06 Oct 2024", available: true, price: "$94.900", spots: 12 },
    { date: "13 Oct 2024", available: true, price: "$94.900", spots: 6 },
    { date: "20 Oct 2024", available: true, price: "$99.900", spots: 15 },
  ],
  hotel: {
    name: "Hotel Tres Reyes",
    category: "4 estrellas",
    location: "Centro de Bariloche",
    rating: 4.6,
    amenities: ["WiFi gratuito", "Desayuno buffet", "Spa", "Gimnasio", "Room service", "Estacionamiento"],
    image: "/placeholder.svg?height=200&width=300&text=Hotel+Tres+Reyes",
  },
  testimonials: [
    {
      name: "María González",
      location: "Buenos Aires",
      rating: 5,
      text: "Increíble experiencia en Bariloche. Todo perfectamente organizado y los paisajes son de otro mundo. Recomiendo 100%.",
      date: "Agosto 2024",
      avatar: "/placeholder.svg?height=50&width=50&text=MG",
    },
    {
      name: "Carlos Rodríguez",
      location: "Córdoba",
      rating: 5,
      text: "El hotel excelente y las excursiones muy bien planificadas. El guía local conocía todos los secretos de Bariloche.",
      date: "Julio 2024",
      avatar: "/placeholder.svg?height=50&width=50&text=CR",
    },
    {
      name: "Ana Martínez",
      location: "Rosario",
      rating: 5,
      text: "Superó todas mis expectativas. La atención al detalle y la calidad del servicio fueron excepcionales.",
      date: "Junio 2024",
      avatar: "/placeholder.svg?height=50&width=50&text=AM",
    },
  ],
  faqs: [
    {
      question: "¿Qué documentación necesito?",
      answer:
        "Solo necesitás tu DNI argentino en vigencia. Para menores de edad, autorización de viaje si no viajan con ambos padres.",
    },
    {
      question: "¿El clima puede afectar las excursiones?",
      answer:
        "Tenemos planes alternativos para días de mal clima. Todas las actividades se adaptan a las condiciones meteorológicas.",
    },
    {
      question: "¿Puedo cancelar mi reserva?",
      answer:
        "Sí, podés cancelar hasta 48hs antes de la salida sin costo. Después de ese plazo se aplican penalidades según nuestros términos.",
    },
  ],
}

export default function TripDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [showVideo, setShowVideo] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % tripData.gallery.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + tripData.gallery.length) % tripData.gallery.length)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <section className="pt-32 pb-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-purple-600 transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/paquetes-bus" className="hover:text-purple-600 transition-colors">
                Paquetes en Bus
              </Link>
              <span>/</span>
              <span className="text-gray-900">{tripData.title}</span>
            </div>
            <Link href="/paquetes-bus">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:text-purple-700 p-0 hover:bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Paquetes en Bus
              </Button>
            </Link>
          </div>
        </section>

        {/* Hero Section Optimizada */}
        <section className="pb-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Image Gallery - Más grande y atractiva */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src={tripData.gallery[selectedImage] || "/placeholder.svg"}
                    alt={tripData.title}
                    width={900}
                    height={600}
                    className="w-full h-96 lg:h-[500px] object-cover cursor-pointer"
                    onClick={() => setShowGallery(true)}
                  />

                  {/* Overlay con información clave */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges flotantes */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 font-semibold">
                      {tripData.category}
                    </Badge>
                    {tripData.urgency && (
                      <Badge className="bg-red-500 text-white animate-pulse font-semibold">{tripData.urgency}</Badge>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Navegación de imágenes */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>

                  {/* Indicador de imagen */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {tripData.gallery.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === selectedImage ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>

                  {/* Oferta destacada */}
                  {tripData.originalPrice && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-gradient-to-r from-green-400 to-green-500 text-gray-900 animate-pulse font-semibold text-sm px-3 py-1">
                        {tripData.discount}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery mejorada */}
                <div className="grid grid-cols-6 gap-2">
                  {tripData.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
                        index === selectedImage ? "ring-2 ring-purple-500 scale-105" : "hover:scale-105 hover:shadow-lg"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${tripData.title} ${index + 1}`}
                        width={150}
                        height={100}
                        className="w-full h-16 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Card Optimizada para Conversión */}
              <div className="lg:col-span-1">
                <Card className="sticky top-32 border-2 border-purple-200 shadow-2xl">
                  <CardContent className="p-0">
                    {/* Header del precio con urgencia */}
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-lg">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {tripData.originalPrice && (
                            <span className="text-lg text-purple-200 line-through">{tripData.originalPrice}</span>
                          )}
                          <span className="text-4xl font-bold">{tripData.price}</span>
                        </div>
                        <p className="text-purple-100 mb-2">por persona</p>
                        {tripData.discount && (
                          <Badge className="bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-semibold">
                            {tripData.discount}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Formulario de reserva */}
                    <div className="p-6 space-y-4">
                      {/* Selector de fecha mejorado */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-900">Elegí tu fecha</label>
                        <select
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        >
                          <option value="">Seleccionar fecha</option>
                          {tripData.dates
                            .filter((d) => d.available)
                            .map((date, index) => (
                              <option key={index} value={date.date}>
                                {date.date} - {date.price} ({date.spots} lugares)
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* Selector de pasajeros */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-900">Pasajeros</label>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPassengers(Math.max(1, passengers - 1))}
                            className="w-10 h-10 p-0"
                          >
                            -
                          </Button>
                          <span className="text-xl font-semibold w-8 text-center">{passengers}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPassengers(passengers + 1)}
                            className="w-10 h-10 p-0"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Precio total */}
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total:</span>
                          <span className="text-2xl font-bold text-purple-600">
                            ${(Number.parseInt(tripData.price.replace(/[$.]/g, "")) * passengers).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Para {passengers} pasajero{passengers > 1 ? "s" : ""}
                        </p>
                      </div>

                      {/* Botones CTA optimizados */}
                      <div className="space-y-3">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-lg py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                          disabled={!selectedDate}
                        >
                          <Zap className="h-5 w-5 mr-2" />
                          Reservar Ahora
                        </Button>

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            className="border-green-500 text-green-700 hover:bg-green-50 font-semibold bg-transparent"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            WhatsApp
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-500 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Llamar
                          </Button>
                        </div>
                      </div>

                      {/* Trust signals */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span>Cancelación gratuita hasta 48hs antes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CreditCard className="h-4 w-4 text-blue-500" />
                          <span>Hasta 12 cuotas sin interés</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span>25 años de experiencia</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Info básica del viaje */}
            <div className="mt-8 lg:pr-80">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{tripData.location}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{tripData.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{tripData.subtitle}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(tripData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{tripData.rating}</span>
                  <span className="text-gray-500">({tripData.reviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{tripData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">Grupal</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg">{tripData.description}</p>
            </div>
          </div>
        </section>

        {/* Trip Details Tabs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Highlights */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Lo que incluye este viaje</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {tripData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Itinerary */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Itinerario Detallado</h2>
                    <div className="space-y-6">
                      {tripData.itinerary.map((day, index) => (
                        <div key={index} className="border-l-4 border-purple-200 pl-6 relative">
                          <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{day.day}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2 text-gray-900">
                            Día {day.day}: {day.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{day.description}</p>
                          <div className="space-y-1">
                            {day.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                {activity}
                              </div>
                            ))}
                          </div>
                          {day.image && (
                            <div className="mt-4">
                              <Image
                                src={day.image || "/placeholder.svg"}
                                alt={`Día ${day.day}`}
                                width={300}
                                height={200}
                                className="w-full h-auto rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Includes/Not Includes */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Incluye
                      </h3>
                      <div className="space-y-2">
                        {tripData.includes.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 text-red-700 flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-red-500 rounded-full flex items-center justify-center">
                          <span className="text-red-500 text-xs">✕</span>
                        </span>
                        No Incluye
                      </h3>
                      <div className="space-y-2">
                        {tripData.notIncludes.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <span className="w-4 h-4 border border-red-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-red-500 text-xs">✕</span>
                            </span>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Hotel Info */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <Bed className="h-6 w-6 text-purple-600" />
                      Alojamiento
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{tripData.hotel.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(Math.floor(tripData.hotel.rating))].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                          {[...Array(5 - Math.floor(tripData.hotel.rating))].map((_, i) => (
                            <Star key={i + tripData.hotel.rating} className="h-4 w-4 text-gray-300" />
                          ))}
                          <span className="text-sm text-gray-600">{tripData.hotel.category}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{tripData.hotel.location}</span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src={tripData.hotel.image || "/placeholder.svg"}
                          alt={tripData.hotel.name}
                          width={300}
                          height={200}
                          className="w-full h-auto rounded-lg mb-4"
                        />
                        <h4 className="font-semibold mb-2">Servicios del hotel:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {tripData.hotel.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonials */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Reseñas de Viajeros</h2>
                    <div className="space-y-6">
                      {tripData.testimonials.map((testimonial, index) => (
                        <div key={index} className="border-l-4 border-purple-200 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-500">{testimonial.date}</span>
                          </div>
                          <p className="text-gray-700 mb-2">"{testimonial.text}"</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {testimonial.name} - {testimonial.location}
                          </p>
                          {testimonial.avatar && (
                            <div className="mt-2">
                              <Image
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                width={50}
                                height={50}
                                className="w-10 h-10 rounded-full"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQs */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                      {tripData.faqs.map((faq, index) => (
                        <div key={index} className="border-b pb-4">
                          <h3 className="text-lg font-bold mb-2 text-gray-900">{faq.question}</h3>
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Available Dates */}
                <Card className="sticky top-32">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      Fechas Disponibles
                    </h3>
                    <div className="space-y-3">
                      {tripData.dates.map((dateInfo, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            dateInfo.available
                              ? "border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer"
                              : "border-gray-200 bg-gray-50 opacity-50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-gray-900">{dateInfo.date}</p>
                              <p className="text-sm text-gray-600">{dateInfo.price}</p>
                            </div>
                            <div>
                              {dateInfo.available ? (
                                <Badge className="bg-green-500 text-white">Disponible</Badge>
                              ) : (
                                <Badge variant="secondary">Completo</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Consultá por este viaje</h3>
                    <form className="space-y-4">
                      <div>
                        <Input placeholder="Tu nombre completo" />
                      </div>
                      <div>
                        <Input type="email" placeholder="Tu email" />
                      </div>
                      <div>
                        <Input type="tel" placeholder="Tu teléfono" />
                      </div>
                      <div>
                        <select className="w-full p-3 border border-gray-300 rounded-md">
                          <option value="">Seleccionar fecha</option>
                          {tripData.dates
                            .filter((d) => d.available)
                            .map((date, index) => (
                              <option key={index} value={date.date}>
                                {date.date}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <Input type="number" placeholder="Cantidad de pasajeros" min="1" />
                      </div>
                      <div>
                        <Textarea placeholder="Mensaje o consulta adicional" rows={3} />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Enviar Consulta</Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Acciones Rápidas</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Consultar por WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Llamar ahora
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Descargar PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
