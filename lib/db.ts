// 数据库连接配置
export interface User {
  id: number
  first_name: string
  last_name: string
  phone_number?: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
  is_active: boolean
  last_login?: string
  email_verified: boolean
}

export interface UserProfile {
  id: number
  user_id: number
  company_name?: string
  industry?: string
  company_size?: string
  business_stage?: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface UserSession {
  id: number
  user_id: number
  session_token: string
  expires_at: string
  created_at: string
}

// 模拟数据库操作（实际项目中应该使用真实数据库）
class MockDatabase {
  private users: User[] = []
  private profiles: UserProfile[] = []
  private sessions: UserSession[] = []
  private nextUserId = 1
  private nextProfileId = 1
  private nextSessionId = 1

  constructor() {
    // 从 localStorage 加载数据
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("users")
      const storedProfiles = localStorage.getItem("user_profiles")
      const storedSessions = localStorage.getItem("user_sessions")

      if (storedUsers) this.users = JSON.parse(storedUsers)
      if (storedProfiles) this.profiles = JSON.parse(storedProfiles)
      if (storedSessions) this.sessions = JSON.parse(storedSessions)

      this.nextUserId = Math.max(...this.users.map((u) => u.id), 0) + 1
      this.nextProfileId = Math.max(...this.profiles.map((p) => p.id), 0) + 1
      this.nextSessionId = Math.max(...this.sessions.map((s) => s.id), 0) + 1
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(this.users))
      localStorage.setItem("user_profiles", JSON.stringify(this.profiles))
      localStorage.setItem("user_sessions", JSON.stringify(this.sessions))
    }
  }

  async createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
    const now = new Date().toISOString()
    const user: User = {
      id: this.nextUserId++,
      ...userData,
      created_at: now,
      updated_at: now,
    }

    this.users.push(user)
    this.saveToStorage()
    console.log("User created:", { id: user.id, email: user.email, name: `${user.first_name} ${user.last_name}` })
    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
    if (user) {
      console.log("User found by email:", { id: user.id, email: user.email })
    }
    return user
  }

  async findUserById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users]
  }

  async createUserProfile(profileData: Omit<UserProfile, "id" | "created_at" | "updated_at">): Promise<UserProfile> {
    const now = new Date().toISOString()
    const profile: UserProfile = {
      id: this.nextProfileId++,
      ...profileData,
      created_at: now,
      updated_at: now,
    }

    this.profiles.push(profile)
    this.saveToStorage()
    return profile
  }

  async createSession(sessionData: Omit<UserSession, "id" | "created_at">): Promise<UserSession> {
    const session: UserSession = {
      id: this.nextSessionId++,
      ...sessionData,
      created_at: new Date().toISOString(),
    }

    this.sessions.push(session)
    this.saveToStorage()
    console.log("Session created for user:", sessionData.user_id)
    return session
  }

  async findSessionByToken(token: string): Promise<UserSession | null> {
    return this.sessions.find((session) => session.session_token === token) || null
  }

  async deleteSession(token: string): Promise<void> {
    const sessionIndex = this.sessions.findIndex((session) => session.session_token === token)
    if (sessionIndex > -1) {
      this.sessions.splice(sessionIndex, 1)
      this.saveToStorage()
      console.log("Session deleted")
    }
  }

  async updateUserLastLogin(userId: number): Promise<void> {
    const user = this.users.find((u) => u.id === userId)
    if (user) {
      user.last_login = new Date().toISOString()
      user.updated_at = new Date().toISOString()
      this.saveToStorage()
      console.log("User last login updated:", userId)
    }
  }

  // 清理过期会话
  async cleanupExpiredSessions(): Promise<void> {
    const now = new Date()
    const initialCount = this.sessions.length
    this.sessions = this.sessions.filter((session) => new Date(session.expires_at) > now)

    if (this.sessions.length < initialCount) {
      this.saveToStorage()
      console.log(`Cleaned up ${initialCount - this.sessions.length} expired sessions`)
    }
  }
}

export const db = new MockDatabase()
