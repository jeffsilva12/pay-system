import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export function proxy(req) {

  const { pathname } = req.nextUrl

  // liberar login
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {

    jwt.verify(token, process.env.JWT_SECRET)

    return NextResponse.next()

  } catch (err) {

    return NextResponse.redirect(new URL("/login", req.url))

  }

}

export const config = {
  matcher: [

  ]
}