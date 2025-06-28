"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { AccountDropdown } from "@/components/account-dropdown"

export default function MyProfilePage() {
  const router = useRouter()
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+44 123 456 7890",
    location: "London, UK",
    jobTitle: "Business Owner",
    company: "Tech Solutions Ltd",
    bio: "Passionate entrepreneur focused on scaling technology solutions for small and medium businesses.",
  })

  useEffect(() => {
    // 加载用户头像
    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }

    // 加载用户资料数据
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile)
        setProfileData(parsedProfile)
      } catch (error) {
        console.error("Error parsing profile data:", error)
      }
    }
  }, [])

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // 检查文件大小 (限制为5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUserAvatar(result)
        // 保存到localStorage
        localStorage.setItem("userAvatar", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveProfile = () => {
    // 保存用户资料到localStorage
    localStorage.setItem("userProfile", JSON.stringify(profileData))
    alert("Profile saved successfully!")
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src="/images/ascent-logo.png" alt="logo" className="h-10 w-auto" />
          </div>
          <div className="flex space-x-6 ml-8">
            <button onClick={() => router.push("/dashboard")} className="text-slate-400 hover:text-white">
              Dashboard
            </button>
            <button className="text-white hover:text-slate-300">My Profile</button>
          </div>
        </div>
        <AccountDropdown />
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          {/* <div className="mb-6">
            <Button variant="outline" onClick={() => router.push("/dashboard")} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div> */}

          {/* Profile Header */}
          <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                {/* Avatar Upload */}
                <div className="relative">
                  <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center overflow-hidden">
                    {userAvatar ? (
                      <img
                        src={userAvatar || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-slate-400" />
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 rounded-full p-2 cursor-pointer transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <div className="flex items-center space-x-4 text-slate-300">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{profileData.jobTitle}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-300">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-300">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">
                    Phone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-300">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-slate-300">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    value={profileData.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-300">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-slate-300">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveProfile} className="bg-purple-600 hover:bg-purple-700 px-8">
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
