import React from 'react';

function PostItem({ post }) {
  return (
    <li>
      <h3>{post.title}</h3>
      <p>{post.selftext}</p>
      <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">Read more</a>
    </li>
  );
}

export default PostItem;