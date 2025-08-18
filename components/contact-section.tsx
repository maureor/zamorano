"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MessageCircle, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white pb-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400 to-green-400 transform rotate-12 scale-150"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para tu próxima aventura?</h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Contactanos y empezá a planificar el viaje de tus sueños
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-200 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <p className="text-purple-100">+54 11 4567-8900</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-200 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <p className="text-purple-100">+54 9 11 1234-5678</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-200 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-purple-100">info@zamoranoviajes.com</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-200 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Horarios</h3>
              <p className="text-purple-100">Lun-Vie 9-18hs</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <MessageCircle className="h-5 w-5 mr-2" />
              Consultá por WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 px-8 py-4 text-lg font-semibold bg-transparent"
            >
              <Mail className="h-5 w-5 mr-2" />
              Envianos un Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
