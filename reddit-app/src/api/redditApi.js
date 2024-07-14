const BASE_URL = 'https://www.reddit.com';

// Function to fetch posts from a specific subreddit
export async function fetchSubredditPosts(subreddit, limit = 25) {
    const endpoint = `${BASE_URL}/r/${subreddit}/.json?limit=${limit}`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Reddit API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data.children.map(child => child.data);
    } catch (error) {
        console.error("Failed to fetch subreddit posts:", error);
        throw error;
    }
}

// Function to search for posts based on a query
export async function searchPosts(query) {
    const params = new URLSearchParams({
        q: query,
        limit: 25, // You can adjust the number of results
        sort: 'relevance' // Sorting method: relevance, hot, top, new
    });
    const endpoint = `${BASE_URL}/search.json?${params}`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Reddit API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data.children.map(child => child.data);
    } catch (error) {
        console.error("Failed to search posts:", error);
        throw error;
    }
}
