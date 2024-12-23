# Event Management System with Task Tracker

A web application for managing events, attendees, and associated tasks. The system provides an intuitive dashboard for event organization, attendee assignments, and task tracking.

---

## Features

### Frontend
1. **Event Management Page**:
   - View all events with options to add, edit, and delete.
   - Each event displays details like name, description, location, and date.
2. **Attendee Management Page**:
   - View a list of attendees.
   - Add or remove attendees.
   - Assign attendees to events or tasks.
3. **Task Tracker Page**:
   - Display tasks linked to events.
   - Update task statuses (Pending/Completed).

### Backend
- RESTful APIs for managing:
  1. **Events**: Create, read, update, and delete events.
  2. **Attendees**: Add, view, and delete attendees.
  3. **Tasks**: Create tasks, fetch tasks for an event, and update task status.

---

## Technology Stack

### Frontend
- **React.js**: Component-based UI development.
- **Redux**: For state management.
- **Axios**: For API integration.
- **Tailwind CSS**: For responsive styling.
- **React Router**: For navigation.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database for data storage.
- **Mongoose**: ODM for MongoDB.

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/event-management-system.git](https://github.com/Namrathakaki987/eventManagement.git)
   cd eventManagement
2. Install dependencies<br><br>
   Backend dependencies
   cd backend
   npm install
   Frontend dependencies
   cd ../frontend
   npm install
   npm install 

4. Set up the environment variables:
   Create a .env file in the backend directory with the following keys<br>
   PORT=5000<br>
   MONGO_URI=your_mongodb_connection_string

5. Start the development servers:
   Backend
   cd backend
   node index.js

   Frontend
   cd ../frontend
   npm start

6. Open the app in your browser at http://localhost:3000.

   
### API Endpoints

Event Management<br>
POST /api/v1/events - Create an event.<br>
GET /api/v1/events - Get all events.<br>
PUT /api/v1/events/:id - Update an event by ID.<br>
DELETE /api/v1/events/:id - Delete an event by ID.<br><br>
Attendee Management<br>
POST /api/v1/attendees - Add an attendee.<br>
GET /api/v1/attendees - Get all attendees.<br>
DELETE /api/v1/attendees/:id - Delete an attendee by ID.<br><br>
Task Management<br>
POST /api/v1/tasks - Create a task.<br>
GET /api/v1/tasks/event/:eventId - Get tasks for an event.<br>
PATCH /api/v1/tasks/:id/status - Update task status.<br>

Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the repository.
Create a new branch for your feature/fix.
Commit your changes and push them to your branch.
Submit a pull request with a description of your changes.
License
This project is licensed under the MIT License.

Contact
For questions or feedback, reach out to:

Name: namrathahkaki@gmail.com<br>
GitHub: https://github.com/Namrathakaki987





