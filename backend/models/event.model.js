import mongoose from "mongoose";

const eventSchema =new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        default: "https://s.tmimgcdn.com/scr/800x500/172800/multipurpose-event-management-poster-corporate-identity-template_172847-original.jpg"
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Tech", "Music", "Education", "Sports", "Business"],
    },
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true})

const Event = mongoose.model("Event", eventSchema);
export default Event;