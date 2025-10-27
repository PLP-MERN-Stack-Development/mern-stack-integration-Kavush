import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h1>MERN Blog</h1>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/create-post">Create Post</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;