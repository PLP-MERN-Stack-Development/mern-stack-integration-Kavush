import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import models directly
import User from './models/User.js';
import Category from './models/Category.js';
import Post from './models/Post.js';

dotenv.config();

const setupSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Post.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    console.log('✅ Cleared existing data');

    // Create a user
    const user = await User.create({
      username: 'admin',
      email: 'admin@blog.com',
      password: 'password123'
    });
    console.log('✅ Created user:', user.username);

    // Create categories
    const categories = await Category.create([
      { name: 'Technology', description: 'Posts about technology and innovation' },
      { name: 'Programming', description: 'Posts about programming languages and techniques' },
      { name: 'Web Development', description: 'Posts about web development frameworks and tools' }
    ]);
    console.log('✅ Created categories:', categories.map(c => c.name));

    // Create sample posts
    const posts = await Post.create([
      {
        title: 'Welcome to Our MERN Blog',
        content: 'This is our first blog post on our MERN stack application. We built this using MongoDB, Express, React, and Node.js. This application demonstrates full CRUD operations, RESTful API design, and modern development practices.',
        excerpt: 'Introduction to our MERN stack blog application',
        author: user._id,
        category: categories[0]._id,
        tags: ['mern', 'introduction', 'blog'],
        isPublished: true,
        slug: 'welcome-to-our-mern-blog',
        featuredImage: ''
      },
      {
        title: 'Getting Started with React Hooks',
        content: 'React Hooks revolutionized how we write React components. useState and useEffect are the most commonly used hooks. They make state management and side effects much cleaner in functional components compared to class components.',
        excerpt: 'Learn the basics of React Hooks and modern React development',
        author: user._id,
        category: categories[1]._id,
        tags: ['react', 'hooks', 'javascript', 'frontend'],
        isPublished: true,
        slug: 'getting-started-with-react-hooks',
        featuredImage: ''
      },
      {
        title: 'Building RESTful APIs with Express.js',
        content: 'Express.js makes it easy to build robust RESTful APIs. We cover routing, middleware, error handling, and best practices for API design. Learn how to create scalable and maintainable backend services.',
        excerpt: 'Complete guide to building RESTful APIs with Express.js',
        author: user._id,
        category: categories[2]._id,
        tags: ['express', 'api', 'nodejs', 'backend'],
        isPublished: true,
        slug: 'building-restful-apis-with-express',
        featuredImage: ''
      }
    ]);

    console.log('\n🎉 Sample data setup completed successfully!');
    console.log(`📝 Created ${posts.length} posts`);
    console.log(`📂 Created ${categories.length} categories`);
    console.log(`👤 Created 1 user (admin / password123)`);
    console.log('\n📋 Sample Data Created:');
    posts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title}`);
    });
    
    console.log('\n🌐 Your blog is now ready with sample data!');
    console.log('📍 Frontend: http://localhost:5173/');
    console.log('📍 Backend API: http://localhost:5000/api/posts');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up data:', error.message);
    console.log('💡 Make sure your model files exist in the models folder');
    process.exit(1);
  }
};

setupSampleData();