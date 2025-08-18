"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Send,
  Plane,
  Shield,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const quickLinks = [
  { title: "Paquetes en Bus", href: "/paquetes-bus" },
  { title: "Paquetes Aéreos", href: "/paquetes-aereos" },
  { title: "Cruceros", href: "/cruceros" },
  { title: "Servicios Terrestres", href: "/servicios-terrestres" },
  { title: "Transporte", href: "/transporte" },
  { title: "Financiación", href: "/financiacion" },
]

const destinations = [
  { title: "Bariloche", href: "/destinos/bariloche" },
  { title: "Mendoza", href: "/destinos/mendoza" },
  { title: "Cataratas del Iguazú", href: "/destinos/cataratas" },
  { title: "Salta", href: "/destinos/salta" },
  { title: "Ushuaia", href: "/destinos/ushuaia" },
  { title: "Mar del Plata", href: "/destinos/mar-del-plata" },
]

const legalLinks = [
  { title: "Términos y Condiciones", href: "/terminos" },
  { title: "Política de Privacidad", href: "/privacidad" },
  { title: "Política de Cancelación", href: "/cancelacion" },
  { title: "Preguntas Frecuentes", href: "/faq" },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pb-20 md:pb-6">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">¡No te pierdas nuestras ofertas exclusivas!</h3>
            <p className="text-purple-100 mb-8 text-lg">
              Suscribite a nuestro newsletter y recibí las mejores promociones antes que nadie
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-cyan-300"
              />
              <Button className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 hover:from-cyan-500 hover:to-green-500 font-semibold">
                <Send className="h-4 w-4 mr-2" />
                Suscribirse
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                🎁 Descuentos exclusivos
              </Badge>
              <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">✈️ Ofertas anticipadas</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/placeholder.svg?height=60&width=180"
                alt="Zamorano Viajes Logo"
                width={180}
                height={60}
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-300 leading-relaxed">
                Más de 25 años creando experiencias únicas de viaje. Tu próxima aventura comienza con nosotros.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Av. Corrientes 1234, CABA, Argentina</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+54 11 4567-8900</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@zamoranoviajes.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Lun-Vie 9:00-18:00hs</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Nuestros Servicios</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Destinos Populares</h4>
            <ul className="space-y-3">
              {destinations.map((destination, index) => (
                <li key={index}>
                  <Link
                    href={destination.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                  >
                    {destination.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Información Legal</h4>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="font-semibold mb-4 text-white">Seguinos</h5>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 bg-gray-800 hover:bg-pink-600 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 bg-gray-800 hover:bg-blue-400 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm">Agencia Habilitada</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <span className="text-sm">Pagos Seguros</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Plane className="h-5 w-5 text-purple-400" />
              <span className="text-sm">IATA Certificado</span>
            </div>
            <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">⭐ 4.9/5 en Google</Badge>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Zamorano Viajes. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Legajo: EVT 12345</span>
              <span>•</span>
              <span>Resolución: 567/2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
