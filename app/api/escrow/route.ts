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

export async function GET(request: Request) {
  try {
    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")
    const role = searchParams.get("role") // buyer o seller

    // Filtrar transacciones
    let filteredTransactions = [...escrowTransactions]

    if (userId) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        role === "buyer"
          ? transaction.buyerId === userId
          : role === "seller"
            ? transaction.sellerId === userId
            : transaction.buyerId === userId || transaction.sellerId === userId,
      )
    }

    if (status) {
      filteredTransactions = filteredTransactions.filter((transaction) => transaction.status === status)
    }

    return NextResponse.json({
      transactions: filteredTransactions,
      total: filteredTransactions.length,
    })
  } catch (error) {
    console.error("Error al obtener transacciones de escrow:", error)
    return NextResponse.json({ error: "Error al obtener transacciones de escrow" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar datos requeridos
    if (!body.buyerId || !body.sellerId || !body.productId || !body.amount) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // En una implementación real, aquí crearíamos la transacción de escrow en la base de datos
    const newEscrow = {
      id: `escrow${escrowTransactions.length + 1}`,
      transactionId: `TRX-${Math.floor(Math.random() * 10000)}`,
      ...body,
      status: "active",
      createdAt: new Date().toISOString(),
      releaseDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas después
    }

    // Simulamos agregar la transacción a la lista
    escrowTransactions.push(newEscrow)

    return NextResponse.json(newEscrow, { status: 201 })
  } catch (error) {
    console.error("Error al crear transacción de escrow:", error)
    return NextResponse.json({ error: "Error al crear transacción de escrow" }, { status: 500 })
  }
}

