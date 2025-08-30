'use client'

import { useState, useEffect } from 'react'
import { useRefresh, useRefreshable } from '@/components/ui/refresh-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshButton } from "@/components/ui/refresh-button"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings,
  Save,
  Globe,
  Mail,
  Shield,
  Database,
  Palette,
  Bell
} from 'lucide-react'

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(true)
  const { isRefreshing } = useRefresh()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Función para recargar configuración
  const fetchConfig = async () => {
    setLoading(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 700))
    setLoading(false)
  }

  // Registrar para refresh automático
  useRefreshable('config-data', fetchConfig)
  
  // Estado de configuración general
  const [configGeneral, setConfigGeneral] = useState({
    siteName: 'Zamorano Turismo',
    siteDescription: 'Tu agencia de viajes de confianza',
    contactEmail: 'info@zamoranoturismo.com',
    contactPhone: '+54 9 11 1234-5678',
    address: 'Av. Corrientes 1234, CABA, Argentina',
    timezone: 'America/Argentina/Buenos_Aires'
  })

  // Estado de configuración de notificaciones
  const [configNotifications, setConfigNotifications] = useState({
    emailNotifications: true,
    newTestimonioAlert: true,
    newContactAlert: true,
    lowStockAlert: false,
    systemUpdates: true
  })

  // Estado de configuración de SEO
  const [configSeo, setConfigSeo] = useState({
    metaTitle: 'Zamorano Turismo - Viajes y Paquetes Turísticos',
    metaDescription: 'Descubre el mundo con Zamorano Turismo. Ofertas en cruceros, paquetes aéreos y terrestres.',
    metaKeywords: 'turismo, viajes, cruceros, paquetes, argentina',
    googleAnalytics: '',
    facebookPixel: ''
  })

  const handleSaveGeneral = async () => {
    setLoading(true)
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Configuración general guardada:', configGeneral)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Configuración de notificaciones guardada:', configNotifications)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSeo = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Configuración SEO guardada:', configSeo)
    } finally {
      setLoading(false)
    }
  }

  // Mostrar skeleton solo para el contenido interno (NO el header)
  const contentSkeleton = loading || isRefreshing ? (
    <>
      <div className="grid w-full grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, cardIndex) => (
          <Card key={cardIndex}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  ) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <RefreshButton size="default" className="mt-1" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">
            Administra la configuración general del sistema
          </p>
        </div>
      </div>

      {contentSkeleton ? contentSkeleton : (
      <>
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Sistema
          </TabsTrigger>
        </TabsList>

        {/* Configuración General */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>
                Configuración básica del sitio web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del Sitio</Label>
                  <Input
                    id="siteName"
                    value={configGeneral.siteName}
                    onChange={(e) => setConfigGeneral(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contacto</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={configGeneral.contactEmail}
                    onChange={(e) => setConfigGeneral(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono</Label>
                  <Input
                    id="contactPhone"
                    value={configGeneral.contactPhone}
                    onChange={(e) => setConfigGeneral(prev => ({ ...prev, contactPhone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select value={configGeneral.timezone} onValueChange={(value) => setConfigGeneral(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Argentina/Buenos_Aires">Buenos Aires</SelectItem>
                      <SelectItem value="America/New_York">New York</SelectItem>
                      <SelectItem value="Europe/Madrid">Madrid</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descripción del Sitio</Label>
                <Textarea
                  id="siteDescription"
                  value={configGeneral.siteDescription}
                  onChange={(e) => setConfigGeneral(prev => ({ ...prev, siteDescription: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={configGeneral.address}
                  onChange={(e) => setConfigGeneral(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              
              <Button onClick={handleSaveGeneral} variant="brand" disabled={loading}>
                {loading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuración SEO */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO y Meta Tags</CardTitle>
              <CardDescription>
                Optimización para motores de búsqueda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Título Meta</Label>
                <Input
                  id="metaTitle"
                  value={configSeo.metaTitle}
                  onChange={(e) => setConfigSeo(prev => ({ ...prev, metaTitle: e.target.value }))}
                  placeholder="Título que aparece en Google"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Descripción Meta</Label>
                <Textarea
                  id="metaDescription"
                  value={configSeo.metaDescription}
                  onChange={(e) => setConfigSeo(prev => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="Descripción que aparece en Google"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Palabras Clave</Label>
                <Input
                  id="metaKeywords"
                  value={configSeo.metaKeywords}
                  onChange={(e) => setConfigSeo(prev => ({ ...prev, metaKeywords: e.target.value }))}
                  placeholder="palabra1, palabra2, palabra3"
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                  <Input
                    id="googleAnalytics"
                    value={configSeo.googleAnalytics}
                    onChange={(e) => setConfigSeo(prev => ({ ...prev, googleAnalytics: e.target.value }))}
                    placeholder="GA-XXXXXXXXX-X"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                  <Input
                    id="facebookPixel"
                    value={configSeo.facebookPixel}
                    onChange={(e) => setConfigSeo(prev => ({ ...prev, facebookPixel: e.target.value }))}
                    placeholder="123456789012345"
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveSeo} variant="brand" disabled={loading}>
                {loading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar SEO
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuración de Notificaciones */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Configura qué notificaciones quieres recibir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibir notificaciones generales por email
                  </p>
                </div>
                <Switch
                  checked={configNotifications.emailNotifications}
                  onCheckedChange={(checked) => setConfigNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nuevos Testimonios</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar cuando se reciba un nuevo testimonio
                  </p>
                </div>
                <Switch
                  checked={configNotifications.newTestimonioAlert}
                  onCheckedChange={(checked) => setConfigNotifications(prev => ({ ...prev, newTestimonioAlert: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nuevos Contactos</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar cuando alguien use el formulario de contacto
                  </p>
                </div>
                <Switch
                  checked={configNotifications.newContactAlert}
                  onCheckedChange={(checked) => setConfigNotifications(prev => ({ ...prev, newContactAlert: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Actualizaciones del Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar sobre actualizaciones importantes
                  </p>
                </div>
                <Switch
                  checked={configNotifications.systemUpdates}
                  onCheckedChange={(checked) => setConfigNotifications(prev => ({ ...prev, systemUpdates: checked }))}
                />
              </div>
              
              <Button onClick={handleSaveNotifications} variant="brand" disabled={loading}>
                {loading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Notificaciones
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuración del Sistema */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Sistema</CardTitle>
              <CardDescription>
                Estado y configuración técnica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Versión del Sistema</Label>
                  <p className="text-sm text-muted-foreground">v1.0.0</p>
                </div>
                <div className="space-y-2">
                  <Label>Base de Datos</Label>
                  <p className="text-sm text-muted-foreground">PostgreSQL 14.x</p>
                </div>
                <div className="space-y-2">
                  <Label>Última Actualización</Label>
                  <p className="text-sm text-muted-foreground">15 de Enero, 2024</p>
                </div>
                <div className="space-y-2">
                  <Label>Estado del Sistema</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Operativo</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Acciones del Sistema</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    Backup BD
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Verificar Seguridad
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </>
      )}
    </div>
  )
}
