import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostsFromApi } from '../api/redditApi';  // Assume this is your API fetching utility


// Define the initial state
const initialState = {
    posts: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };
  
  // Async thunk for fetching posts
  export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetchPostsFromApi();  // Fetch posts using an API utility
    return response.data;  // Return posts data
  });
  
  // Create slice
  const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      // Reducers for other synchronous actions can be added here
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Add fetched posts to the array
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  // Export the reducers and async actions
  export default postsSlice.reducer;