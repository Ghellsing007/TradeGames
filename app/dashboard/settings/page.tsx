"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Camera, CreditCard, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")

  // Datos de ejemplo del usuario
  const [userData, setUserData] = useState({
    name: "GameMaster",
    email: "gamemaster@example.com",
    phone: "+1 234 567 8900",
    description:
      "Vendedor especializado en cuentas de League of Legends y Valorant. Todas mis cuentas son originales y tienen garantía de 30 días. Entrega inmediata después del pago.",
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false,
    },
    security: {
      twoFactor: false,
    },
  })

  // Manejar cambios en los campos del formulario
  const handleInputChange = (field: string, value: string) => {
    setUserData({
      ...userData,
      [field]: value,
    })
  }

  // Manejar cambios en las notificaciones
  const handleNotificationChange = (field: string, value: boolean) => {
    setUserData({
      ...userData,
      notifications: {
        ...userData.notifications,
        [field]: value,
      },
    })
  }

  // Manejar cambios en la seguridad
  const handleSecurityChange = (field: string, value: boolean) => {
    setUserData({
      ...userData,
      security: {
        ...userData.security,
        [field]: value,
      },
    })
  }

  // Guardar cambios del perfil
  const handleSaveProfile = async () => {
    setIsUpdating(true)

    try {
      // Aquí iría la lógica para guardar los cambios en el servidor
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Perfil actualizado",
        description: "Los cambios en tu perfil han sido guardados correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Cambiar la imagen de perfil
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <DashboardSidebar className="w-full md:w-64 shrink-0" />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Configuración</h1>

          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="payment">Pagos</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Perfil</CardTitle>
                  <CardDescription>Actualiza tu información personal y de perfil.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileImage} alt={userData.name} />
                        <AvatarFallback>{userData.name[0]}</AvatarFallback>
                      </Avatar>
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
                      >
                        <Camera className="h-4 w-4" />
                      </label>
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>

                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre de Usuario</Label>
                          <Input
                            id="name"
                            value={userData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo Electrónico</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          className="min-h-[100px]"
                          value={userData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Esta descripción aparecerá en tu perfil público.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isUpdating}>
                    {isUpdating ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                  <CardDescription>Configura cómo y cuándo quieres recibir notificaciones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="text-base">
                          Notificaciones por Email
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe actualizaciones importantes por correo electrónico.
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={userData.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications" className="text-base">
                          Notificaciones Push
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones en tiempo real en tu navegador.
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={userData.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications" className="text-base">
                          Notificaciones SMS
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe alertas importantes por mensaje de texto.
                        </p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={userData.notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing-notifications" className="text-base">
                          Comunicaciones de Marketing
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe ofertas, promociones y novedades de TradeGames.
                        </p>
                      </div>
                      <Switch
                        id="marketing-notifications"
                        checked={userData.notifications.marketing}
                        onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isUpdating}>
                    {isUpdating ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seguridad de la Cuenta</CardTitle>
                  <CardDescription>Gestiona la seguridad de tu cuenta y tus credenciales.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="text-base">
                          Autenticación de Dos Factores
                        </Label>
                        <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta.</p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={userData.security.twoFactor}
                        onCheckedChange={(checked) => handleSecurityChange("twoFactor", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-base">Cambiar Contraseña</Label>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Contraseña Actual</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nueva Contraseña</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-base">Sesiones Activas</Label>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Este Dispositivo</p>
                            <p className="text-sm text-muted-foreground">
                              Última actividad: {new Date().toLocaleString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Lock className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isUpdating}>
                    {isUpdating ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </CardFooter>
              </Card>

              <Alert className="mt-6" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Zona de Peligro</AlertTitle>
                <AlertDescription>
                  <p className="mb-4">
                    Las siguientes acciones son irreversibles y pueden afectar permanentemente a tu cuenta.
                  </p>
                  <Button variant="destructive">Eliminar Mi Cuenta</Button>
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="payment" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pago</CardTitle>
                  <CardDescription>Gestiona tus métodos de pago y opciones de cobro.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-base">Tarjetas Guardadas</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">Expira: 12/25</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Eliminar
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Añadir Nuevo Método de Pago
                    </Button>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-base">Información de Facturación</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billing-name">Nombre</Label>
                          <Input id="billing-name" placeholder="Nombre Completo" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-address">Dirección</Label>
                          <Input id="billing-address" placeholder="Dirección" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-city">Ciudad</Label>
                          <Input id="billing-city" placeholder="Ciudad" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-zip">Código Postal</Label>
                          <Input id="billing-zip" placeholder="Código Postal" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-country">País</Label>
                          <Input id="billing-country" placeholder="País" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isUpdating}>
                    {isUpdating ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

