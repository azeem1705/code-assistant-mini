# Traycer MVP (Frontend)

A Next.js 14 App Router frontend using TypeScript, TailwindCSS, Redux Toolkit, and Axios.  
It generates a step-by-step plan and code snippets for a given task.  
Planner Agent shows plan first, then code. Normal Agent shows direct code.

## Features
- Task input and agent toggle (Planner / Normal)
- Axios call to an external Node.js server at http://localhost:5000/api/plan
- Mock fallback if the server is unreachable (clearly indicated in the UI)
- Expandable steps with smooth transitions
- Download project skeleton as a zip (JSZip)

## Running the Frontend
- Open the preview in v0. No extra setup is needed; dependencies are inferred from imports.
- To see live data instead of mocks, run your own Node server responding at POST http://localhost:5000/api/plan with `{ steps: [...] }`.

## Notes
- This project intentionally calls an external Node.js server to showcase the expected integration.  
- If unreachable, the UI will show a banner and load mock data so you can still demo the flow.
