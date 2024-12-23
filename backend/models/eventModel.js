import  mongoose  from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }],
});

export const Event = mongoose.model('Event', eventSchema);




