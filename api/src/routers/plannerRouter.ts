// filepath: c:\Users\Dell\Desktop\Desktop\mern-poc\traycer-mvp\api\src\routers\plannerRouter.ts
import { Request, Response, NextFunction, Router } from 'express';
import { PlannerService } from '../services/plannerService';

/**
 * @swagger
 * /planner:
 *   post:
 *     summary: Generate a plan or code snippet using Groq LLM
 *     tags: [Planner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlannerInput'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const PlannerRouter = (app: Router) => {
  const service = new PlannerService();

  app.post('/planner', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await service.generatePlan(req.body);
      res.status(data.statusCode).send(data);
    } catch (err) {
      next(err);
    }
  });
};