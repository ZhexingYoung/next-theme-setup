"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { Download, Target, Users, TrendingUp, DollarSign, User } from "lucide-react"

const radarData = [
  { subject: "Go To Market", A: 50, fullMark: 100 },
  { subject: "Systems & Tools", A: 80, fullMark: 100 },
  { subject: "Performance Metrics", A: 90, fullMark: 100 },
  { subject: "Commercial Essentials", A: 70, fullMark: 100 },
  { subject: "Optimal Processes", A: 60, fullMark: 100 },
  { subject: "People Structure & Culture", A: 85, fullMark: 100 },
]

const keyMetrics = [
  { icon: Target, label: "Growth Target", value: "100% growth", target: "Target: 90%" },
  { icon: Users, label: "Employees", value: "5-15 people" },
  { icon: TrendingUp, label: "Annual Revenue", value: "£1m - £2.5m" },
  { icon: User, label: "Paying Clients", value: "4 to 8" },
  { icon: DollarSign, label: "Service Offering", value: "Service" },
]

export function BusinessDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <div className="font-bold text-lg">ASCENT</div>
              <div className="text-xs text-orange-500 font-semibold">BRIGHT EVOLVE</div>
            </div>
          </div>
          <div className="flex space-x-6 ml-8">
            <button className="text-white hover:text-slate-300">Dashboard</button>
            <button className="text-slate-400 hover:text-white">My assessments</button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-300">My Account</span>
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-2xl font-bold mb-2">Good evening, 哲豪</h1>
              <p className="text-slate-300 mb-4">
                Here's the current standing of your business report based on your most recent assessment.
              </p>

              {/* Score Cards */}
              <div className="flex space-x-4 mb-6">
                <Card className="bg-slate-800 border-slate-700 flex-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">50</div>
                    <div className="text-sm text-slate-300">Reasonable</div>
                    <div className="text-xs text-slate-400">Target: 90%</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 border-slate-700 flex-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">50</div>
                    <div className="text-sm text-slate-300">Profitable</div>
                    <div className="text-xs text-slate-400">Target: 90%</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 border-slate-700 flex-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">45</div>
                    <div className="text-sm text-slate-300">Scalable</div>
                    <div className="text-xs text-slate-400">Target: 90%</div>
                  </CardContent>
                </Card>
              </div>

              <Button className="bg-purple-600 hover:bg-purple-700 mb-6">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>

            {/* Key Metrics */}
            <Card className="bg-white text-slate-900">
              <CardHeader>
                <CardTitle className="text-lg">Your key metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <metric.icon className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">{metric.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{metric.value}</div>
                        {metric.target && <div className="text-sm text-slate-600">{metric.target}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Report Tabs */}
            <Card className="bg-white text-slate-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Report</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="go-to-market" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="go-to-market" className="text-xs">
                      Go To Market
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="text-xs">
                      Performance Metrics
                    </TabsTrigger>
                    <TabsTrigger value="commercial" className="text-xs">
                      Commercial Essentials
                    </TabsTrigger>
                    <TabsTrigger value="processes" className="text-xs">
                      Optimal Processes
                    </TabsTrigger>
                    <TabsTrigger value="people" className="text-xs">
                      People, Structure & Culture
                    </TabsTrigger>
                    <TabsTrigger value="systems" className="text-xs">
                      Systems & Tools
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="go-to-market" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-orange-600">Fair</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Go To Market</h3>
                          <p className="text-slate-600">
                            Unfortunately, "build it and they will come" only truly applies to Kevin Costner in The
                            Field of Dreams. As business owners, we need to give clear thought to who we're selling to,
                            why they will want it and how we will reach them.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Our top tips</h4>
                        <div className="flex space-x-4">
                          <Badge variant="outline" className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span>Start Doing</span>
                          </Badge>
                          <Badge variant="outline" className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                            <span>Do More</span>
                          </Badge>
                          <Badge variant="outline" className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Keep Doing</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Radar Chart */}
          <div>
            <Card className="bg-slate-800 border-slate-700 h-fit">
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#475569" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#cbd5e1", fontSize: 10 }} />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
