import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Product {
  id: string
  title: string
  game: string
  price: number
  image: string
  seller: {
    name: string
    rating: number
    verified: boolean
  }
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <div className="relative aspect-square">
          <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
          <Badge className="absolute top-2 left-2">{product.game}</Badge>
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-medium line-clamp-2">{product.title}</h3>
          <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm">{product.seller.name}</span>
            {product.seller.verified && (
              <Badge variant="outline" className="h-5 px-1 text-xs">
                Verificado
              </Badge>
            )}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm">{product.seller.rating}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

