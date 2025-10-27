import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search term
    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.author?.username && post.author.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.category?.name && post.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/posts');
      setPosts(response.data.data);
      setFilteredPosts(response.data.data);
      setError('');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRefresh = () => {
    fetchPosts();
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          {error}
          <button 
            onClick={handleRefresh}
            style={{
              marginLeft: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1>Blog Posts</h1>
            <p>Discover our latest articles and tutorials</p>
          </div>
          
          <Link to="/create-post" className="btn">
            Create New Post
          </Link>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search posts by title, content, author, or category..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Results Info */}
        <div style={{ 
          marginBottom: '1rem',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          {searchTerm ? (
            <p>
              Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} 
              matching "{searchTerm}"
              <button 
                onClick={() => setSearchTerm('')}
                style={{
                  marginLeft: '1rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'transparent',
                  color: '#3498db',
                  border: '1px solid #3498db',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Clear Search
              </button>
            </p>
          ) : (
            <p>Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '2px dashed #dee2e6'
          }}>
            {searchTerm ? (
              <>
                <h3 style={{ color: '#6c757d', marginBottom: '1rem' }}>
                  No posts found
                </h3>
                <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
                  No posts match your search for "{searchTerm}". Try different keywords.
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="btn"
                >
                  View All Posts
                </button>
              </>
            ) : (
              <>
                <h3 style={{ color: '#6c757d', marginBottom: '1rem' }}>
                  No posts yet
                </h3>
                <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
                  Be the first to create a post and share your knowledge with the community!
                </p>
                <Link to="/create-post" className="btn">
                  Create Your First Post
                </Link>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {filteredPosts.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Load More Button (for future pagination) */}
            {posts.length > 6 && (
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button
                  onClick={handleRefresh}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: 'transparent',
                    color: '#3498db',
                    border: '2px solid #3498db',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#3498db';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#3498db';
                  }}
                >
                  Load More Posts
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;