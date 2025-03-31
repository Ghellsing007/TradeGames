import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface GameCardProps {
  name: string
  image: string
  itemCount: number
}

export function GameCard({ name, image, itemCount }: GameCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, "-")

  return (
    <Link href={`/games/${slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{itemCount} artículos</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

