import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

// En una implementación real, aquí se conectaría con una base de datos
// para verificar las credenciales y obtener los datos del usuario
const users = [
  {
    id: "1",
    name: "GameMaster",
    email: "gamemaster@example.com",
    password: "password123", // En una implementación real, esto estaría hasheado
    image: "/placeholder.svg?height=100&width=100",
    role: "user",
  },
  {
    id: "2",
    name: "Admin",
    email: "admin@tradegames.com",
    password: "admin123", // En una implementación real, esto estaría hasheado
    image: "/placeholder.svg?height=100&width=100",
    role: "admin",
  },
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Buscar el usuario por email
        const user = users.find((user) => user.email === credentials.email)

        // Verificar si el usuario existe y la contraseña es correcta
        if (user && user.password === credentials.password) {
          // En una implementación real, aquí se verificaría el hash de la contraseña
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }
        }

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Añadir datos adicionales al token
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Añadir datos adicionales a la sesión
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

