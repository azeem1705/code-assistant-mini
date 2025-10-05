"use client"
import { Provider } from "react-redux"
import { store } from "../store"
import InputBox from "../components/input-box"
import PlanView from "../components/plan-view"

export default function Page() {
  return (
    <Provider store={store}>
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border">
          <div className="mx-auto max-w-3xl p-6">
            <h1 className="text-2xl font-semibold text-balance">Traycer MVP</h1>
            <p className="text-muted-foreground mt-1 text-pretty">
              Generate an actionable plan and code from your task. Planner Agent shows plan then code. Normal Agent
              shows direct code.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-3xl p-6">
          <InputBox />
          <div className="mt-8">
            <PlanView />
          </div>
        </section>
      </main>
    </Provider>
  )
}
