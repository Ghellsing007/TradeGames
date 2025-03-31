import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Shield, Clock, MessageCircle, AlertCircle } from "lucide-react"

// Simulamos obtener datos del producto por ID
function getProductById(id: string) {
  return {
    id,
    title: "Cuenta League of Legends - Diamante",
    game: "League of Legends",
    price: 89.99,
    description:
      "Cuenta de League of Legends con rango Diamante, más de 100 campeones desbloqueados y múltiples skins raras. La cuenta tiene un historial limpio sin sanciones y está lista para ser transferida de forma segura.",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    details: {
      type: "Cuenta",
      level: 150,
      region: "NA",
      champions: 120,
      skins: 45,
      rank: "Diamante II",
    },
    deliveryTime: "Inmediata",
    seller: {
      id: "seller123",
      name: "GameMaster",
      rating: 4.9,
      verified: true,
      sales: 342,
      memberSince: "2021-05-15",
    },
    reviews: [
      {
        id: "rev1",
        user: "Carlos",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2023-10-15",
        comment:
          "Excelente vendedor, la transacción fue rápida y segura. La cuenta está exactamente como se describió.",
      },
      {
        id: "rev2",
        user: "Laura",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2023-09-22",
        comment: "Todo bien con la cuenta, el proceso fue un poco lento pero al final todo salió bien.",
      },
    ],
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Imágenes del Producto */}
        <div className="lg:col-span-2">
          <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - Imagen ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del Producto */}
        <div>
          <Badge className="mb-2">{product.game}</Badge>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < product.seller.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {product.seller.rating} ({product.seller.sales} ventas)
            </span>
          </div>

          <div className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              <span>Compra protegida con sistema de escrow</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              <span>Tiempo de entrega: {product.deliveryTime}</span>
            </div>
          </div>

          <Button className="w-full mb-3">Comprar Ahora</Button>
          <Button variant="outline" className="w-full mb-6">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contactar al Vendedor
          </Button>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={product.seller.name} />
                    <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{product.seller.name}</CardTitle>
                    {product.seller.verified && (
                      <Badge variant="outline" className="text-xs">
                        Verificado
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Ver Perfil
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Miembro desde: {new Date(product.seller.memberSince).toLocaleDateString()}</p>
              <p>Ventas completadas: {product.seller.sales}</p>
            </CardContent>
          </Card>

          <div className="mt-4 text-sm flex items-center text-muted-foreground">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Reportar este producto</span>
          </div>
        </div>
      </div>

      {/* Tabs de Información */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4">
            <p>{product.description}</p>
          </TabsContent>
          <TabsContent value="details" className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="font-medium">Tipo de Producto</p>
                <p className="text-muted-foreground">{product.details.type}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Nivel de Cuenta</p>
                <p className="text-muted-foreground">{product.details.level}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Región</p>
                <p className="text-muted-foreground">{product.details.region}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Campeones</p>
                <p className="text-muted-foreground">{product.details.champions}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Skins</p>
                <p className="text-muted-foreground">{product.details.skins}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Rango</p>
                <p className="text-muted-foreground">{product.details.rank}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4">
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={review.avatar} alt={review.user} />
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.user}</p>
                      <div className="flex items-center">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

