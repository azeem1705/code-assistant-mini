import { Groq } from 'groq-sdk';
import { SuccessResponse, ErrorResponse } from '../utils/response';
import { AppValidationError } from '../utils/errors';
import { PlannerInput } from '../models/dto/planInput';

export class PlannerService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  async generatePlan(body: PlannerInput) {
    try {
      // Validate input
      const validationErrors = await AppValidationError(body);
      if (validationErrors) {
        return ErrorResponse(400, validationErrors);
      }

      const prompt = this.buildPrompt(body.task, body.mode);

      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful coding assistant. Always return valid JSON only. For code, provide it as an array of strings where each element is one line of code."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      const aiContent = chatCompletion.choices[0]?.message?.content;
      if (!aiContent) {
        return ErrorResponse(500, 'No content received from Groq');
      }

      const result = this.parseJsonResponse(aiContent);

      // Ensure code is always an array of strings for consistent UI rendering
      if (result.code) {
        if (typeof result.code === "string") {
          result.code = result.code.split("\n");
        }
        // If it's already an array, keep it as is
      }

      return SuccessResponse(result);
    } catch (err) {
      console.error('Error generating plan:', err);
      return ErrorResponse(500, 'Internal server error');
    }
  }

  private buildPrompt(task: string, mode: string): string {
    if (mode === "planner") {
      return `Task: ${task}.
First, break this task into 3-7 actionable steps. Then provide the complete, working code solution.
Return only JSON: { "plan": ["step1", "step2", ...], "code": ["line1", "line2", ...] } or { "plan": [...], "code": "code string" }`;
    } else {
      return `Task: ${task}.
Provide only the essential code snippet for this task, not a full application.
Return only JSON: { "code": ["line1", "line2", ...] } or { "code": "code string" }`;
    }
  }

  private parseJsonResponse(content: string): any {
    try {
      // Remove any potential markdown code blocks
      const cleanedContent = content.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanedContent);
    } catch (error) {
      // If direct parsing fails, try to extract JSON from the content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response from Groq');
    }
  }
}