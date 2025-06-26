"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Linkedin, Mail } from "lucide-react"

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 模拟登录逻辑
    router.push("/assessment")
  }

  const handleSocialLogin = (provider: string) => {
    // 模拟社交登录
    router.push("/assessment")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <div className="font-bold text-lg">ASCENT</div>
            <div className="text-xs text-orange-500 font-semibold">BRIGHT EVOLVE</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome to Ascent</h1>
            <p className="text-muted-foreground">Select an option to continue</p>
          </div>

          {isLogin ? (
            <div className="space-y-4">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                onClick={() => router.push("/assessment")}
              >
                Login
              </Button>

              <div className="text-center text-sm text-muted-foreground">Or</div>

              <Button variant="outline" className="w-full py-3" onClick={() => handleSocialLogin("linkedin")}>
                <Linkedin className="w-4 h-4 mr-2" />
                Continue with LinkedIn
              </Button>

              <Button variant="outline" className="w-full py-3" onClick={() => handleSocialLogin("google")}>
                <Mail className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>

              <div className="text-center">
                <Button variant="link" onClick={() => setIsLogin(false)} className="text-sm">
                  Create an account
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Create Account
              </Button>
              <div className="text-center">
                <Button variant="link" onClick={() => setIsLogin(true)} className="text-sm">
                  Already have an account? Login
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-8 left-8">
        <div className="text-sm text-muted-foreground mb-2">Need Help?</div>
        <Button variant="outline" size="sm" className="rounded-full">
          Request a call
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        © Copyright 2025, All Rights Reserved
        <br />
        Terms & Conditions
      </div>
    </div>
  )
}
