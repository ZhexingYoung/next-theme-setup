import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session_token")?.value

    if (!sessionToken) {
      return NextResponse.json({ valid: false, error: "No session token" }, { status: 401 })
    }

    const result = await AuthService.verifySession(sessionToken)

    if (!result.valid) {
      return NextResponse.json({ valid: false, error: "Invalid session" }, { status: 401 })
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: result.user!.id,
        firstName: result.user!.first_name,
        lastName: result.user!.last_name,
        email: result.user!.email,
        lastLogin: result.user!.last_login,
      },
    })
  } catch (error) {
    console.error("Session verification error:", error)
    return NextResponse.json({ valid: false, error: "Internal server error" }, { status: 500 })
  }
}
