"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, MessageCircle, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Simular obtener datos de la transacción por ID
function getTransactionById(id: string) {
  return {
    id: `TRX-${Math.floor(Math.random() * 10000)}`,
    productId: id,
    productTitle: "Cuenta League of Legends - Diamante",
    game: "League of Legends",
    price: 89.99,
    serviceFee: 4.5,
    total: 94.49,
    seller: {
      id: "seller123",
      name: "GameMaster",
    },
    date: new Date().toISOString(),
    status: "completed",
    escrowStatus: "active", // active, released, disputed
    escrowReleaseDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas después
  }
}

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [transaction, setTransaction] = useState<any>(null)

  useEffect(() => {
    // Simular carga de datos
    const loadTransaction = async () => {
      const data = getTransactionById(params.id)
      setTransaction(data)
    }

    loadTransaction()
  }, [params.id])

  // Copiar ID de transacción al portapapeles
  const copyTransactionId = () => {
    if (transaction) {
      navigator.clipboard.writeText(transaction.id)
      toast({
        title: "ID copiado",
        description: "El ID de la transacción ha sido copiado al portapapeles.",
      })
    }
  }

  if (!transaction) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>Cargando detalles de la transacción...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <h1 className="text-3xl font-bold">¡Compra Completada!</h1>
          <p className="text-muted-foreground mt-2">Tu pago ha sido procesado correctamente.</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detalles de la Transacción</CardTitle>
            <CardDescription>Información sobre tu compra reciente.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">ID de Transacción</span>
                <div className="flex items-center">
                  <span className="font-mono">{transaction.id}</span>
                  <Button variant="ghost" size="icon" onClick={copyTransactionId}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha</span>
                <span>{new Date(transaction.date).toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Completado
                </Badge>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Producto</span>
                <span className="font-medium">{transaction.productTitle}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Juego</span>
                <span>{transaction.game}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Vendedor</span>
                <Link href={`/profile/${transaction.seller.id}`} className="text-primary hover:underline">
                  {transaction.seller.name}
                </Link>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${transaction.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Comisión de servicio</span>
                <span>${transaction.serviceFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${transaction.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Sistema de Escrow Activo</AlertTitle>
          <AlertDescription>
            Tu pago está protegido por nuestro sistema de escrow. El dinero se liberará al vendedor cuando confirmes que
            has recibido el producto correctamente o automáticamente después de 24 horas si no hay disputas.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Próximos Pasos</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 list-decimal list-inside">
              <li>
                <span className="font-medium">Contacta al vendedor</span>
                <p className="text-muted-foreground ml-6 mt-1">
                  Utiliza nuestro sistema de chat para coordinar la entrega del producto.
                </p>
              </li>
              <li>
                <span className="font-medium">Recibe el producto</span>
                <p className="text-muted-foreground ml-6 mt-1">
                  El vendedor te proporcionará los detalles necesarios para acceder al producto.
                </p>
              </li>
              <li>
                <span className="font-medium">Confirma la recepción</span>
                <p className="text-muted-foreground ml-6 mt-1">
                  Una vez recibido el producto correctamente, confirma la recepción para liberar el pago al vendedor.
                </p>
              </li>
              <li>
                <span className="font-medium">Deja una reseña</span>
                <p className="text-muted-foreground ml-6 mt-1">
                  Comparte tu experiencia con la comunidad dejando una reseña al vendedor.
                </p>
              </li>
            </ol>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/purchases">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Mis Compras
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/chat?seller=${transaction.seller.id}`}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Contactar al Vendedor
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

