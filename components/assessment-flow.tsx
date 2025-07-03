"use client"

import { useAssessment } from "@/contexts/assessment-context"
import { AssessmentSidebar } from "./assessment-sidebar"
import { ServiceOfferingQuestions } from "./service-offering-questions"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { BaseCampQuestions } from "./base-camp-questions"
import { TrackingClimbQuestions } from "./tracking-climb-questions"
import { ScalingEssentialsQuestions } from "./scaling-essentials-questions"
import { StreamliningClimbQuestions } from "./streamlining-climb-questions"
import { AssemblingTeamQuestions } from "./assembling-team-questions"
import { ToolboxSuccessQuestions } from "./toolbox-success-questions"
import { calculateAllPillarScores, calculateCategoryScores, saveScoresToFile } from "@/lib/score-calculator"

const assessmentSteps = [
  { id: "service-offering", title: "Service Offering", completed: false },
  { id: "base-camp", title: "Base camp for success", completed: false },
  { id: "tracking-climb", title: "Tracking the climb", completed: false },
  { id: "scaling-essentials", title: "Scaling essentials", completed: false },
  { id: "streamlining-climb", title: "Streamlining the climb", completed: false },
  { id: "assembling-team", title: "Assembling the team", completed: false },
  { id: "toolbox-success", title: "Toolbox for success", completed: false },
]

export function AssessmentFlow() {
  const { state, dispatch } = useAssessment()
  const router = useRouter()

  const currentStepData = assessmentSteps[state.currentStep]

  // 检查当前步骤是否完成
  const isCurrentStepCompleted = () => {
    if (state.currentStep === 0) {
      // Service Offering 步骤的完成检查
      const requiredQuestions = [
        "service-type",
        "opportunity-type",
        "concerns",
        "growth-route",
        "business-age",
        "business-size-employees",
        "business-size-revenue",
        "paying-clients",
        "biggest-client-revenue",
        "revenue-type",
        "funding-status",
        "revenue-targets",
        "growth-ambitions",
        "clients-needed",
        "preferred-revenue",
        "funding-plans",
      ]

      return requiredQuestions.every((questionId) => {
        const answer = state.answers[questionId]
        if (!answer) return false

        // answer 结构：{ options?: string[]; additionalText?: string }
        const hasOptions = Array.isArray(answer.options) && answer.options.length > 0
        const hasText = typeof answer.additionalText === "string" && answer.additionalText.trim() !== ""

        return hasOptions || hasText
      })
    } else if (state.currentStep === 1) {
      // Base Camp for Success 步骤的完成检查
      const requiredQuestions = [
        "target-niche",
        "pinpoint-clients",
        "targeted-pipeline",
        "know-buyers",
        "clear-problems",
        "proven-approach",
        "partners-resellers",
        "account-management",
        "global-growth",
        "know-competitors",
      ]

      return requiredQuestions.every((questionId) => {
        const answer = state.answers[questionId]
        if (!answer) return false

        return answer.selectedOption && answer.selectedOption.trim() !== ""
      })
    } else if (state.currentStep === 2) {
      // Tracking the climb 步骤的完成检查
      const requiredQuestions = [
        "commercial-performance",
        "revenue-profit-targets",
        "pipeline-management",
        "great-sale-recognition",
        "three-year-targets",
        "kpis-metrics",
      ]

      return requiredQuestions.every((questionId) => {
        const answer = state.answers[questionId]
        if (!answer) return false

        return answer.selectedOption && answer.selectedOption.trim() !== ""
      })
    } else if (state.currentStep === 3) {
      // Scaling essentials 步骤的完成检查
      const requiredQuestions = ["objections-techniques", "commercial-model", "pricing-testing", "terms-conditions"]

      return requiredQuestions.every((questionId) => {
        const answer = state.answers[questionId]
        if (!answer) return false

        return answer.selectedOption && answer.selectedOption.trim() !== ""
      })
    } else if (state.currentStep === 4) {
      // Streamlining the climb 步骤的完成检查
      const requiredQuestions = [
        "outbound-sales-approach",
        "marketing-brand-awareness",
        "lead-qualification",
        "delivery-handoff",
      ]

      return requiredQuestions.every((questionId) => {
        const answer = state.answers[questionId]
        if (!answer) return false

        return answer.selectedOption && answer.selectedOption.trim() !== ""
      })
    } else if (state.currentStep === 5) {
      // Assembling the team 步骤的完成检查
      const requiredQuestions = [
        "team-structure",
        "right-people-roles",
        "compensation-plans",
        "sales-culture",
        "performance-management",
      ]

      return requiredQuestions.every((questionId) => {
        const answer = state.answers[questionId]
        if (!answer) return false

        return answer.selectedOption && answer.selectedOption.trim() !== ""
      })
    } else if (state.currentStep === 6) {
      // Toolbox for success 步骤的完成检查
      const requiredQuestions = [
        "central-shared-drive",
        "client-collateral",
        "capability-demonstration",
        "digital-tools",
        "crm-implementation",
      ]

      return requiredQuestions.every((questionId) => {
        const answer = state.answers[questionId]
        if (!answer) return false

        return answer.selectedOption && answer.selectedOption.trim() !== ""
      })
    }
    return false
  }

  const handleSaveForLater = () => {
    // 保存当前进度到localStorage
    const progressData = {
      currentStep: state.currentStep,
      answers: state.answers,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem("assessment_progress", JSON.stringify(progressData))
    alert("Progress saved successfully!")
  }

  const handleCompleteSection = async () => {
    if (isCurrentStepCompleted()) {
      // 标记当前步骤为完成
      dispatch({ type: "COMPLETE_STEP", payload: state.currentStep })

      // 如果是最后一步，计算分数并跳转到dashboard
      if (state.currentStep === assessmentSteps.length - 1) {
        dispatch({ type: "COMPLETE_ASSESSMENT" })
        // 计算所有六大类的分数
        const pillarScores = calculateAllPillarScores(state.answers)
        // 计算三大能力分数
        const categoryScores = calculateCategoryScores(state.answers)
        // 统一 userId：用当前登录用户邮箱
        let userId = "user_default"
        if (typeof window !== "undefined") {
          const userStr = localStorage.getItem("currentUser")
          if (userStr) {
            try {
              const user = JSON.parse(userStr)
              if (user.email) userId = user.email
            } catch {}
          }
        }
        // 保存分数到文件
        try {
          await saveScoresToFile(userId, pillarScores, categoryScores)
          console.log("Pillar & Category scores saved:", pillarScores, categoryScores)
        } catch (error) {
          console.error("Failed to save scores:", error)
        }
        // 自动POST到FastAPI
        try {
          // 获取 Service Offering 所有题目
          const serviceOfferingIds = [
            "industry", "business-challenge", "service-type", "opportunity-type", "concerns", "growth-route", "business-age", "business-size-employees", "business-size-revenue", "paying-clients", "biggest-client-revenue", "revenue-type", "funding-status", "revenue-targets", "growth-ambitions", "clients-needed", "preferred-revenue", "funding-plans"
          ]
          const serviceOffering: Record<string, any> = {}
          serviceOfferingIds.forEach(id => {
            if (state.answers[id]) serviceOffering[id] = state.answers[id]
          })
          // 获取六大类建议文本
          const { getAllPillarReports } = await import("@/lib/score-calculator")
          const pillarReports = getAllPillarReports(pillarScores, userId)
          // 组装数据
          const data = {
            userId,
            serviceOffering,
            pillarReports
          }
          await fetch("http://127.0.0.1:8000/api/save-user-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          })
        } catch (e) {
          console.error("自动POST到FastAPI失败", e)
        }
        router.push("/dashboard")
      } else {
        // 否则进入下一步
        dispatch({ type: "NEXT_STEP" })
      }
    }
  }

  const handleAnswer = (questionId: string, answer: any) => {
    dispatch({ type: "SET_ANSWER", payload: { questionId, answer } })
  }

  // 更新步骤完成状态
  const updatedSteps = assessmentSteps.map((step, index) => ({
    ...step,
    completed: state.completedSteps.has(index), // 只有明确完成的步骤才显示为completed
  }))

  return (
    <div className="flex min-h-screen">
      <AssessmentSidebar
        steps={updatedSteps}
        currentStep={state.currentStep}
        onStepClick={(step) => dispatch({ type: "SET_STEP", payload: step })}
      />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">{currentStepData.title}</h1>
              {isCurrentStepCompleted() && (
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">Complete</div>
              )}
            </div>
            <p className="text-slate-300">
              Please answer the following questions as accurately as possible. Make your choice, provide any additional
              relevant info, then click 'Next' to complete each question.
            </p>
          </div>

          {/* 根据当前步骤显示不同的问卷 */}
          {state.currentStep === 0 && <ServiceOfferingQuestions answers={state.answers} onAnswer={handleAnswer} />}
          {state.currentStep === 1 && <BaseCampQuestions answers={state.answers} onAnswer={handleAnswer} />}
          {state.currentStep === 2 && <TrackingClimbQuestions answers={state.answers} onAnswer={handleAnswer} />}
          {state.currentStep === 3 && <ScalingEssentialsQuestions answers={state.answers} onAnswer={handleAnswer} />}
          {state.currentStep === 4 && <StreamliningClimbQuestions answers={state.answers} onAnswer={handleAnswer} />}
          {state.currentStep === 5 && <AssemblingTeamQuestions answers={state.answers} onAnswer={handleAnswer} />}
          {state.currentStep === 6 && <ToolboxSuccessQuestions answers={state.answers} onAnswer={handleAnswer} />}

          {/* 底部按钮 */}
          <div className="flex justify-between mt-12">
            <Button
              onClick={handleSaveForLater}
              variant="outline"
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Save for later
            </Button>

            <Button
              onClick={handleCompleteSection}
              disabled={!isCurrentStepCompleted()}
              className={`px-8 py-2 rounded-full ${
                isCurrentStepCompleted()
                  ? "bg-slate-600 hover:bg-slate-700 text-white"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              {state.currentStep === assessmentSteps.length - 1 ? "Complete Assessment" : "Complete section"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
