import express from "express";
import { createEvents, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/event.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const eventRouter = express.Router()

eventRouter.post('/create', verifyToken, createEvents)
eventRouter.get('/get', getEvents)
eventRouter.get('/get/:id', getEventById)
eventRouter.post('/update/:id', verifyToken, updateEvent)
eventRouter.delete('/delete/:id', verifyToken, deleteEvent)

export default eventRouter