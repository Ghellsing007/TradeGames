import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DollarSign, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <DashboardSidebar className="w-full md:w-64 shrink-0" />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ventas Totales</p>
                    <p className="text-2xl font-bold">$1,240</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12% este mes</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Productos Activos</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span>2 pendientes de aprobación</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Compras</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span>1 en proceso</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reputación</p>
                    <p className="text-2xl font-bold">4.8/5</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span>Basado en 24 reseñas</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs de Actividad */}
          <Tabs defaultValue="transactions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transacciones</TabsTrigger>
              <TabsTrigger value="products">Mis Productos</TabsTrigger>
              <TabsTrigger value="messages">Mensajes</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transacciones Recientes</CardTitle>
                  <CardDescription>Historial de tus compras y ventas recientes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Badge variant={item % 2 === 0 ? "default" : "secondary"}>
                              {item % 2 === 0 ? "Venta" : "Compra"}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium">Cuenta League of Legends</p>
                            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item * 25).toFixed(2)}</p>
                          <Badge variant="outline">Completada</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver Todas las Transacciones
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Productos</CardTitle>
                  <CardDescription>Gestiona tus productos publicados.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded bg-muted mr-4"></div>
                          <div>
                            <p className="font-medium">Skin Legendaria - {item}</p>
                            <p className="text-sm text-muted-foreground">
                              Publicado el {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item * 15).toFixed(2)}</p>
                          <Badge variant={item === 1 ? "outline" : "default"}>
                            {item === 1 ? "Borrador" : "Activo"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Gestionar Productos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mensajes Recientes</CardTitle>
                  <CardDescription>Conversaciones con compradores y vendedores.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>U{item}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Usuario {item}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              Hola, estoy interesado en tu producto...
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          <Badge
                            variant="default"
                            className="rounded-full h-5 w-5 p-0 flex items-center justify-center"
                          >
                            {item}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver Todos los Mensajes
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

