import  mongoose  from "mongoose";
const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
});

export const Task = mongoose.model('Task', taskSchema);



