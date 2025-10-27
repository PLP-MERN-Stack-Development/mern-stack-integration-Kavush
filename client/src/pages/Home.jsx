import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Welcome to MERN Blog</h1>
          <p>A full-stack blog application built with MongoDB, Express, React, and Node.js</p>
          <Link to="/posts" className="btn">View All Posts</Link>
        </div>
      </section>
      
      <div className="container">
        <section style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h2>About This Project</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto' }}>
            This is a complete MERN stack application demonstrating full CRUD operations, 
            RESTful API design, and modern React development practices.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;