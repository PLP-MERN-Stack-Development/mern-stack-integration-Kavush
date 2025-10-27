**🚀MERN Blog Application
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

📁 Project Structure
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
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
<<<<<<< HEAD

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
Register User
POST /users/register
{
  "username": "john",
  "email": "john@email.com",
  "password": "password123"
}

Login User
POST /users/login
{
  "email": "john@email.com",
  "password": "password123"
}
📝 Posts Endpoints
Get All Posts
GET /posts

Query params: ?page=1&limit=10&category=tech

1. Get Single Post
GET /posts/:id
2. Create Post
POST /posts
{
  "title": "Post Title",
  "content": "Post content...",
  "excerpt": "Short description",
  "category": "category_id",
  "tags": ["tech", "web"],
  "isPublished": true
}
3. Update Post
PUT /posts/:id
{
  "title": "Updated Title",
  "content": "Updated content..."
}
4. Delete Post
DELETE /posts/:id


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
