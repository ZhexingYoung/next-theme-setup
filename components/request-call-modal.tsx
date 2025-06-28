"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface CallRequestData {
  name: string
  email: string
  phone: string
  message: string
  timestamp: string
}

export function RequestCallModal() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 创建完整的请求数据
      const callRequestData: CallRequestData = {
        ...formData,
        timestamp: new Date().toISOString(),
      }

      // 保存到本地存储（实际项目中应该发送到服务器）
      const existingRequests = JSON.parse(localStorage.getItem("callRequests") || "[]")
      existingRequests.push(callRequestData)
      localStorage.setItem("callRequests", JSON.stringify(existingRequests))

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Request submitted successfully!",
        description: "We'll get back to you within 48 hours.",
      })

      // 重置表单并关闭模态框
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.message

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-slate-800 text-white border-slate-600 hover:bg-slate-700"
        >
          Request a call
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold text-slate-900">Request a call</DialogTitle>
          <DialogDescription className="text-slate-600 mt-2">
            You can request a call using the form below. Please allow 48 hours for a call back.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-900 font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-900 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-900 font-medium">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-900 font-medium">
              How can we help?
            </Label>
            <Textarea
              id="message"
              placeholder="Please tell us the reason for your call request"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
              className="border-slate-300 focus:border-purple-500 focus:ring-purple-500 min-h-[120px] resize-none"
            />
          </div>

          <DialogFooter className="flex flex-row justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="px-8">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            >
              {isSubmitting ? "Submitting..." : "Request a call"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
