"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface AssessmentState {
  currentStep: number
  answers: Record<string, any>
  isCompleted: boolean
  reportData: any
}

type AssessmentAction =
  | { type: "SET_ANSWER"; payload: { questionId: string; answer: any } }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_STEP"; payload: number }
  | { type: "COMPLETE_ASSESSMENT" }
  | { type: "GENERATE_REPORT"; payload: any }

const initialState: AssessmentState = {
  currentStep: 0,
  answers: {},
  isCompleted: false,
  reportData: null,
}

const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      }
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      }
    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
      }
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }
    case "COMPLETE_ASSESSMENT":
      return {
        ...state,
        isCompleted: true,
      }
    case "GENERATE_REPORT":
      return {
        ...state,
        reportData: action.payload,
      }
    default:
      return state
  }
}

const AssessmentContext = createContext<{
  state: AssessmentState
  dispatch: React.Dispatch<AssessmentAction>
} | null>(null)

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState)

  return <AssessmentContext.Provider value={{ state, dispatch }}>{children}</AssessmentContext.Provider>
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error("useAssessment must be used within AssessmentProvider")
  }
  return context
}
