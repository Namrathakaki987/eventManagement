import  mongoose  from "mongoose";

const attendeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

export const Attendee = mongoose.model('Attendee', attendeeSchema);
