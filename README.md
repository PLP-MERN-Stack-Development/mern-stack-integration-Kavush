🚀MERN Blog Application
A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring modern web development practices and professional architecture.

🚀 Features
Features
1. Create, read, update, delete blog posts
2. User authentication
3. Category management
4. Responsive design
5. RESTful API

🛠 Tech Stack
Frontend: React, CSS

Backend: Node.js, Express, MongoDB, Mongoose

📦 Installation
Prerequisites
Node.js (v14 or higher)
MongoDB Atlas account or local MongoDB installation
npm or yarn package manager

⚡ Quick Start
1. Backend Setup
cd server
npm install
# Add .env file with MONGODB_URI
npm run dev

2. Frontend Setup
cd client
npm install
npm start

## 📁 Project Structure
```mern-blog/
├── client/ # React front-end
│ ├── public/ # Static files
│ ├── src/ # React source code
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── services/ # API services
│ │ ├── context/ # React context providers
│ │ └── App.jsx # Main application component
│ └── package.json # Client dependencies
├── server/ # Express.js back-end
│ ├── config/ # Configuration files
│ ├── controllers/ # Route controllers
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── middleware/ # Custom middleware
│ ├── utils/ # Utility functions
│ ├── server.js # Main server file
│ └── package.json # Server dependencies
└── README.md # Project documentation
```


🛠 Development Scripts
1. Backend Scripts
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run test     # Run tests
2. Frontend Scripts
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run eject    # Eject from Create React App

📚 API Documentation
Base URL
http://localhost:5000/api


🔑 Authentication Endpoints
Re## 🔑 Authentication Endpoints

### 🧍 Register User
**Endpoint:**  
```http
POST /users/register
```
Request Body:
{
  "username": "john",
  "email": "john@email.com",
  "password": "password123"
}
🔐 Login User

Endpoint:
POST /users/login
Request Body:
{
  "email": "john@email.com",
  "password": "password123"
}

📝 Posts Endpoints
📄 Get All Posts

Endpoint:
GET /posts


Query params: 
?page=1&limit=10&category=tech

📘 Get Single Post

Endpoint:
GET /posts/:id

🆕 Create Post
Endpoint:
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

Endpoint:
PUT /posts/:id
Request Body:
{
  "title": "Updated Title",
  "content": "Updated content..."
}

🗑️ Delete Post

Endpoint:
DELETE /posts/:id

📂 Categories Endpoints
📚 Get All Categories

Endpoint:
GET /categories

➕ Create Category

Endpoint:
POST /categories

Request Body:
{
  "name": "Technology",
  "description": "Tech related posts"
}

⚡ Quick Setup
🖥️ Backend Setup
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Run development server
npm run dev

💻 Frontend Setup
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the React development server
npm start

3. Seed Sample Data
bash
```cd server
node scripts/seedData.js
```
## 🗄 Database Models

### 📘 Post
```javascript
{
  title: String,
  content: String,
  author: ObjectId,
  category: ObjectId,
  tags: [String],
  isPublished: Boolean,
  slug: String
}
```
🏷 Category
{
  name: String,
  description: String
}

👤 User
{
  username: String,
  email: String,
  password: String
}

🚀 Production Deployment
Environment Variables
Create a .env file in your server/ directory and add:
MONGODB_URI=your_mongodb_atlas_uri
PORT=5000
NODE_ENV=production
JWT_SECRET=your_secret_key

🏗️ Build Commands
# Build client
cd client
npm run build

# Start server (production)
cd ../server
npm start


# Frontend
npm run build
📋 Response Format
Success
json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
Error
json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
🎯 Example Usage
javascript
// Get all posts
fetch('/api/posts')
  .then(res => res.json())
  .then(data => console.log(data));

// Create new post
fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My New Post',
    content: 'Post content...'
  })
});


🚀  Deployment Ready
Set NODE_ENV=production and build frontend for deployment.


🤝 Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
