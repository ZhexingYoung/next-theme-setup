"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building, Globe, Users, DollarSign, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { AccountDropdown } from "@/components/account-dropdown"

export default function MyCompanyPage() {
  const router = useRouter()
  const [companyData, setCompanyData] = useState({
    businessName: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    website: "",
    description: "",
    headquarters: "",
    revenue: "",
    employees: "",
    businessType: "",
  })

  useEffect(() => {
    // 加载公司数据
    const savedCompany = localStorage.getItem("companyData")
    if (savedCompany) {
      try {
        const parsedCompany = JSON.parse(savedCompany)
        setCompanyData(parsedCompany)
      } catch (error) {
        console.error("Error parsing company data:", error)
      }
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveCompany = () => {
    // 保存公司数据到localStorage
    localStorage.setItem("companyData", JSON.stringify(companyData))
    alert("Company information saved successfully!")
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
            <button className="text-white hover:text-slate-300">My Company</button>
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

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Company Information</h1>
            <p className="text-slate-300">Manage your company details and business information</p>
          </div>

          {/* Company Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-slate-300">
                    Business Name
                  </Label>
                  <Input
                    id="businessName"
                    value={companyData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="Enter your business name"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-slate-300">
                    Industry
                  </Label>
                  <Select value={companyData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-slate-300">
                    Company Size
                  </Label>
                  <Select
                    value={companyData.companySize}
                    onValueChange={(value) => handleInputChange("companySize", value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foundedYear" className="text-slate-300">
                    Founded Year
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="foundedYear"
                      value={companyData.foundedYear}
                      onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                      placeholder="e.g., 2020"
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-slate-300">
                    Website
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="website"
                      value={companyData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://www.example.com"
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headquarters" className="text-slate-300">
                    Headquarters
                  </Label>
                  <Input
                    id="headquarters"
                    value={companyData.headquarters}
                    onChange={(e) => handleInputChange("headquarters", e.target.value)}
                    placeholder="City, Country"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-slate-300">
                    Business Type
                  </Label>
                  <Select
                    value={companyData.businessType}
                    onValueChange={(value) => handleInputChange("businessType", value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="nonprofit">Nonprofit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenue" className="text-slate-300">
                    Annual Revenue
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Select value={companyData.revenue} onValueChange={(value) => handleInputChange("revenue", value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white pl-10">
                        <SelectValue placeholder="Select revenue range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100k">Under £100K</SelectItem>
                        <SelectItem value="100k-500k">£100K - £500K</SelectItem>
                        <SelectItem value="500k-1m">£500K - £1M</SelectItem>
                        <SelectItem value="1m-5m">£1M - £5M</SelectItem>
                        <SelectItem value="5m-10m">£5M - £10M</SelectItem>
                        <SelectItem value="over-10m">Over £10M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees" className="text-slate-300">
                    Number of Employees
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="employees"
                      value={companyData.employees}
                      onChange={(e) => handleInputChange("employees", e.target.value)}
                      placeholder="e.g., 25"
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300">
                    Company Description
                  </Label>
                  <Textarea
                    id="description"
                    value={companyData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                    placeholder="Describe your company's mission, products, or services..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveCompany} className="bg-purple-600 hover:bg-purple-700 px-8">
              Save Company Information
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
