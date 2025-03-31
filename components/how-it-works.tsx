import { Shield, DollarSign, CheckCircle, MessageCircle } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-16 bg-muted/50 rounded-lg my-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Cómo Funciona TradeGames</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Registro Seguro</h3>
            <p className="text-muted-foreground">
              Crea tu cuenta y verifica tu identidad para mayor seguridad en todas tus transacciones.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Sistema de Escrow</h3>
            <p className="text-muted-foreground">
              Tu dinero se mantiene seguro hasta que confirmes que has recibido el producto correctamente.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Chat Integrado</h3>
            <p className="text-muted-foreground">
              Comunícate con vendedores y compradores directamente en nuestra plataforma sin compartir datos sensibles.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">4. Calificaciones</h3>
            <p className="text-muted-foreground">
              Después de cada transacción, califica a tu contraparte para construir una comunidad confiable.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

