import { errorHandler } from "../middlewares/error.js"
import Event from "../models/event.model.js"


export const createEvents = async (req, resp, next) => {
    try {
        const event = await Event.create(req.body)
        if (!event) next(errorHandler(400, "Error creating event"));
        resp.status(200).json(event)
    } catch (error) {
        next(error)
    }
}

export const getEvents = async (req, resp, next) => {
    try {
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const events = await Event.find().sort({ [sort]: order })
        if (!events) next(errorHandler(400, "Error getting events"));
        resp.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export const getEventById = async (req, resp, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) next(errorHandler(400, "Error getting event by id"));
        resp.status(200).json(event);
    } catch (error) {
        next(error);
    }
}

export const updateEvent = async (req, resp, next) => {
    const event = await Event.findById(req.params.id);
    if (!event) next(errorHandler(400, "Error getting event by id: updateEvent"));
    if (req.user.userId != event.organizerId) next(errorHandler(403, "You do not have permission to perform this action"));

    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) next(errorHandler(401, "Error while updating event"));
        resp.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
}

export const deleteEvent = async (req, resp, next) => {
    const event = await Event.findById(req.params.id);
    if (!event) next(errorHandler(400, "Error getting event by id: updateEvent"));
    if (req.user.userId != event.organizerId) next(errorHandler(403, "You do not have permission to perform this action"));

    try {
        await Event.findByIdAndDelete(req.params.id);
        resp.status(200).json("Event has been deleted");
    } catch (error) {
        next(error)
    }
}

export const attendEvent = async (req, resp, next) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { attendees: req.user.userId } },
            { new: true }
        );
        if (!updatedEvent) {
            return next(errorHandler(400, "Event not found"));
        }
        const io = req.app.get('io');
        io.to(req.params.id).emit("attendeeCountUpdate", {
            eventId: req.params.id,
            count: updatedEvent.attendees.length,
        });
        resp.status(200).json({ success: true, event: updatedEvent });
    } catch (error) {
        next(error);
    }
};