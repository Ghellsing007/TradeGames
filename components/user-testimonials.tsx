import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "TradeGames me ha permitido vender mis skins de CS:GO de forma segura y rápida. El sistema de escrow me da mucha tranquilidad.",
  },
  {
    id: "2",
    name: "Laura Martínez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Compré una cuenta de League of Legends y todo el proceso fue muy transparente. El vendedor fue muy profesional y el soporte estuvo atento a mis dudas.",
  },
  {
    id: "3",
    name: "Miguel Ángel",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "He vendido varias cuentas y objetos en esta plataforma. El sistema de pagos es rápido y la comisión es justa comparada con otras plataformas.",
  },
]

export function UserTestimonials() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros usuarios</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

