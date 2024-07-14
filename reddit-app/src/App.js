import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/postsSlice';
import PostList from './components/PostList';  // You will need to create this component

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts('popular'));  // Fetch popular posts on component mount
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Reddit Posts</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && <PostList posts={posts} />}
    </div>
  );
}

export default App;