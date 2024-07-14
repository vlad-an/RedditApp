// Base URL for Reddit's JSON API
const BASE_URL = 'https://www.reddit.com';

// Function to fetch posts from a specific subreddit
export async function fetchPostsFromSubreddit(subreddit = 'popular') {
    const url = `${BASE_URL}/r/${subreddit}.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const json = await response.json();
        return json.data.children.map(post => post.data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

// Function to fetch search results
export async function fetchSearchResults(query) {
    const params = new URLSearchParams({ q: query });
    const url = `${BASE_URL}/search.json?${params.toString()}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch search results: ${response.status}`);
        }
        const json = await response.json();
        return json.data.children.map(post => post.data);
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw error;
    }
}