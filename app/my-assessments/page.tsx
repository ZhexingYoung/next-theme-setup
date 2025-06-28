"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Target, TrendingUp, FileText, Play } from "lucide-react"
import { useRouter } from "next/navigation"
import { AccountDropdown } from "@/components/account-dropdown"

interface Assessment {
  id: string
  title: string
  status: "completed" | "in-progress" | "not-started"
  completedDate?: string
  progress: number
  score?: number
  description: string
}

export default function MyAssessmentsPage() {
  const router = useRouter()
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: "business-growth-2024",
      title: "Business Growth Assessment 2024",
      status: "completed",
      completedDate: "2024-12-15",
      progress: 100,
      score: 72,
      description: "Comprehensive assessment of your business growth potential and current performance metrics.",
    },
    {
      id: "market-readiness",
      title: "Market Readiness Evaluation",
      status: "in-progress",
      progress: 65,
      description: "Evaluate your business readiness for market expansion and scaling opportunities.",
    },
    {
      id: "digital-transformation",
      title: "Digital Transformation Assessment",
      status: "not-started",
      progress: 0,
      description: "Assess your organization's digital maturity and transformation readiness.",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600"
      case "in-progress":
        return "bg-yellow-600"
      case "not-started":
        return "bg-slate-600"
      default:
        return "bg-slate-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "not-started":
        return "Not Started"
      default:
        return "Unknown"
    }
  }

  const handleStartAssessment = (assessmentId: string) => {
    if (assessmentId === "business-growth-2024") {
      router.push("/assessment")
    } else {
      alert("This assessment is not yet available.")
    }
  }

  const handleViewReport = (assessmentId: string) => {
    if (assessmentId === "business-growth-2024") {
      router.push("/dashboard")
    } else {
      alert("Report not available for this assessment.")
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
            <button onClick={() => router.push("/dashboard")} className="text-slate-400 hover:text-white">
              Dashboard
            </button>
            <button className="text-white hover:text-slate-300">My Assessments</button>
          </div>
        </div>
        <AccountDropdown />
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          {/* <div className="mb-6">
            <Button variant="outline" onClick={() => router.push("/dashboard")} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div> */}

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">My Assessments</h1>
            <p className="text-slate-300">Track your assessment progress and view completed reports</p>
          </div>

          {/* Assessment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Assessments</CardTitle>
                <Target className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{assessments.length}</div>
                <p className="text-xs text-slate-400">Available assessments</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Completed</CardTitle>
                <TrendingUp className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {assessments.filter((a) => a.status === "completed").length}
                </div>
                <p className="text-xs text-slate-400">Finished assessments</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Average Score</CardTitle>
                <FileText className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {assessments.filter((a) => a.score).length > 0
                    ? Math.round(
                        assessments.filter((a) => a.score).reduce((sum, a) => sum + (a.score || 0), 0) /
                          assessments.filter((a) => a.score).length,
                      )
                    : 0}
                </div>
                <p className="text-xs text-slate-400">Overall performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Assessments List */}
          <div className="space-y-6">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-white text-xl">{assessment.title}</CardTitle>
                      <p className="text-slate-300 text-sm">{assessment.description}</p>
                    </div>
                    <Badge className={`${getStatusColor(assessment.status)} text-white`}>
                      {getStatusText(assessment.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Progress</span>
                        <span className="text-slate-300">{assessment.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${assessment.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Assessment Details */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-slate-400">
                        {assessment.completedDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Completed: {new Date(assessment.completedDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {assessment.score && (
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>Score: {assessment.score}/100</span>
                          </div>
                        )}
                        {assessment.status === "in-progress" && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>In Progress</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        {assessment.status === "completed" && (
                          <Button
                            onClick={() => handleViewReport(assessment.id)}
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Report
                          </Button>
                        )}
                        {assessment.status !== "completed" && (
                          <Button
                            onClick={() => handleStartAssessment(assessment.id)}
                            className="bg-purple-600 hover:bg-purple-700"
                            size="sm"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {assessment.status === "in-progress" ? "Continue" : "Start Assessment"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {assessments.length === 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-12 text-center">
                <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No assessments available</h3>
                <p className="text-slate-400">Check back later for new assessment opportunities.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
