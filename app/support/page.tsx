import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Search, HelpCircle, FileText, ShieldCheck, AlertTriangle } from "lucide-react"

// Datos de ejemplo para las preguntas frecuentes
const faqs = [
  {
    question: "¿Cómo funciona el sistema de escrow?",
    answer:
      "El sistema de escrow actúa como un intermediario seguro entre compradores y vendedores. Cuando realizas una compra, el dinero se retiene en una cuenta de garantía hasta que confirmes que has recibido el producto correctamente. Solo entonces, el pago se libera al vendedor. Si hay algún problema, puedes abrir una disputa y nuestro equipo de soporte intervendrá para resolverla.",
  },
  {
    question: "¿Cómo puedo verificar mi cuenta?",
    answer:
      "Para verificar tu cuenta, dirígete a la sección de Configuración > Seguridad y sigue los pasos para la verificación. Necesitarás proporcionar un documento de identidad válido y, en algunos casos, realizar una verificación por video. El proceso suele completarse en 24-48 horas.",
  },
  {
    question: "¿Qué hago si tengo un problema con una compra?",
    answer:
      "Si tienes algún problema con una compra, primero intenta contactar al vendedor a través de nuestro sistema de chat integrado. Si no pueden resolver el problema, puedes abrir una disputa desde la página de detalles de la compra. Nuestro equipo de soporte revisará el caso y tomará una decisión basada en la evidencia proporcionada por ambas partes.",
  },
  {
    question: "¿Cuáles son las comisiones por vender en TradeGames?",
    answer:
      "TradeGames cobra una comisión del 5% sobre el valor total de cada venta exitosa. Esta comisión cubre el uso de la plataforma, el sistema de escrow y el soporte al cliente. No hay cargos adicionales por listar productos o por mantener una cuenta en la plataforma.",
  },
  {
    question: "¿Cómo puedo retirar mi dinero?",
    answer:
      "Para retirar tu dinero, ve a la sección de Dashboard > Pagos y selecciona 'Retirar Fondos'. Puedes elegir entre varias opciones de retiro, como transferencia bancaria, PayPal o criptomonedas. Los retiros suelen procesarse en 1-3 días hábiles, dependiendo del método seleccionado.",
  },
  {
    question: "¿Es seguro comprar y vender en TradeGames?",
    answer:
      "Sí, TradeGames implementa múltiples medidas de seguridad para proteger a todos los usuarios. Estas incluyen el sistema de escrow, verificación de identidad, chat integrado seguro y un equipo de soporte dedicado. Además, todos los pagos y datos personales están encriptados para garantizar la máxima seguridad.",
  },
]

// Datos de ejemplo para los artículos de ayuda
const helpArticles = [
  {
    id: "1",
    title: "Guía para Nuevos Usuarios",
    description: "Todo lo que necesitas saber para empezar a usar TradeGames.",
    category: "Primeros Pasos",
    icon: HelpCircle,
  },
  {
    id: "2",
    title: "Cómo Vender tu Primer Producto",
    description: "Aprende a crear un listado atractivo y seguro para tus productos.",
    category: "Vendedores",
    icon: FileText,
  },
  {
    id: "3",
    title: "Sistema de Escrow Explicado",
    description: "Comprende cómo funciona nuestro sistema de garantía para transacciones seguras.",
    category: "Seguridad",
    icon: ShieldCheck,
  },
  {
    id: "4",
    title: "Resolución de Disputas",
    description: "Qué hacer cuando hay un problema con una transacción.",
    category: "Soporte",
    icon: AlertTriangle,
  },
  {
    id: "5",
    title: "Verificación de Cuenta",
    description: "Pasos para verificar tu cuenta y aumentar tu límite de transacciones.",
    category: "Seguridad",
    icon: ShieldCheck,
  },
  {
    id: "6",
    title: "Métodos de Pago Aceptados",
    description: "Lista completa de los métodos de pago disponibles en TradeGames.",
    category: "Pagos",
    icon: FileText,
  },
]

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Centro de Ayuda</h1>
          <p className="text-muted-foreground">
            Encuentra respuestas a tus preguntas o contacta con nuestro equipo de soporte.
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input placeholder="Buscar en el centro de ayuda..." className="pl-10 h-12 text-lg" />
        </div>

        <Tabs defaultValue="faq">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
            <TabsTrigger value="articles">Artículos de Ayuda</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preguntas Frecuentes</CardTitle>
                <CardDescription>Respuestas a las preguntas más comunes sobre TradeGames.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  ¿No encuentras lo que buscas?{" "}
                  <Link href="#contact" className="text-primary hover:underline">
                    Contáctanos
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="articles" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Artículos de Ayuda</CardTitle>
                <CardDescription>Guías detalladas y tutoriales para usar TradeGames.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {helpArticles.map((article) => (
                    <Link key={article.id} href={`/support/articles/${article.id}`}>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <article.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{article.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                            <Badge variant="outline">{article.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link href="/support/articles">Ver Todos los Artículos</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6" id="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contactar Soporte</CardTitle>
                <CardDescription>Envíanos un mensaje y te responderemos lo antes posible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nombre
                      </label>
                      <Input id="name" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="tu@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Asunto
                    </label>
                    <Input id="subject" placeholder="Asunto de tu consulta" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Describe tu problema o pregunta con detalle..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="attachment" className="text-sm font-medium">
                      Adjuntar Archivo (opcional)
                    </label>
                    <Input id="attachment" type="file" />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>Tiempo de respuesta: 24-48 horas</span>
                </div>
                <Button>Enviar Mensaje</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold mb-4">¿Necesitas ayuda urgente?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat en Vivo
            </Button>
            <Button variant="outline" className="flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              +1 234 567 8900
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Disponible de lunes a viernes, 9:00 AM - 6:00 PM (GMT-5)</p>
        </div>
      </div>
    </div>
  )
}

