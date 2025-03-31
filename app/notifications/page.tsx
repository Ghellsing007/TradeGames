"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  ShoppingCart,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Datos de ejemplo para las notificaciones
const notifications = [
  {
    id: "1",
    type: "purchase",
    title: "Compra completada",
    message: "Tu compra de 'Cuenta League of Legends - Diamante' ha sido completada exitosamente.",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
    link: "/dashboard/purchases/1",
    icon: ShoppingCart,
  },
  {
    id: "2",
    type: "message",
    title: "Nuevo mensaje",
    message: "GameMaster te ha enviado un mensaje sobre tu compra reciente.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: false,
    link: "/chat",\
    icon: MessageCircle  - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: false,
    link: "/chat",
    icon: MessageCircle,
  },
  {
    id: "3",
    type: "alert",
    title: "Disputa abierta",
    message: "Se ha abierto una disputa sobre tu venta de '10,000 Monedas - Valorant'.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    read: true,
    link: "/dashboard/disputes/1",
    icon: AlertTriangle,
  },
  {
    id: "4",
    type: "system",
    title: "Verificación completada",
    message: "Tu cuenta ha sido verificada exitosamente. Ahora puedes acceder a todas las funciones de TradeGames.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
    read: true,
    link: "/dashboard/settings",
    icon: CheckCircle,
  },
  {
    id: "5",
    type: "escrow",
    title: "Fondos liberados",
    message: "Los fondos de tu venta 'Skin Legendaria Fortnite' han sido liberados a tu cuenta.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 días atrás
    read: true,
    link: "/dashboard/sales/2",
    icon: Clock,
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsList, setNotificationsList] = useState(notifications)

  // Marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    setNotificationsList(
      notificationsList.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // Marcar una notificación como leída
  const markAsRead = (id: string) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  // Eliminar una notificación
  const deleteNotification = (id: string) => {
    setNotificationsList(notificationsList.filter((notification) => notification.id !== id))
  }

  // Filtrar notificaciones según la pestaña activa
  const filteredNotifications = notificationsList.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Formatear la fecha de la notificación
  const formatNotificationDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMs / 3600000)
    const diffDays = Math.round(diffMs / 86400000)

    if (diffMins < 60) {
      return `Hace ${diffMins} minutos`
    } else if (diffHours < 24) {
      return `Hace ${diffHours} horas`
    } else {
      return `Hace ${diffDays} días`
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Notificaciones</h1>
          <Button variant="outline" onClick={markAllAsRead}>
            Marcar todas como leídas
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">
                Todas
                {notificationsList.some((n) => !n.read) && (
                  <Badge className="ml-2">{notificationsList.filter((n) => !n.read).length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">No leídas</TabsTrigger>
              <TabsTrigger value="purchase">Compras</TabsTrigger>
              <TabsTrigger value="message">Mensajes</TabsTrigger>
              <TabsTrigger value="alert">Alertas</TabsTrigger>
            </TabsList>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "all" && "Todas las Notificaciones"}
                  {activeTab === "unread" && "Notificaciones No Leídas"}
                  {activeTab === "purchase" && "Notificaciones de Compras"}
                  {activeTab === "message" && "Mensajes"}
                  {activeTab === "alert" && "Alertas"}
                </CardTitle>
                <CardDescription>
                  {filteredNotifications.length === 0
                    ? "No hay notificaciones para mostrar."
                    : `Mostrando ${filteredNotifications.length} notificaciones.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg transition-colors ${
                        notification.read ? "bg-background" : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`rounded-full p-2 mr-4 ${
                            notification.type === "purchase"
                              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                              : notification.type === "message"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                : notification.type === "alert"
                                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                                  : "bg-primary/10 text-primary"
                          }`}
                        >
                          <notification.icon className="h-5 w-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatNotificationDate(notification.date)}
                              </p>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.read && (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    Marcar como leída
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem asChild>
                                  <Link href={notification.link}>Ver detalles</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-destructive"
                                >
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {notification.link && (
                            <div className="mt-2">
                              <Button variant="link" asChild className="p-0 h-auto">
                                <Link href={notification.link}>Ver detalles</Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                      <h3 className="text-lg font-medium">No hay notificaciones</h3>
                      <p className="text-muted-foreground">
                        {activeTab === "all"
                          ? "No tienes notificaciones en este momento."
                          : "No tienes notificaciones en esta categoría."}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              {filteredNotifications.length > 0 && (
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Cargar Más</Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

