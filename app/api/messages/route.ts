import { NextResponse } from "next/server"

// En una implementación real, estos datos vendrían de una base de datos
const conversations = [
  {
    id: "1",
    participants: ["user1", "seller1"],
    productId: "prod1",
    lastMessage: "¿La cuenta tiene todas las skins de la temporada 5?",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutos atrás
    unreadCount: {
      user1: 0,
      seller1: 2,
    },
  },
  {
    id: "2",
    participants: ["user1", "seller2"],
    productId: "prod2",
    lastMessage: "Gracias por la compra, te enviaré los detalles en breve.",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
    unreadCount: {
      user1: 1,
      seller2: 0,
    },
  },
  {
    id: "3",
    participants: ["user1", "seller3"],
    productId: "prod3",
    lastMessage: "¿Podrías hacerme un descuento si compro 20,000?",
    lastMessageDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 día atrás
    unreadCount: {
      user1: 0,
      seller3: 0,
    },
  },
]

const messages = [
  {
    id: "msg1",
    conversationId: "1",
    senderId: "user1",
    content: "Hola, estoy interesado en tu cuenta de League of Legends.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
    read: true,
  },
  {
    id: "msg2",
    conversationId: "1",
    senderId: "seller1",
    content: "¡Hola! Gracias por tu interés. ¿Qué te gustaría saber sobre la cuenta?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutos atrás
    read: true,
  },
  {
    id: "msg3",
    conversationId: "1",
    senderId: "user1",
    content: "¿Cuántos campeones tiene desbloqueados?",
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 minutos atrás
    read: true,
  },
  {
    id: "msg4",
    conversationId: "1",
    senderId: "seller1",
    content: "La cuenta tiene 120 campeones desbloqueados, prácticamente todos los disponibles en el juego.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutos atrás
    read: true,
  },
  {
    id: "msg5",
    conversationId: "1",
    senderId: "user1",
    content: "¿Y cuántas skins tiene?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutos atrás
    read: true,
  },
  {
    id: "msg6",
    conversationId: "1",
    senderId: "seller1",
    content: "Tiene 45 skins, incluyendo algunas raras de eventos pasados y ediciones limitadas.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutos atrás
    read: true,
  },
  {
    id: "msg7",
    conversationId: "1",
    senderId: "user1",
    content: "¿La cuenta tiene todas las skins de la temporada 5?",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutos atrás
    read: false,
  },
]

export async function GET(request: Request) {
  try {
    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const conversationId = searchParams.get("conversationId")

    if (conversationId) {
      // Obtener mensajes de una conversación específica
      const conversationMessages = messages.filter((m) => m.conversationId === conversationId)

      return NextResponse.json({
        messages: conversationMessages,
        total: conversationMessages.length,
      })
    }

    if (userId) {
      // Obtener conversaciones de un usuario específico
      const userConversations = conversations.filter((c) => c.participants.includes(userId))

      return NextResponse.json({
        conversations: userConversations,
        total: userConversations.length,
      })
    }

    // Si no se proporciona ningún filtro, devolver todas las conversaciones
    return NextResponse.json({
      conversations,
      total: conversations.length,
    })
  } catch (error) {
    console.error("Error al obtener mensajes:", error)
    return NextResponse.json({ error: "Error al obtener mensajes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar datos requeridos
    if (!body.conversationId || !body.senderId || !body.content) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Verificar si la conversación existe
    const conversation = conversations.find((c) => c.id === body.conversationId)
    if (!conversation) {
      return NextResponse.json({ error: "Conversación no encontrada" }, { status: 404 })
    }

    // Verificar si el remitente es participante de la conversación
    if (!conversation.participants.includes(body.senderId)) {
      return NextResponse.json({ error: "El remitente no es participante de esta conversación" }, { status: 403 })
    }

    // En una implementación real, aquí crearíamos el mensaje en la base de datos
    const newMessage = {
      id: `msg${messages.length + 1}`,
      ...body,
      timestamp: new Date().toISOString(),
      read: false,
    }

    // Actualizar la conversación con el último mensaje
    const conversationIndex = conversations.findIndex((c) => c.id === body.conversationId)
    if (conversationIndex !== -1) {
      // Incrementar el contador de mensajes no leídos para todos los participantes excepto el remitente
      const updatedUnreadCount = { ...conversation.unreadCount }
      conversation.participants.forEach((participant) => {
        if (participant !== body.senderId) {
          updatedUnreadCount[participant] = (updatedUnreadCount[participant] || 0) + 1
        }
      })

      conversations[conversationIndex] = {
        ...conversation,
        lastMessage: body.content,
        lastMessageDate: newMessage.timestamp,
        unreadCount: updatedUnreadCount,
      }
    }

    // Simulamos agregar el mensaje a la lista
    messages.push(newMessage)

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error("Error al crear mensaje:", error)
    return NextResponse.json({ error: "Error al crear mensaje" }, { status: 500 })
  }
}

