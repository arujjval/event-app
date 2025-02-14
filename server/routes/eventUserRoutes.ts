import { handleEventUser } from "../controllers";
import { Router } from "express";

const eventUserRouter = Router();

eventUserRouter.post('/eventUser/update', handleEventUser);

export default eventUserRouter;