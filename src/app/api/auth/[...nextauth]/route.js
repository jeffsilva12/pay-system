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

        console.log("credenciais:", credentials)

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        console.log("usuario:", user)

        if (!user) {
          return null
        }

        const passwordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordValid) {
          return null
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email
        }

      }

    })

  ],

  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET

})

export { handler as GET, handler as POST }