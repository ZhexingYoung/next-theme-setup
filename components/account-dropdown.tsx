"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Users, Target, LogOut, ChevronDown } from "lucide-react"

export function AccountDropdown() {
  const router = useRouter()
  const [userAvatar, setUserAvatar] = useState<string | null>(null)

  useEffect(() => {
    // 加载用户头像
    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      // 调用登出API
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      // 清除本地数据
      localStorage.removeItem("session_token")

      // 跳转到登录页
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      // 即使API调用失败，也清除本地数据并跳转
      localStorage.removeItem("session_token")
      router.push("/")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-3 hover:bg-slate-800">
          <span className="text-sm text-slate-300">My Account</span>
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center overflow-hidden">
            {userAvatar ? (
              <img src={userAvatar || "/placeholder.svg"} alt="User Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-sm font-medium">U</span>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuItem onClick={() => router.push("/my-profile")} className="cursor-pointer">
          <User className="mr-3 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/my-company")} className="cursor-pointer">
          <Users className="mr-3 h-4 w-4" />
          <span>My Company</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/my-assessments")} className="cursor-pointer">
          <Target className="mr-3 h-4 w-4" />
          <span>My Assessments</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:text-red-700">
          <LogOut className="mr-3 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
