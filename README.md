Event Management System 

A web application for managing events, attendees, and associated tasks. The system provides an intuitive dashboard for event organization, attendee assignments, and task tracking.

Features

1. Event Management Page:
   - View all events with options to add, edit, and delete.
   - Each event displays details like name, description, location, and date.
2. Attendee Management Page:
   - View a list of attendees.
   - Add or remove attendees.
3. Task Tracker Page**:
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
   git clone https://github.com/yourusername/event-management-system.git
   cd event-management-system
