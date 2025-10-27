import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const setupViaAPI = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import models after connection
    const User = (await import('./models/User.js')).default;
    const Category = (await import('./models/Category.js')).default;
    const Post = (await import('./models/Post.js')).default;

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
    console.log('✅ Created user: admin');

    // Create categories
    const categories = await Category.create([
      { name: 'Technology', description: 'Technology posts' },
      { name: 'Programming', description: 'Programming posts' },
      { name: 'Web Development', description: 'Web development posts' }
    ]);
    console.log('✅ Created 3 categories');

    // Create sample posts
    const posts = await Post.create([
      {
        title: 'Welcome to MERN Blog',
        content: 'This is our first blog post on the MERN stack application.',
        excerpt: 'Introduction to MERN stack blogging',
        author: user._id,
        category: categories[0]._id,
        tags: ['mern', 'welcome'],
        isPublished: true,
        slug: 'welcome-to-mern-blog'
      },
      {
        title: 'React Development Guide',
        content: 'Learn how to build modern React applications with hooks and context.',
        excerpt: 'Complete React development guide',
        author: user._id,
        category: categories[1]._id,
        tags: ['react', 'javascript'],
        isPublished: true,
        slug: 'react-development-guide'
      }
    ]);

    console.log('\n🎉 Sample data created successfully!');
    console.log(`📝 ${posts.length} posts created`);
    console.log(`📂 ${categories.length} categories created`);
    console.log('👤 User: admin (password: password123)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

setupViaAPI();