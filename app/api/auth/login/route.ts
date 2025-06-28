import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 验证输入
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("Login attempt for email:", email)

    // 登录用户
    const result = await AuthService.login({ email, password })

    if (!result.success) {
      console.log("Login failed:", result.error)
      return NextResponse.json({ error: result.error }, { status: 401 })
    }

    console.log("Login successful for user:", result.user!.id)

    // 设置会话cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: result.user!.id,
        firstName: result.user!.first_name,
        lastName: result.user!.last_name,
        email: result.user!.email,
        lastLogin: result.user!.last_login,
      },
    })

    // 设置HttpOnly cookie
    response.cookies.set("session_token", result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7天
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
