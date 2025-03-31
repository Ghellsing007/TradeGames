import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

// Datos de ejemplo para productos destacados
const featuredProducts = [
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
]

export function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Productos Destacados</h2>
        <Button variant="outline" asChild>
          <Link href="/marketplace">Ver Todos</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

