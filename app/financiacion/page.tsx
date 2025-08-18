import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calculator, Calendar, CheckCircle, CreditCard, DollarSign, Percent, Shield, Users } from "lucide-react"

const financingOptions = [
  {
    id: 1,
    title: "Pago en Cuotas sin Interés",
    icon: Percent,
    badge: "0% Interés",
    description: "Pagá tu viaje en hasta 12 cuotas fijas sin interés con tarjetas de crédito seleccionadas",
    features: ["Hasta 12 cuotas", "Sin interés", "Tarjetas participantes", "Aprobación inmediata"],
    minAmount: "$50.000",
    cards: ["Visa", "Mastercard", "American Express"],
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Financiación Propia",
    icon: DollarSign,
    badge: "Flexible",
    description: "Sistema de financiación propio con condiciones especiales y requisitos mínimos",
    features: ["Hasta 18 cuotas", "Tasa preferencial", "Pocos requisitos", "Respuesta rápida"],
    minAmount: "$30.000",
    cards: ["Efectivo", "Transferencia", "Cheques"],
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Plan Ahorro Viajero",
    icon: Calendar,
    badge: "Popular",
    description: "Ahorrá mes a mes y viajá cuando completes tu plan. Ideal para planificar con tiempo",
    features: ["Cuotas fijas", "Sorteos mensuales", "Descuentos especiales", "Flexibilidad de fechas"],
    minAmount: "$20.000",
    cards: ["Débito automático", "Transferencia", "Efectivo"],
    color: "bg-blue-500",
  },
]

const paymentMethods = [
  {
    name: "Tarjetas de Crédito",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
    features: ["Hasta 12 cuotas", "Sin interés", "Seguridad total"],
  },
  {
    name: "Transferencia Bancaria",
    description: "Todas las entidades bancarias",
    icon: DollarSign,
    features: ["Descuento por pago contado", "Procesamiento inmediato", "Sin comisiones"],
  },
  {
    name: "Efectivo",
    description: "En nuestras oficinas",
    icon: CheckCircle,
    features: ["Descuento especial", "Recibo inmediato", "Atención personalizada"],
  },
]

const simulatorData = [
  { amount: 50000, cuotas3: 16667, cuotas6: 8333, cuotas12: 4167 },
  { amount: 100000, cuotas3: 33333, cuotas6: 16667, cuotas12: 8333 },
  { amount: 150000, cuotas3: 50000, cuotas6: 25000, cuotas12: 12500 },
  { amount: 200000, cuotas3: 66667, cuotas6: 33333, cuotas12: 16667 },
]

export default function FinanciacionPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">💳 0% Interés</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Financiación</h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Hacé realidad tu viaje soñado con nuestras opciones de financiación flexibles. Pagá en cuotas sin
                interés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Calculator className="h-5 w-5 mr-2" />
                  Simular Financiación
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 bg-transparent"
                >
                  Ver Condiciones
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Simulator */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Simulador de Cuotas</h2>
                    <p className="text-gray-600">Calculá cuánto pagarías por mes según el monto de tu viaje</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Monto del viaje</label>
                      <Input type="number" placeholder="Ej: 100000" className="w-full text-lg" />
                      <p className="text-sm text-gray-500 mt-1">Ingresá el monto sin puntos ni comas</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Cantidad de cuotas</label>
                      <select className="w-full p-3 border border-gray-300 rounded-md text-lg">
                        <option value="3">3 cuotas sin interés</option>
                        <option value="6">6 cuotas sin interés</option>
                        <option value="12">12 cuotas sin interés</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-purple-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Tu cuota mensual sería:</p>
                      <p className="text-3xl font-bold text-purple-600">$8.333</p>
                      <p className="text-sm text-gray-500 mt-2">Sin interés • Tarjetas participantes</p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                      Solicitar Financiación
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Financing Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Opciones de Financiación</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Elegí la opción que mejor se adapte a tus necesidades y empezá a planificar tu viaje
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {financingOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <Card
                    key={option.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg relative"
                  >
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900">
                        {option.badge}
                      </Badge>
                    </div>

                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${option.color.replace(
                            "bg-",
                            "bg-",
                          )}/10 mb-4`}
                        >
                          <IconComponent className={`h-8 w-8 ${option.color.replace("bg-", "text-")}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{option.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3">Características:</h4>
                        <div className="space-y-2">
                          {option.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Monto mínimo:</span>
                          <span className="font-semibold text-gray-900">{option.minAmount}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>Medios de pago: </span>
                          <span className="font-medium">{option.cards.join(", ")}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg">
                        Solicitar Información
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Medios de Pago Aceptados</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Múltiples opciones para que puedas pagar de la forma que más te convenga
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{method.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                      <div className="space-y-2">
                        {method.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center justify-center gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Beneficios de Financiar con Nosotros</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Percent className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Sin Interés</h3>
                <p className="text-gray-600 text-sm">Cuotas fijas sin interés en tarjetas seleccionadas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Seguridad Total</h3>
                <p className="text-gray-600 text-sm">Transacciones seguras y protección de datos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Aprobación Rápida</h3>
                <p className="text-gray-600 text-sm">Respuesta inmediata para la mayoría de solicitudes</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Asesoramiento</h3>
                <p className="text-gray-600 text-sm">Te ayudamos a elegir la mejor opción para vos</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">¿Listo para financiar tu próximo viaje?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestros asesores te ayudan a encontrar la mejor opción de financiación para tu viaje
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Calculator className="h-5 w-5 mr-2" />
                Solicitar Financiación
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                Hablar con un Asesor
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
