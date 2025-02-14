import { createEvent, updateEventStatus } from "../controllers";
import { Router } from "express";

const eventRouter = Router();

eventRouter.post('/event/create', createEvent);
eventRouter.post('/event/update-status', updateEventStatus);

export default eventRouter;