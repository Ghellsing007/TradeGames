"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CreditCard, Shield } from "lucide-react"
import Link from "next/link"

// Simular obtener datos del producto por ID
function getProductById(id: string) {
  return {
    id,
    title: "Cuenta League of Legends - Diamante",
    game: "League of Legends",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: {
      id: "seller123",
      name: "GameMaster",
      rating: 4.9,
      verified: true,
    },
  }
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = getProductById(params.id)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Calcular totales
  const subtotal = product.price
  const serviceFee = subtotal * 0.05 // 5% de comisión
  const total = subtotal + serviceFee

  // Procesar el pago
  const handlePayment = async () => {
    if (!agreeTerms) return

    setIsProcessing(true)

    try {
      // Aquí iría la lógica para procesar el pago
      // Simular una petición al servidor
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirigir a la página de confirmación
      router.push(`/checkout/confirmation/${product.id}`)
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href={`/product/${product.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Finalizar Compra</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resumen del Producto */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
            <CardDescription>Revisa los detalles de tu compra antes de continuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 rounded-md overflow-hidden">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.game}</p>
                <div className="flex items-center mt-1">
                  <p className="text-sm">Vendedor: {product.seller.name}</p>
                  {product.seller.verified && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Verificado
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <Alert className="mt-6">
              <Shield className="h-4 w-4" />
              <AlertTitle>Compra Protegida</AlertTitle>
              <AlertDescription>
                Tu dinero se mantendrá seguro en nuestro sistema de escrow hasta que confirmes que has recibido el
                producto correctamente.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Método de Pago */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Método de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 border rounded-md p-3 mb-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Tarjeta de Crédito/Débito
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 mb-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto">Criptomonedas</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Fecha de Expiración</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                    <Input id="cardName" placeholder="Nombre Completo" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumen de Costos */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Comisión de servicio</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm">
                  Acepto los{" "}
                  <Link href="/terms" className="underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacy" className="underline">
                    política de privacidad
                  </Link>
                  .
                </Label>
              </div>
              <Button className="w-full" disabled={!agreeTerms || isProcessing} onClick={handlePayment}>
                {isProcessing ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

