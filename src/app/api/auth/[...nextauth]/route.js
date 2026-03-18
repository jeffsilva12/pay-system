import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })        

        if (!user) return null

        const passwordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordValid) return null

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role // 🔥 aqui
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
    updateAge: 60 * 60
  },

  callbacks: {
    async jwt({ token, user }) {
      // primeira vez (login)
      if (user) {
        token.id = user.id
        token.role = user.role // 🔥 salva no token
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role // 🔥 disponível no front/API
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }