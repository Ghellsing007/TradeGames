import { NextResponse } from "next/server"

// En una implementación real, estos datos vendrían de una base de datos
const escrowTransactions = [
  {
    id: "escrow1",
    transactionId: "TRX-1234",
    buyerId: "user1",
    sellerId: "seller1",
    productId: "prod1",
    amount: 89.99,
    status: "active", // active, released, disputed, refunded
    createdAt: new Date().toISOString(),
    releaseDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas después
  },
  {
    id: "escrow2",
    transactionId: "TRX-2345",
    buyerId: "user2",
    sellerId: "seller2",
    productId: "prod2",
    amount: 24.99,
    status: "released",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 48 horas atrás
    releaseDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 horas atrás
  },
  {
    id: "escrow3",
    transactionId: "TRX-3456",
    buyerId: "user3",
    sellerId: "seller3",
    productId: "prod3",
    amount: 49.99,
    status: "disputed",
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 72 horas atrás
    releaseDate: null,
    disputeReason: "El producto no coincide con la descripción",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const transaction = escrowTransactions.find((t) => t.id === id)

    if (!transaction) {
      return NextResponse.json({ error: "Transacción de escrow no encontrada" }, { status: 404 })
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Error al obtener transacción de escrow:", error)
    return NextResponse.json({ error: "Error al obtener transacción de escrow" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Buscar la transacción
    const transactionIndex = escrowTransactions.findIndex((t) => t.id === id)

    if (transactionIndex === -1) {
      return NextResponse.json({ error: "Transacción de escrow no encontrada" }, { status: 404 })
    }

    // Validar la acción
    if (!body.action) {
      return NextResponse.json({ error: "Se requiere una acción" }, { status: 400 })
    }

    const transaction = escrowTransactions[transactionIndex]
    let updatedTransaction = { ...transaction }

    // Procesar la acción
    switch (body.action) {
      case "release":
        if (transaction.status !== "active") {
          return NextResponse.json({ error: "Solo se pueden liberar fondos de transacciones activas" }, { status: 400 })
        }
        updatedTransaction = {
          ...transaction,
          status: "released",
          releaseDate: new Date().toISOString(),
        }
        break

      case "dispute":
        if (transaction.status !== "active") {
          return NextResponse.json({ error: "Solo se pueden disputar transacciones activas" }, { status: 400 })
        }
        if (!body.reason) {
          return NextResponse.json({ error: "Se requiere un motivo para la disputa" }, { status: 400 })
        }
        updatedTransaction = {
          ...transaction,
          status: "disputed",
          disputeReason: body.reason,
        }
        break

      case "refund":
        if (transaction.status !== "disputed") {
          return NextResponse.json({ error: "Solo se pueden reembolsar transacciones en disputa" }, { status: 400 })
        }
        updatedTransaction = {
          ...transaction,
          status: "refunded",
          refundDate: new Date().toISOString(),
        }
        break

      default:
        return NextResponse.json({ error: "Acción no válida" }, { status: 400 })
    }

    // En una implementación real, aquí actualizaríamos la transacción en la base de datos
    escrowTransactions[transactionIndex] = updatedTransaction

    return NextResponse.json(updatedTransaction)
  } catch (error) {
    console.error("Error al actualizar transacción de escrow:", error)
    return NextResponse.json({ error: "Error al actualizar transacción de escrow" }, { status: 500 })
  }
}

