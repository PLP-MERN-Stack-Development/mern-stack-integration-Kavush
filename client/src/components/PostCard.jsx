import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content?.substring(0, 150)}...</p>
      <div className="post-meta">
        <strong>Author:</strong> {post.author?.username || 'Unknown'} | 
        <strong> Category:</strong> {post.category?.name || 'Uncategorized'}
      </div>
    </div>
  );
};

export default PostCard;