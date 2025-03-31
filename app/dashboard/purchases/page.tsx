import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, CheckCircle, AlertTriangle, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Datos de ejemplo para compras
const purchases = [
  {
    id: "1",
    transactionId: "TRX-1234",
    title: "Cuenta League of Legends - Diamante",
    game: "League of Legends",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      id: "seller1",
      name: "GameMaster",
      rating: 4.9,
    },
    status: "completed",
    escrowStatus: "released",
    date: "2023-12-01",
    deliveryStatus: "delivered",
  },
  {
    id: "2",
    transactionId: "TRX-2345",
    title: "Skin Legendaria Fortnite",
    game: "Fortnite",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      id: "seller2",
      name: "ProSeller",
      rating: 4.7,
    },
    status: "completed",
    escrowStatus: "active",
    date: "2023-12-05",
    deliveryStatus: "pending",
  },
  {
    id: "3",
    transactionId: "TRX-3456",
    title: "10,000 Monedas - Valorant",
    game: "Valorant",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      id: "seller3",
      name: "ValueStore",
      rating: 4.8,
    },
    status: "disputed",
    escrowStatus: "disputed",
    date: "2023-12-10",
    deliveryStatus: "disputed",
  },
]

export default function PurchasesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <DashboardSidebar className="w-full md:w-64 shrink-0" />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Mis Compras</h1>

          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="active">En Proceso</TabsTrigger>
                <TabsTrigger value="completed">Completadas</TabsTrigger>
                <TabsTrigger value="disputed">En Disputa</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Todas las Compras</CardTitle>
                  <CardDescription>Historial completo de tus compras en TradeGames.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">Producto</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Precio</th>
                            <th className="h-12 px-4 text-left align-middle font-medium hidden md:table-cell">Fecha</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Estado</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {purchases.map((purchase) => (
                            <tr
                              key={purchase.id}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <div className="h-12 w-12 rounded-md overflow-hidden relative">
                                    <Image
                                      src={purchase.image || "/placeholder.svg"}
                                      alt={purchase.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{purchase.title}</p>
                                    <p className="text-xs text-muted-foreground">{purchase.game}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 align-middle font-medium">${purchase.price.toFixed(2)}</td>
                              <td className="p-4 align-middle hidden md:table-cell">
                                {new Date(purchase.date).toLocaleDateString()}
                              </td>
                              <td className="p-4 align-middle">
                                <Badge
                                  variant={
                                    purchase.status === "completed" && purchase.escrowStatus === "released"
                                      ? "default"
                                      : purchase.status === "completed" && purchase.escrowStatus === "active"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {purchase.status === "completed" && purchase.escrowStatus === "released"
                                    ? "Completada"
                                    : purchase.status === "completed" && purchase.escrowStatus === "active"
                                      ? "En Escrow"
                                      : "En Disputa"}
                                </Badge>
                              </td>
                              <td className="p-4 align-middle">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/chat?seller=${purchase.seller.id}`}>
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Contactar Vendedor
                                      </Link>
                                    </DropdownMenuItem>

                                    {purchase.escrowStatus === "active" && (
                                      <DropdownMenuItem>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Confirmar Recepción
                                      </DropdownMenuItem>
                                    )}

                                    {purchase.escrowStatus !== "disputed" && (
                                      <DropdownMenuItem>
                                        <AlertTriangle className="h-4 w-4 mr-2" />
                                        Abrir Disputa
                                      </DropdownMenuItem>
                                    )}

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                      <Link href={`/dashboard/purchases/${purchase.id}`}>Ver Detalles</Link>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Compras en Proceso</CardTitle>
                  <CardDescription>Compras que están actualmente en proceso de entrega o en escrow.</CardDescription>
                </CardHeader>
                <CardContent>{/* Contenido similar al anterior pero filtrado por estado "active" */}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Compras Completadas</CardTitle>
                  <CardDescription>Compras que han sido completadas satisfactoriamente.</CardDescription>
                </CardHeader>
                <CardContent>{/* Contenido similar al anterior pero filtrado por estado "completed" */}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="disputed" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Compras en Disputa</CardTitle>
                  <CardDescription>Compras que tienen una disputa abierta.</CardDescription>
                </CardHeader>
                <CardContent>{/* Contenido similar al anterior pero filtrado por estado "disputed" */}</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

