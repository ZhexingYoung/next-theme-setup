"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Search, Download, Trash2, ArrowLeft, Database, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserData {
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

interface CallRequest {
  name: string
  email: string
  phone: string
  message: string
  timestamp: string
}

export default function UserDataPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [callRequests, setCallRequests] = useState<CallRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"users" | "calls">("users")
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // 加载用户数据
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers))
      } catch (error) {
        console.error("Error parsing users data:", error)
        setUsers([])
      }
    }

    // 加载通话请求数据
    const storedCallRequests = localStorage.getItem("callRequests")
    if (storedCallRequests) {
      try {
        setCallRequests(JSON.parse(storedCallRequests))
      } catch (error) {
        console.error("Error parsing call requests data:", error)
        setCallRequests([])
      }
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCallRequests = callRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone.includes(searchTerm),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const exportData = () => {
    const data = {
      users,
      callRequests,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ascent-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.removeItem("users")
      localStorage.removeItem("callRequests")
      localStorage.removeItem("user_profiles")
      localStorage.removeItem("user_sessions")
      setUsers([])
      setCallRequests([])
      alert("All data has been cleared.")
    }
  }

  const deleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    }
  }

  const deleteCallRequest = (index: number) => {
    if (confirm("Are you sure you want to delete this call request?")) {
      const updatedRequests = callRequests.filter((_, i) => i !== index)
      setCallRequests(updatedRequests)
      localStorage.setItem("callRequests", JSON.stringify(updatedRequests))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Button variant="outline" onClick={() => router.push("/")} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">数据管理中心</h1>
            <p className="text-slate-600 mt-2">查看和管理所有注册用户和通话请求数据</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={exportData} variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download className="w-4 h-4" />
              <span>导出数据</span>
            </Button>
            <Button onClick={clearAllData} variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
              <Trash2 className="w-4 h-4 mr-2" />
              清空所有数据
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">注册用户</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">活跃用户: {users.filter((u) => u.is_active).length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">通话请求</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{callRequests.length}</div>
              <p className="text-xs text-muted-foreground">待处理请求</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">数据存储</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">本地存储</div>
              <p className="text-xs text-muted-foreground">localStorage</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-slate-200 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "users" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              注册用户 ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("calls")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "calls" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              通话请求 ({callRequests.length})
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder={activeTab === "users" ? "搜索用户..." : "搜索通话请求..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === "users" ? (
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {searchTerm ? "未找到匹配的用户" : "暂无注册用户"}
                  </h3>
                  <p className="text-slate-600">{searchTerm ? "请尝试其他搜索条件" : "用户注册后将在此显示"}</p>
                </CardContent>
              </Card>
            ) : (
              filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-slate-600" />
                        <span>
                          {user.first_name} {user.last_name}
                        </span>
                        <Badge variant={user.is_active ? "default" : "secondary"}>
                          {user.is_active ? "活跃" : "非活跃"}
                        </Badge>
                        {user.email_verified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            已验证
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone_number && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{user.phone_number}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-900">用户ID:</span>
                        <span className="ml-2 text-slate-600">#{user.id}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">注册时间:</span>
                        <span className="ml-2 text-slate-600">{formatDate(user.created_at)}</span>
                      </div>
                      {user.last_login && (
                        <div>
                          <span className="font-medium text-slate-900">最后登录:</span>
                          <span className="ml-2 text-slate-600">{formatDate(user.last_login)}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-slate-900">更新时间:</span>
                        <span className="ml-2 text-slate-600">{formatDate(user.updated_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCallRequests.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Phone className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {searchTerm ? "未找到匹配的通话请求" : "暂无通话请求"}
                  </h3>
                  <p className="text-slate-600">{searchTerm ? "请尝试其他搜索条件" : "通话请求将在此显示"}</p>
                </CardContent>
              </Card>
            ) : (
              filteredCallRequests.map((request, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <Phone className="w-5 h-5 text-slate-600" />
                        <span>{request.name}</span>
                      </CardTitle>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{request.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{request.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {formatDate(request.timestamp)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCallRequest(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-900">消息内容:</h4>
                      <p className="text-slate-700 bg-slate-50 p-3 rounded-md whitespace-pre-wrap">{request.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Data Storage Info */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900">
              <Database className="w-5 h-5" />
              <span>数据存储说明</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <div className="space-y-2 text-sm">
              <p>
                <strong>存储位置:</strong> 浏览器本地存储 (localStorage)
              </p>
              <p>
                <strong>数据键名:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <code>users</code> - 注册用户数据
                </li>
                <li>
                  <code>callRequests</code> - 通话请求数据
                </li>
                <li>
                  <code>user_profiles</code> - 用户档案数据
                </li>
                <li>
                  <code>user_sessions</code> - 用户会话数据
                </li>
              </ul>
              <p>
                <strong>访问方法:</strong> 在浏览器开发者工具中，进入 Application → Local Storage → 当前域名
              </p>
              <p>
                <strong>注意:</strong> 本地存储数据仅在当前浏览器中可见，清除浏览器数据会删除所有信息。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
