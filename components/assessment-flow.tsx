"use client"

import { useAssessment } from "@/contexts/assessment-context"
import { AssessmentSidebar } from "./assessment-sidebar"
import { QuestionCard } from "./question-card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const assessmentSteps = [
  { id: "service-offering", title: "Service Offering", completed: false },
  { id: "base-camp", title: "Base camp for success", completed: false },
  { id: "tracking-climb", title: "Tracking the climb", completed: false },
  { id: "scaling-essentials", title: "Scaling essentials", completed: false },
  { id: "streamlining-climb", title: "Streamlining the climb", completed: false },
  { id: "assembling-team", title: "Assembling the team", completed: false },
  { id: "toolbox-success", title: "Toolbox for success", completed: false },
]

const questions = [
  {
    id: "service-type",
    title: "How would you describe what you offer?",
    type: "multiple-choice",
    options: ["Service", "Platform", "Product"],
    additionalInfo: true,
  },
  {
    id: "opportunity",
    title: "How would you describe the opportunity you have?",
    type: "text",
  },
  {
    id: "concerns",
    title: "What keeps you awake at night?",
    type: "text",
  },
  {
    id: "growth-route",
    title: "What do you believe is your best route to growth?",
    type: "text",
  },
  {
    id: "business-age",
    title: "How long has your business been trading?",
    type: "text",
  },
  {
    id: "business-size",
    title: "How big is your business? (Employees)",
    type: "text",
  },
]

export function AssessmentFlow() {
  const { state, dispatch } = useAssessment()
  const router = useRouter()

  const currentQuestion = questions[state.currentStep]
  const isLastQuestion = state.currentStep === questions.length - 1

  const handleNext = () => {
    if (isLastQuestion) {
      dispatch({ type: "COMPLETE_ASSESSMENT" })
      router.push("/dashboard")
    } else {
      dispatch({ type: "NEXT_STEP" })
    }
  }

  const handleAnswer = (questionId: string, answer: any) => {
    dispatch({ type: "SET_ANSWER", payload: { questionId, answer } })
  }

  return (
    <div className="flex min-h-screen">
      <AssessmentSidebar
        steps={assessmentSteps}
        currentStep={state.currentStep}
        onStepClick={(step) => dispatch({ type: "SET_STEP", payload: step })}
      />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Service offering</h1>
            <p className="text-slate-300">
              Please answer the following questions as accurately as possible. Make your choice, provide any additional
              relevant info, then click 'Next' to complete each question.
            </p>
          </div>

          <div className="space-y-8">
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                answer={state.answers[currentQuestion.id]}
                onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
              />
            )}

            {/* Other collapsed questions */}
            {questions.slice(state.currentStep + 1).map((question, index) => (
              <div key={question.id} className="border-b border-slate-700 pb-4">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="text-white font-medium">{question.title}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <Button
              onClick={handleNext}
              className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-2 rounded-full"
              disabled={!state.answers[currentQuestion?.id]}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
