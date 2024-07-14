import React from 'react';
import Post from './Post';  // You will need to create this component

function PostList({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default PostList;