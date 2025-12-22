# API Documentation - Smart Task Management System

All API requests that require authentication should include the header:
Authorization: Bearer <JWT_TOKEN>

yaml
Copy code

---

## Auth APIs

### Register User
**POST** `/api/auth/register`  
**Body:**
```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
Success Response: 201

json
Copy code
{
  "message": "User registered successfully",
  "user": { "id": "abc123", "username": "John", "email": "john@example.com" },
  "token": "JWT_TOKEN"
}
Login User
POST /api/auth/login
Body:

json
Copy code
{
  "email": "john@example.com",
  "password": "123456"
}
Success Response: 200

json
Copy code
{
  "message": "Login successful",
  "user": { "id": "abc123", "username": "John", "email": "john@example.com" },
  "token": "JWT_TOKEN"
}
Get Profile
GET /api/auth/profile
Success Response: 200

json
Copy code
{
  "user": { "id": "abc123", "username": "John", "email": "john@example.com" }
}
Task APIs (Protected)
Create Task
POST /api/tasks
Body:

json
Copy code
{
  "title": "Daily Meeting",
  "description": "Team standup",
  "priority": "High"
}
Success Response: 201

json
Copy code
{
  "message": "Task created successfully",
  "task": { "title": "Daily Meeting", "description": "Team standup", "priority": "High", "status": "In Progress" }
}
Get All Tasks
GET /api/tasks
Query Params (optional):

status – filter by status

search – search by title

Success Response: 200

json
Copy code
{
  "tasks": [ ... ]
}
Get Task by ID
GET /api/tasks/:id
Success Response: 200

json
Copy code
{
  "task": { ... }
}
Update Task
PUT /api/tasks/:id
Body (any field to update):

json
Copy code
{
  "title": "Updated Task",
  "status": "In Progress",
  "priority": "Medium"
}
Success Response: 200

json
Copy code
{
  "message": "Task updated successfully",
  "task": { ... }
}
Delete Task
DELETE /api/tasks/:id
Success Response: 200

json
Copy code
{
  "message": "Task deleted successfully",
  "task": { ... }
}