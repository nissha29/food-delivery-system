# Food Delivery System

A full-stack food delivery application built with MERN stack (MongoDB, Express.js, React, Node.js) that allows users to browse menus, place orders, and administrators to manage menu items and track orders.

## Features

- User Authentication (Login/Register)
- Menu Management (CRUD operations)
- Cart Functionality
- Responsive Design for both Desktop and Mobile
- Admin Dashboard for Menu Management

## Demo

- Frontend: [Live Demo](https://foodie-express-seven.vercel.app/)
- Backend: [API Endpoint](https://food-delivery-system-63pp.onrender.com/)

## Admin Access
Use these credentials to access the admin dashboard:
- Username: ```nisha```
- Password: ```nisha123```

## Tech Stack

### Frontend
- React (Vite)
- React Context for State Management
- Tailwind CSS for Styling
- Axios for API Integration

### Backend
- Node.js
- Express.js
- MongoDB for Database
- JWT for Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

## Installation

1. Clone the repository:
```
git clone https://github.com/nissha29/food-delivery-system.git
cd food-delivery-system
```
2. Install Backend Dependencies:
```
cd backend
npm install
```
3. Configure Environment Variables:
Create a .env file in the backend directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
4. Install Frontend Dependencies:
```
cd ../frontend
npm install
```
5. Configure Frontend Environment:
```
VITE_API_URL=http://localhost:5000
```
Running Locally

1. Start the Backend Server:
```
cd backend
npm run dev
```
2. Start the Frontend Development Server:
```
cd frontend
npm run dev
```
## API Endpoints

Authentication

```POST /api/auth/register``` - Register new user  
```POST /api/auth/login``` - Login user

Menu

```GET /api/menu``` - Get all menu items  
```POST /api/menu``` - Add new menu item (Admin only)  
```PUT /api/menu/:id``` - Update menu item (Admin only)  
```DELETE /api/menu/:id``` - Delete menu item (Admin only)  

Orders

```POST /api/orders``` - Place new order  
```GET /api/orders``` - Get user's orders  

## Deployment
Frontend (Vercel)  
Backend (Render)
