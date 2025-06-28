import { db, type User } from "./db"

export interface RegisterData {
  firstName: string
  lastName: string
  phoneNumber?: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    // 在客户端环境中，我们使用简单的编码（实际项目中应该在服务器端处理）
    // 使用更复杂的哈希算法模拟
    const encoder = new TextEncoder()
    const data = encoder.encode(password + "salt_key_2025")
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    // 验证密码
    const hashedInput = await this.hashPassword(password)
    return hashedInput === hash
  }

  static generateSessionToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  static async register(data: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // 检查邮箱是否已存在
      const existingUser = await db.findUserByEmail(data.email)
      if (existingUser) {
        return { success: false, error: "Email already exists" }
      }

      // 创建用户
      const passwordHash = await this.hashPassword(data.password)
      const user = await db.createUser({
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        email: data.email.toLowerCase(), // 统一转换为小写
        password_hash: passwordHash,
        is_active: true,
        email_verified: false,
      })

      // 创建用户档案
      await db.createUserProfile({
        user_id: user.id,
      })

      return { success: true, user }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Registration failed" }
    }
  }

  static async login(data: LoginData): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      // 查找用户（邮箱不区分大小写）
      const user = await db.findUserByEmail(data.email.toLowerCase())
      if (!user) {
        return { success: false, error: "Invalid email or password" }
      }

      // 检查用户是否激活
      if (!user.is_active) {
        return { success: false, error: "Account is deactivated" }
      }

      // 验证密码
      const isValidPassword = await this.verifyPassword(data.password, user.password_hash)
      if (!isValidPassword) {
        return { success: false, error: "Invalid email or password" }
      }

      // 创建会话
      const sessionToken = this.generateSessionToken()
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7天后过期

      await db.createSession({
        user_id: user.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
      })

      // 更新最后登录时间
      await db.updateUserLastLogin(user.id)

      return { success: true, user, token: sessionToken }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Login failed" }
    }
  }

  static async verifySession(token: string): Promise<{ valid: boolean; user?: User }> {
    try {
      const session = await db.findSessionByToken(token)
      if (!session) {
        return { valid: false }
      }

      // 检查会话是否过期
      if (new Date(session.expires_at) < new Date()) {
        await db.deleteSession(token)
        return { valid: false }
      }

      const user = await db.findUserById(session.user_id)
      if (!user || !user.is_active) {
        return { valid: false }
      }

      return { valid: true, user }
    } catch (error) {
      console.error("Session verification error:", error)
      return { valid: false }
    }
  }

  static async logout(token: string): Promise<void> {
    await db.deleteSession(token)
  }

  // 获取用户统计信息
  static async getUserStats(): Promise<{ totalUsers: number; activeUsers: number; recentRegistrations: number }> {
    try {
      const allUsers = await db.getAllUsers()
      const totalUsers = allUsers.length
      const activeUsers = allUsers.filter((user) => user.is_active).length

      // 最近7天注册的用户
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const recentRegistrations = allUsers.filter((user) => new Date(user.created_at) > sevenDaysAgo).length

      return { totalUsers, activeUsers, recentRegistrations }
    } catch (error) {
      console.error("Get user stats error:", error)
      return { totalUsers: 0, activeUsers: 0, recentRegistrations: 0 }
    }
  }
}
