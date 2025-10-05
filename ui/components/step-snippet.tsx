"use client"
import { useState } from "react"
import { ChevronDown, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useAppDispatch } from "../store"
import { setStepFeedback } from "../store/plan-slice"
import { Button } from "../components/ui/button"

type Step = {
  id: string
  title: string
  detail?: string
  code?: string
  language?: string
  feedback?: "works" | "doesnt-work" | null
}

export default function StepSnippet({
  index,
  step,
  expanded,
  onToggle,
  mode,
}: {
  index: number
  step: Step
  expanded: boolean
  onToggle: () => void
  mode: "planner" | "normal"
}) {
  const dispatch = useAppDispatch()
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    if (!step.code) return
    
    try {
      await navigator.clipboard.writeText(step.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const handleFeedback = (feedback: "works" | "doesnt-work") => {
    const newFeedback = step.feedback === feedback ? null : feedback
    dispatch(setStepFeedback({ stepId: step.id, feedback: newFeedback }))
  }
  return (
    <div className="rounded-md border border-border bg-background">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left"
        aria-expanded={expanded}
      >
        <div>
          <div className="text-sm font-medium">
            {index}. {step.title}
          </div>
          {mode === "planner" && step.detail ? (
            <p className="text-xs text-muted-foreground mt-1">{step.detail}</p>
          ) : null}
        </div>
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Smooth expand/collapse */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${expanded ? "opacity-100" : "opacity-0"}`}
        style={{ maxHeight: expanded ? 600 : 0 }}
      >
        <div className="px-4 pb-4 space-y-4">
          {/* Code Block */}
          <div className="rounded-md border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <span className="text-xs text-muted-foreground">
                Code snippet{step.language ? ` · ${step.language}` : ""}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
                className="h-6 px-2 text-xs"
                disabled={!step.code}
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="max-h-[360px] overflow-auto">
              {step.code ? (
                <SyntaxHighlighter
                  language={step.language || "python"}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    background: "transparent",
                    fontSize: "0.75rem",
                    lineHeight: "1.5",
                  }}
                  showLineNumbers={true}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {step.code}
                </SyntaxHighlighter>
              ) : (
                <div className="p-3 text-xs text-muted-foreground font-mono">
                  // No code provided
                </div>
              )}
            </div>
          </div>

          {/* Evaluation Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Does this code work?</span>
            <div className="flex gap-1">
              <Button
                variant={step.feedback === "works" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeedback("works")}
                className={`h-7 px-3 text-xs ${
                  step.feedback === "works" 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                }`}
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                Works
              </Button>
              <Button
                variant={step.feedback === "doesnt-work" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeedback("doesnt-work")}
                className={`h-7 px-3 text-xs ${
                  step.feedback === "doesnt-work" 
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                }`}
              >
                <ThumbsDown className="h-3 w-3 mr-1" />
                Doesn't work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
