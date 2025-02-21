import { createEvent, updateEventStatus, getLatestEvents, getEventById } from "../controllers";
import { Router } from "express";

const eventRouter = Router();

eventRouter.post('/event/create', createEvent);
eventRouter.post('/event/update-status', updateEventStatus);
eventRouter.get('/event/latest', getLatestEvents);
eventRouter.get('/event/:id', getEventById);

export default eventRouter;