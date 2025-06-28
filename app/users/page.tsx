"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar, Activity, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import UserIcon from "lucide-react" // Renamed User to UserIcon to avoid redeclaration

interface User {
  id: number
  first_name: string
  last_name: string
  phone_number?: string
  email: string
  created_at: string
  updated_at: string
  is_active: boolean
  last_login?: string
  email_verified: boolean
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, recentRegistrations: 0 })
  const router = useRouter()

  useEffect(() => {
    // 从本地存储加载用户数据
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers)
        setUsers(parsedUsers)

        // 计算统计信息
        const totalUsers = parsedUsers.length
        const activeUsers = parsedUsers.filter((user: User) => user.is_active).length
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const recentRegistrations = parsedUsers.filter((user: User) => new Date(user.created_at) > sevenDaysAgo).length

        setStats({ totalUsers, activeUsers, recentRegistrations })
      } catch (error) {
        console.error("Error parsing users data:", error)
        setUsers([])
      }
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const toggleUserStatus = (userId: number) => {
    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, is_active: !user.is_active } : user))
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // 更新统计信息
    const activeUsers = updatedUsers.filter((user) => user.is_active).length
    setStats((prev) => ({ ...prev, activeUsers }))
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Button variant="outline" onClick={() => router.push("/")} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-600 mt-2">Manage registered users and view statistics</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UserIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">All registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Currently active accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Registrations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentRegistrations}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <div className="grid gap-6">
          {users.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <UserIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No users registered yet</h3>
                <p className="text-slate-600">Registered users will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            users.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      <UserIcon className="w-5 h-5 text-slate-600" />
                      <span>
                        {user.first_name} {user.last_name}
                      </span>
                      <Badge variant={user.is_active ? "default" : "secondary"}>
                        {user.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                        {user.email_verified && (
                          <Badge variant="outline" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      {user.phone_number && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone_number}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                      className={
                        user.is_active ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"
                      }
                    >
                      {user.is_active ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-900">User ID:</span>
                      <span className="ml-2 text-slate-600">#{user.id}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-900">Registered:</span>
                      <span className="ml-2 text-slate-600">{formatDate(user.created_at)}</span>
                    </div>
                    {user.last_login && (
                      <div>
                        <span className="font-medium text-slate-900">Last Login:</span>
                        <span className="ml-2 text-slate-600">{formatDate(user.last_login)}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-slate-900">Updated:</span>
                      <span className="ml-2 text-slate-600">{formatDate(user.updated_at)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
