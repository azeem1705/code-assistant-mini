"use client"

import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

export type AgentMode = "planner" | "normal"

export type Step = {
  id: string
  title: string
  detail?: string
  code?: string
  language?: string
  feedback?: "works" | "doesnt-work" | null
}

type ServerStatus = "idle" | "live" | "mocked"

type PlanState = {
  task: string
  mode: AgentMode
  steps: Step[]
  expanded: Record<string, boolean>
  loading: boolean
  error: string | null
  serverStatus: ServerStatus
}

const initialState: PlanState = {
  task: "",
  mode: "planner",
  steps: [],
  expanded: {},
  loading: false,
  error: null,
  serverStatus: "idle",
}

// Transform API response to Step format
function transformApiResponse(apiData: any, mode: AgentMode): Step[] {
  if (mode === "normal") {
    // For normal mode, create a single step with the code
    return [
      {
        id: "direct-code",
        title: "Generated Code",
        code: Array.isArray(apiData.code) ? apiData.code.join('\n') : apiData.code || "",
        language: "python", // Default language, could be enhanced to detect from code
      },
    ]
  } else {
    // For planner mode, create steps from plan array
    const steps: Step[] = []
    const planArray = apiData.plan || []
    const codeArray = apiData.code || []

    planArray.forEach((planItem: string, index: number) => {
      steps.push({
        id: `step-${index + 1}`,
        title: planItem,
        code: Array.isArray(codeArray) ? codeArray.join('\n') : codeArray || "",
        language: "python", // Default language, could be enhanced
      })
    })

    return steps
  }
}

// Helper to mock plan if external server is unavailable
function buildMockPlan(task: string, mode: AgentMode) {
  const sampleTask = task || "Build a todo UI that consumes an external REST API"

  if (mode === "normal") {
    // Mock normal mode response
    const mockApiResponse = {
      code: [
        "from flask import Flask, jsonify, request",
        "from flask_sqlalchemy import SQLAlchemy",
        "app = Flask(__name__)",
        "app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'",
        "db = SQLAlchemy(app)",
        "",
        "class Vendor(db.Model):",
        "    id = db.Column(db.Integer, primary_key=True)",
        "    name = db.Column(db.String(100), nullable=False)",
        "",
        "if __name__ == '__main__':",
        "    app.run(debug=True)"
      ]
    }

    return {
      mode,
      steps: transformApiResponse(mockApiResponse, mode),
    }
  }

  // Mock planner mode response
  const mockApiResponse = {
    plan: [
      "Step 1: Plan the database schema for the ecommerce application, including tables for products, vendors, customers, and orders",
      "Step 2: Design the frontend of the application, including user registration, login, product browsing, and checkout functionality",
      "Step 3: Implement the backend of the application, including user authentication, product management, and order processing",
      "Step 4: Develop the multi-vendor system, allowing vendors to create and manage their own products and inventory",
      "Step 5: Implement payment gateway integration for secure transactions",
      "Step 6: Test and deploy the application, ensuring scalability and security"
    ],
    code: [
      "# Import necessary libraries and frameworks",
      "from flask import Flask, request, jsonify",
      "from flask_sqlalchemy import SQLAlchemy",
      "from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required",
      "",
      "# Create the Flask application and configure the database",
      "app = Flask(__name__)",
      "app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'",
      "db = SQLAlchemy(app)",
      "",
      "# Define the database models for products, vendors, customers, and orders",
      "class Product(db.Model):",
      "    id = db.Column(db.Integer, primary_key=True)",
      "    name = db.Column(db.String(100), nullable=False)",
      "    price = db.Column(db.Float, nullable=False)",
      "    vendor_id = db.Column(db.Integer, db.ForeignKey('vendor.id'))",
      "",
      "class Vendor(db.Model):",
      "    id = db.Column(db.Integer, primary_key=True)",
      "    name = db.Column(db.String(100), nullable=False)",
      "    products = db.relationship('Product', backref='vendor', lazy=True)",
      "",
      "if __name__ == '__main__':",
      "    app.run(debug=True)"
    ]
  }

  return {
    mode,
    steps: transformApiResponse(mockApiResponse, mode),
  }
}

export const generatePlan = createAsyncThunk(
  "plan/generate",
  async ({ task, mode }: { task: string; mode: AgentMode }) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_PLAN_API_URL || "http://localhost:8000/api/v1/planner"
      const res = await axios.post(API_URL, { task, mode }, { timeout: 3500 })
      
      // Handle the new API response structure
      if (res.data.success && res.data.statusCode === 200) {
        const steps = transformApiResponse(res.data.data, mode)
        return { data: { steps }, serverStatus: "live" as const }
      } else {
        throw new Error("API returned unsuccessful response")
      }
    } catch (_err) {
      const data = buildMockPlan(task, mode)
      return { data, serverStatus: "mocked" as const }
    }
  },
)

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setTask(state, action: PayloadAction<string>) {
      state.task = action.payload
    },
    setMode(state, action: PayloadAction<AgentMode>) {
      state.mode = action.payload
    },
    toggleStepExpanded(state, action: PayloadAction<string>) {
      const id = action.payload
      state.expanded[id] = !state.expanded[id]
    },
    expandAll(state) {
      for (const s of state.steps) state.expanded[s.id] = true
    },
    collapseAll(state) {
      for (const s of state.steps) state.expanded[s.id] = false
    },
    setStepFeedback(state, action: PayloadAction<{ stepId: string; feedback: "works" | "doesnt-work" | null }>) {
      const step = state.steps.find(s => s.id === action.payload.stepId)
      if (step) {
        step.feedback = action.payload.feedback
      }
    },
    clear(state) {
      state.steps = []
      state.expanded = {}
      state.error = null
      state.loading = false
      state.serverStatus = "idle"
    },
  },
  extraReducers(builder) {
    builder
      .addCase(generatePlan.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(generatePlan.fulfilled, (state, action) => {
        state.loading = false
        state.steps = action.payload.data.steps || []
        // Reset expanded map
        state.expanded = {}
        for (const s of state.steps) state.expanded[s.id] = false
        state.serverStatus = action.payload.serverStatus
      })
      .addCase(generatePlan.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to generate plan"
      })
  },
})

export const { setTask, setMode, toggleStepExpanded, expandAll, collapseAll, setStepFeedback, clear } = planSlice.actions

export default planSlice.reducer

// Selectors
export const selectTask = (s: { plan: PlanState }) => s.plan.task
export const selectMode = (s: { plan: PlanState }) => s.plan.mode
export const selectLoading = (s: { plan: PlanState }) => s.plan.loading
export const selectError = (s: { plan: PlanState }) => s.plan.error
export const selectSteps = (s: { plan: PlanState }) => s.plan.steps
export const selectExpanded = (s: { plan: PlanState }) => s.plan.expanded
export const selectServerStatus = (s: { plan: PlanState }) => s.plan.serverStatus
export const selectHasSteps = (s: { plan: PlanState }) => s.plan.steps.length > 0
