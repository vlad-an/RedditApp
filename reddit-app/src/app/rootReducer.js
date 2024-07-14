import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import searchReducer from '../features/search/searchSlice';

// Combine all feature reducers into a single root reducer
const rootReducer = combineReducers({
    // Each property here will hold its respective slice of state
    posts: postsReducer,
    comments: commentsReducer,
    search: searchReducer,
    // Add other feature reducers here as your app grows
  });
  
  export default rootReducer;