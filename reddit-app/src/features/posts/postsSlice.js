import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubredditPosts, searchPosts } from '../api/redditAPI';   // Assume this is your API fetching utility


// Define the initial state
const initialState = {
    posts: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };
  
// Async thunk for fetching posts from a subreddit
export const fetchPosts = createAsyncThunk('posts/fetchSubredditPosts', async (subreddit, { rejectWithValue }) => {
    try {
        const posts = await fetchSubredditPosts(subreddit);
        return posts;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Optional: Async thunk for searching posts
export const searchForPosts = createAsyncThunk('posts/searchPosts', async (query, { rejectWithValue }) => {
    try {
        const results = await searchPosts(query);
        return results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
  
  // Create slice
  const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      // Reducers for other synchronous actions can be added here
      clearPosts(state) {
        state.posts = [];
        state.status = 'idle';
        state.error = null;
      }
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
        })
        .addCase(searchForPosts.pending, (state, action) => {
            state.status = 'loading';
          })
        .addCase(searchForPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Add fetched posts to the array
            state.posts = action.payload;
          })
        .addCase(searchForPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
    },
  });
  
  // Export the reducers and async actions
  export const { clearPosts } = postsSlice.actions;
  export default postsSlice.reducer;