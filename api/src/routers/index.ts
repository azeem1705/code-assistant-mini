import  express  from 'express';
import { handleError } from '../utils/errorHandleMiddle';
import { PlannerRouter } from './plannerRouter';

export const ExpressApp = async (app: express.Express) : Promise<void> => {
const router = express.Router();

PlannerRouter(router);
app.use("/api/v1", router);

app.use(handleError)
}