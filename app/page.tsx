import { Button } from "@/components/ui/button"
import { GameCard } from "@/components/game-card"
import { FeaturedProducts } from "@/components/featured-products"
import { HowItWorks } from "@/components/how-it-works"
import { UserTestimonials } from "@/components/user-testimonials"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Compra y vende artículos de videojuegos de forma segura</h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl text-muted-foreground">
          TradeGames es la plataforma más segura para comprar y vender cuentas, skins, monedas e ítems de tus
          videojuegos favoritos sin riesgo de estafas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/marketplace">Explorar Marketplace</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">Crear Cuenta</Link>
          </Button>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Juegos Populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <GameCard name="League of Legends" image="/placeholder.svg?height=200&width=200" itemCount={1243} />
          <GameCard name="Fortnite" image="/placeholder.svg?height=200&width=200" itemCount={876} />
          <GameCard name="CS:GO" image="/placeholder.svg?height=200&width=200" itemCount={1532} />
          <GameCard name="Valorant" image="/placeholder.svg?height=200&width=200" itemCount={654} />
          <GameCard name="Minecraft" image="/placeholder.svg?height=200&width=200" itemCount={432} />
          <GameCard name="Roblox" image="/placeholder.svg?height=200&width=200" itemCount={987} />
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <UserTestimonials />
    </div>
  )
}

