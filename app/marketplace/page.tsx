import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Datos de ejemplo para productos
const products = [
  {
    id: "1",
    title: "Cuenta League of Legends - Diamante",
    game: "League of Legends",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "GameMaster",
      rating: 4.9,
      verified: true,
    },
  },
  {
    id: "2",
    title: "Skin Legendaria Fortnite",
    game: "Fortnite",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "ProSeller",
      rating: 4.7,
      verified: true,
    },
  },
  {
    id: "3",
    title: "10,000 Monedas - Valorant",
    game: "Valorant",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "ValueStore",
      rating: 4.8,
      verified: true,
    },
  },
  {
    id: "4",
    title: "Cuenta CS:GO - Global Elite",
    game: "CS:GO",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "EliteAccounts",
      rating: 4.6,
      verified: true,
    },
  },
  {
    id: "5",
    title: "Skin Rara - Minecraft",
    game: "Minecraft",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "BlockMaster",
      rating: 4.5,
      verified: false,
    },
  },
  {
    id: "6",
    title: "Cuenta Roblox Premium",
    game: "Roblox",
    price: 35.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "RobloxKing",
      rating: 4.3,
      verified: true,
    },
  },
  {
    id: "7",
    title: "Boost a Platino - League of Legends",
    game: "League of Legends",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "BoostPro",
      rating: 4.9,
      verified: true,
    },
  },
  {
    id: "8",
    title: "Cuenta Valorant con Skins Raras",
    game: "Valorant",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      name: "ValorantMaster",
      rating: 4.7,
      verified: true,
    },
  },
]

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>

      {/* Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Buscar productos..." className="pl-10" />
        </div>

        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Juego" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los juegos</SelectItem>
              <SelectItem value="lol">League of Legends</SelectItem>
              <SelectItem value="fortnite">Fortnite</SelectItem>
              <SelectItem value="csgo">CS:GO</SelectItem>
              <SelectItem value="valorant">Valorant</SelectItem>
              <SelectItem value="minecraft">Minecraft</SelectItem>
              <SelectItem value="roblox">Roblox</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de producto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="account">Cuentas</SelectItem>
              <SelectItem value="skin">Skins</SelectItem>
              <SelectItem value="currency">Monedas</SelectItem>
              <SelectItem value="boost">Boosts</SelectItem>
              <SelectItem value="item">Ítems</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Ajusta los filtros para encontrar exactamente lo que buscas.</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Rango de Precio</h3>
                  <div className="pt-4">
                    <Slider defaultValue={[0, 100]} max={500} step={1} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">$0</span>
                    <span className="text-sm">$500+</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Calificación del Vendedor</h3>
                  <div className="space-y-1">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`}>{rating}+ estrellas</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Estado del Vendedor</h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <Label htmlFor="verified">Solo vendedores verificados</Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Aplicar Filtros</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-12 flex justify-center">
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Anterior
          </Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Siguiente</Button>
        </div>
      </div>
    </div>
  )
}

