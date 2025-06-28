"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { TermsModal } from "./terms-modal"

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showCallModal, setShowCallModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [callIsSubmitting, setCallIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // 登录成功，跳转到评估页面
      router.push("/assessment")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCallIsSubmitting(true)

    try {
      // 创建完整的请求数据
      const callRequestData = {
        ...formData,
        timestamp: new Date().toISOString(),
      }

      // 保存到本地存储
      const existingRequests = JSON.parse(localStorage.getItem("callRequests") || "[]")
      existingRequests.push(callRequestData)
      localStorage.setItem("callRequests", JSON.stringify(existingRequests))

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 显示成功消息
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setShowCallModal(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      }, 2000)
    } catch (error) {
      console.error("Failed to submit request:", error)
    } finally {
      setCallIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.message

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center">
            <img src="/images/ascent-logo-home.png" alt="logo" className="h-16 w-auto" />
          </div>
        </div>

        {/* Main Content */}
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome to Ascent</h1>
              <p className="text-muted-foreground">Select an option to continue</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {isLogin ? (
              <div className="space-y-4">
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                  onClick={() => setIsLogin(false)}
                >
                  Login
                </Button>

                <div className="text-center">
                  <Button variant="link" onClick={() => router.push("/register")} className="text-sm">
                    Create an account
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700">
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center">
                  <Button variant="link" onClick={() => setIsLogin(true)} className="text-sm">
                    Back to options
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="absolute bottom-8 left-8">
          <div className="text-sm text-muted-foreground mb-2">Need Help?</div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-slate-800 text-white border-slate-600 hover:bg-slate-700"
            onClick={() => setShowCallModal(true)}
          >
            Request a call
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
          © Copyright 2025, All Rights Reserved
          <br />
          <button
            onClick={() => setShowTermsModal(true)}
            className="text-purple-600 hover:text-purple-700 underline hover:no-underline transition-all"
          >
            Terms & Conditions
          </button>
        </div>
      </div>

      {/* Call Request Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">Request a call</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCallModal(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-slate-600 mb-6">
                You can request a call using the form below. Please allow 48 hours for a call back.
              </p>

              {showSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Request submitted successfully!</h3>
                  <p className="text-slate-600">We'll get back to you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleCallSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="call-name" className="text-slate-900 font-medium">
                      Name
                    </Label>
                    <Input
                      id="call-name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="call-email" className="text-slate-900 font-medium">
                      Email
                    </Label>
                    <Input
                      id="call-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="call-phone" className="text-slate-900 font-medium">
                      Phone
                    </Label>
                    <Input
                      id="call-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="call-message" className="text-slate-900 font-medium">
                      How can we help?
                    </Label>
                    <textarea
                      id="call-message"
                      placeholder="Please tell us the reason for your call request"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowCallModal(false)} className="px-6">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isFormValid || callIsSubmitting}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                    >
                      {callIsSubmitting ? "Submitting..." : "Request a call"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </>
  )
}
