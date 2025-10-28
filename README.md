# 🚀 MERN Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring modern web development practices and a professional architecture.

---

## ✨ Features

- 📝 Create, read, update, and delete blog posts  
- 🔐 User authentication (register & login)  
- 🏷 Category management  
- 💻 Responsive design  
- 🌐 RESTful API architecture  

---

## 🛠 Tech Stack

**Frontend:** React, CSS  
**Backend:** Node.js, Express, MongoDB, Mongoose  

---

## ⚙️ Installation

### Prerequisites
- Node.js (v14 or higher)  
- MongoDB Atlas account or local MongoDB  
- npm or yarn package manager  

---

## ⚡ Quick Start

### 🖥️ Backend Setup
```bash
cd server
npm install

Create a .env file in the server/ directory and add:
MONGODB_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_secret_key

Run the backend:
npm run dev

💻 Frontend Setup
cd client
npm install
npm start


## 📁 Project Structure
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
│
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
│
└── README.md               # Project documentation

## 📚 API Documentation

### Base URL
http://localhost:5000/api


---

### 🔑 Authentication Endpoints

#### 🧍 Register User
**POST** `/users/register`  
**Request Body:**
```json
{
  "username": "john",
  "email": "john@email.com",
  "password": "password123"
}

🔐 Login User

POST /users/login
Request Body:
{
  "email": "john@email.com",
  "password": "password123"
}

📝 Posts Endpoints
📄 Get All Posts

GET /posts
Query params: ?page=1&limit=10&category=tech

📘 Get Single Post

GET /posts/:id

🆕 Create Post

POST /posts
Request Body:
{
  "title": "Post Title",
  "content": "Post content...",
  "excerpt": "Short description",
  "category": "category_id",
  "tags": ["tech", "web"],
  "isPublished": true
}
✏️ Update Post

PUT /posts/:id

🗑️ Delete Post

DELETE /posts/:id

📂 Categories Endpoints
📚 Get All Categories

GET /categories

➕ Create Category

POST /categories
Request Body:
{
  "name": "Technology",
  "description": "Tech related posts"
}

🗄 Database Models
📘 Post
{
  "title": "String",
  "content": "String",
  "author": "ObjectId",
  "category": "ObjectId",
  "tags": ["String"],
  "isPublished": "Boolean",
  "slug": "String"
}

🏷 Category
{
  "name": "String",
  "description": "String"
}

👤 User
{
  "username": "String",
  "email": "String",
  "password": "String"
}

🧪 Development Scripts
Backend Scripts
npm run dev     # Start development server
npm start       # Start production server
npm test        # Run tests

Frontend Scripts
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests

🚀 Production Deployment
Environment Variables
Add to your .env file:
MONGODB_URI=your_mongodb_atlas_uri
PORT=5000
NODE_ENV=production
JWT_SECRET=your_secret_key

Build Command
npm run build

📋 Response Format
✅ Success
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

❌ Error
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}

🎯 Example Usage (Frontend)
// Get all posts
fetch('/api/posts')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a new post
fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My New Post',
    content: 'Post content...'
  })
});

🤝 Contributing

1.Fork the repository
2.Create your feature branch
git checkout -b feature/AmazingFeature

3.Commit your changes
git commit -m 'Add some AmazingFeature'

4.Push to the branch
git push origin feature/AmazingFeature

5.Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
