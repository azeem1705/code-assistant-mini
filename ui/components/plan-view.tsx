"use client"
import { useAppDispatch, useAppSelector } from "../store"
import {
  selectLoading,
  selectError,
  selectSteps,
  selectExpanded,
  toggleStepExpanded,
  expandAll,
  collapseAll,
  selectServerStatus,
  selectMode,
} from "../store/plan-slice"
import StepSnippet from "./step-snippet"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"

export default function PlanView() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const steps = useAppSelector(selectSteps)
  const expanded = useAppSelector(selectExpanded)
  const serverStatus = useAppSelector(selectServerStatus)
  const mode = useAppSelector(selectMode)

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="animate-pulse text-sm text-muted-foreground">Generating…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive text-destructive-foreground bg-card p-6">
        <p className="text-sm">Error: {error}</p>
      </div>
    )
  }

  if (!steps.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">No plan yet. Enter a task above to generate one.</p>
      </div>
    )
  }

  // Calculate feedback statistics
  const feedbackStats = steps.reduce((acc, step) => {
    if (step.feedback === "works") acc.works++
    else if (step.feedback === "doesnt-work") acc.doesntWork++
    else acc.notEvaluated++
    return acc
  }, { works: 0, doesntWork: 0, notEvaluated: 0 })

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className={cn("text-sm", serverStatus === "mocked" ? "text-amber-600" : "text-muted-foreground")}>
            {serverStatus === "live" ? "Data fetched from external API." : "External API unreachable. Using mocked data."}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => dispatch(expandAll())}>
              Expand all
            </Button>
            <Button variant="secondary" onClick={() => dispatch(collapseAll())}>
              Collapse all
            </Button>
          </div>
        </div>
        
        {/* Feedback Summary */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Evaluation Status:</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>{feedbackStats.works} Works</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>{feedbackStats.doesntWork} Issues</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span>{feedbackStats.notEvaluated} Not Evaluated</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-border">
        {steps.map((s, idx) => (
          <li key={s.id} className="p-4">
            <StepSnippet
              index={idx + 1}
              step={s}
              expanded={!!expanded[s.id]}
              onToggle={() => dispatch(toggleStepExpanded(s.id))}
              mode={mode}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
