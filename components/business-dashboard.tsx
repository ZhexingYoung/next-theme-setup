"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { Download, Target, Users, TrendingUp, DollarSign, User } from "lucide-react"
import { AccountDropdown } from "./account-dropdown"
import { useEffect, useState } from "react"
import { getUserScoreHistory } from "@/lib/score-calculator"
import pillarAdvice from "@/lib/pillar-advice.json"

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

const metricsFieldMap = [
  { label: "Growth Target", key: "revenue-targets" },
  { label: "Employees", key: "business-size-employees" },
  { label: "Annual Revenue", key: "business-size-revenue" },
  { label: "Paying Clients", key: "paying-clients" }
]

function toPercent(score: number) {
  return Math.round((score + 2) * 25)
}

function getCircleColor(score: number) {
  if (score < -1.25) return "#e53e3e" // red
  if (score > 1.25) return "#38a169" // green
  return "#f6ad55" // amber
}
function getCircleLabel(score: number) {
  if (score < -1.25) return "Poor"
  if (score > 1.25) return "Good"
  return "Fair"
}

// 修正 keyMap，key 与 tab.label 完全一致
const keyMap = {
  "Go To Market": "GTM Tips",
  "Performance Metrics": "PM Tips",
  "Commercial Essentials": "CE Tips",
  "Optimal Processes": "OP Tips",
  "People, Structure & Culture": "PSC Tips",
  "Systems & Tools": "S&T Tips"
} as const

// 获取建议文本（pillar-advice.json）
function getAdviceList(pillar: keyof typeof keyMap, userId: string) {
  const arr = (pillarAdvice as any)[keyMap[pillar]] as any[]
  if (!arr || arr.length === 0) return ["No advice available.", "No advice available.", "No advice available."]
  // 用 userId 做 hash，保证同一用户每次一样
  let idx = 0
  for (let i = 0; i < userId.length; i++) idx += userId.charCodeAt(i)
  idx = idx % arr.length
  const item = arr[idx]
  return [item["Top Tips"] || "", item["Unnamed: 2"] || "", item["Unnamed: 3"] || ""]
}

// 根据得分区间和 userId 随机返回一条建议
function getAdviceByScore(pillar: keyof typeof keyMap, userId: string, score: number) {
  const arr = (pillarAdvice as any)[keyMap[pillar]] as any[]
  let col = "Top Tips"
  if (score > 1.25) col = "Unnamed: 3"
  else if (score >= -1.25) col = "Unnamed: 2"
  // 过滤掉空建议
  const filtered = arr?.filter(item => item[col] && item[col].trim()) || []
  if (!filtered.length) return "No advice available."
  // 用 userId 做 hash，保证同一用户每次一样
  let idx = 0
  for (let i = 0; i < userId.length; i++) idx += userId.charCodeAt(i)
  idx = idx % filtered.length
  return filtered[idx][col]
}

function getMetricValue(answers: any, key: string) {
  const ans = answers?.[key]
  if (!ans) return "-"
  if (Array.isArray(ans.options)) return ans.options.join(", ")
  if (typeof ans.text === "string") return ans.text
  return "-"
}

// 自动 POST 用户问卷 JSON 到后端
async function postUserReportJson(userId: string, serviceOffering: Record<string, any>, pillarReports: Record<string, string>) {
  const data = {
    userId,
    serviceOffering,
    pillarReports
  }
  try {
    await fetch("/api/save-user-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  } catch (e) {
    // 可以加错误提示
    console.error("Failed to post user report json", e)
  }
}

export function BusinessDashboard() {
  const [userName, setUserName] = useState<string>("")
  const [pillarScores, setPillarScores] = useState<Record<string, number>>({})
  const [radarData, setRadarData] = useState<any[]>([])
  const [pillarReports, setPillarReports] = useState<Record<string, string>>({})
  const [userId, setUserId] = useState<string>("user_default")
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({})
  const [metrics, setMetrics] = useState<Record<string, string>>({})
  const [industry, setIndustry] = useState("")
  const [businessChallenge, setBusinessChallenge] = useState("")
  const [serviceOffering, setServiceOffering] = useState<Record<string, any>>({})
  
  useEffect(() => {
    let localUserId = "user_default"
    const userStr = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUserName(user.first_name || "")
        if (user.email) localUserId = user.email
      } catch {}
    }
    setUserId(localUserId)
    // 获取最新的分数数据
    const scoreHistory = getUserScoreHistory(localUserId)
    if (scoreHistory.length > 0) {
      const latest = scoreHistory[scoreHistory.length - 1]
      const latestScores = latest.pillarScores || latest.scores
      setPillarScores(latestScores)
      setPillarReports(latest.pillarReports || {})
      setCategoryScores(latest.categoryScores || {})
      // 更新雷达图数据
      const newRadarData = Object.entries(latestScores).map(([pillar, score]) => ({
        subject: pillar,
        A: Math.max(0, ((score as number) + 2) * 25),
        fullMark: 100
      }))
      setRadarData(newRadarData)
    }
    // 读取 Service Offering 问卷结果
    if (typeof window !== "undefined") {
      const answersStr = localStorage.getItem("assessment_answers")
      if (answersStr) {
        const answers = JSON.parse(answersStr)
        const m: Record<string, string> = {}
        metricsFieldMap.forEach(f => {
          m[f.key] = getMetricValue(answers, f.key)
        })
        setMetrics(m)
      }
    }
    // 读取 Service Offering 问卷主观题
    if (typeof window !== "undefined") {
      const answersStr = localStorage.getItem("assessment_answers")
      if (answersStr) {
        const answers = JSON.parse(answersStr)
        setIndustry(answers["industry"]?.text || "")
        setBusinessChallenge(answers["business-challenge"]?.text || "")
      }
    }
    // 读取 Service Offering 问卷所有题目
    if (typeof window !== "undefined") {
      const answersStr = localStorage.getItem("assessment_answers")
      if (answersStr) {
        const answers = JSON.parse(answersStr)
        setServiceOffering(answers)
      }
    }
  }, [])

  // 自动 POST JSON 到后端
  useEffect(() => {
    if (
      userId &&
      serviceOffering &&
      Object.keys(serviceOffering).length > 0 &&
      pillarReports &&
      Object.keys(pillarReports).length === 6
    ) {
      postUserReportJson(userId, serviceOffering, pillarReports)
    }
  }, [userId, serviceOffering, pillarReports])

  // 导出/同步按钮
  async function syncMetricsToBackend() {
    const payload = {
      growth_target: metrics["revenue-targets"] || "",
      employees: metrics["business-size-employees"] || "",
      annual_revenue: metrics["business-size-revenue"] || "",
      paying_clients: metrics["paying-clients"] || "",
      service_offering: metrics["service-type"] || ""
    }
    try {
      const res = await fetch("/api/user-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      if (res.ok) alert("同步成功！")
      else alert("同步失败")
    } catch {
      alert("同步失败")
    }
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
            <button className="text-white hover:text-slate-300">Dashboard</button>
          </div>
        </div>
        <AccountDropdown />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-2xl font-bold mb-2">Good evening{userName ? `, ${userName}` : ""}</h1>
              <p className="text-slate-300 mb-4">
                Here's the current standing of your business report based on your most recent assessment.
              </p>

              {/* Score Cards */}
              <div className="flex space-x-4 mb-6">
                <Card className="bg-slate-800 border-slate-700 flex-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{toPercent(categoryScores["Repeatable"] ?? 0)}</div>
                    <div className="text-sm text-slate-300">Repeatable</div>
                    <div className="text-xs text-slate-400">Target: 90%</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 border-slate-700 flex-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{toPercent(categoryScores["Profitable"] ?? 0)}</div>
                    <div className="text-sm text-slate-300">Profitable</div>
                    <div className="text-xs text-slate-400">Target: 90%</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 border-slate-700 flex-1">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{toPercent(categoryScores["Scalable"] ?? 0)}</div>
                    <div className="text-sm text-slate-300">Scalable</div>
                    <div className="text-xs text-slate-400">Target: 90%</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Key Metrics */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="text-lg font-bold mb-4">Your key metrics</div>
                <div className="space-y-2 w-full">
                  {metricsFieldMap.map(f => (
                    <div key={f.key} className="flex items-center justify-between w-full">
                      <span>{f.label}</span>
                      <span className="font-semibold">{metrics[f.key] || "-"}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Report Tabs */}
            <Card className="bg-white text-slate-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Report</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="go-to-market" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="go-to-market" className="text-xs">Go To Market</TabsTrigger>
                    <TabsTrigger value="performance" className="text-xs">Performance Metrics</TabsTrigger>
                    <TabsTrigger value="commercial" className="text-xs">Commercial Essentials</TabsTrigger>
                    <TabsTrigger value="processes" className="text-xs">Optimal Processes</TabsTrigger>
                    <TabsTrigger value="people" className="text-xs">People, Structure & Culture</TabsTrigger>
                    <TabsTrigger value="systems" className="text-xs">Systems & Tools</TabsTrigger>
                  </TabsList>
                  {[
                    { key: "go-to-market", label: "Go To Market" },
                    { key: "performance", label: "Performance Metrics" },
                    { key: "commercial", label: "Commercial Essentials" },
                    { key: "processes", label: "Optimal Processes" },
                    { key: "people", label: "People, Structure & Culture" },
                    { key: "systems", label: "Systems & Tools" },
                  ].map(tab => {
                    const score = pillarScores[tab.label] ?? 0
                    const percent = toPercent(score)
                    const color = getCircleColor(score)
                    const label = getCircleLabel(score)
                    const desc = getAdviceByScore(tab.label as keyof typeof keyMap, userId, score)
                    return (
                      <TabsContent key={tab.key} value={tab.key} className="mt-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                          {/* 圆环分数 */}
                          <div className="flex-shrink-0 flex flex-col items-center">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                              <circle cx="60" cy="60" r="54" stroke="#e2e8f0" strokeWidth="12" fill="none" />
                              <circle
                                cx="60" cy="60" r="54"
                                stroke={color}
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={339.292}
                                strokeDashoffset={339.292 * (1 - percent / 100)}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 0.5s' }}
                              />
                              <text x="60" y="65" textAnchor="middle" fontSize="28" fontWeight="bold" fill={color}>{label}</text>
                            </svg>
                          </div>
                          {/* 右侧标题和描述 */}
                          <div className="flex-1 flex flex-col justify-between h-full">
                            <div>
                              <h3 className="text-2xl font-bold mb-2 text-slate-900">{tab.label}</h3>
                              <p className="text-slate-700 mb-6 whitespace-pre-line">{desc}</p>
                            </div>
                            <div className="flex justify-end mt-4">
                              <div className="bg-slate-50 rounded-lg p-4 max-w-xl w-full shadow">
                                <div className="flex items-center mb-2">
                                  <span className="w-3 h-3 rounded-full mr-2" style={{background: score < -1.25 ? '#ef4444' : score > 1.25 ? '#22c55e' : '#facc15'}}></span>
                                  <span className="font-semibold text-slate-800">
                                    {score < -1.25 ? 'Start Doing' : score > 1.25 ? 'Keep Doing' : 'Do More'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    )
                  })}
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
