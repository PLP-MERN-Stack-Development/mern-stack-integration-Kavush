import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data.data);
      setError('');
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="container"><div className="error">{error}</div></div>;
  if (!post) return <div className="container"><div className="error">Post not found</div></div>;

  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <Link to="/posts" style={{ color: '#3498db', textDecoration: 'none' }}>
          ← Back to Posts
        </Link>
        <article style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.title}</h1>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              By {post.author?.username || 'Unknown'} • 
              {new Date(post.createdAt).toLocaleDateString()} • 
              Category: {post.category?.name || 'Uncategorized'}
            </div>
          </header>
          <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
};

export default SinglePost;