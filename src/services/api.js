import axios from 'axios';

const API_URL = 'https://dev.codeleap.co.uk/careers/';

// For likes and comments, we would typically need a proper backend endpoint.
// Since the provided API doesn't have these endpoints, we'll simulate them
// by storing data in localStorage for this demo.

// Initialize social features data in localStorage if it doesn't exist
const initSocialFeaturesStorage = () => {
  if (!localStorage.getItem('socialFeatures')) {
    localStorage.setItem('socialFeatures', JSON.stringify({
      likes: {},   // Structure: { postId: { count: 0, likedBy: [] } }
      comments: {} // Structure: { postId: [{ username, content, created_datetime }] }
    }));
  }
  return JSON.parse(localStorage.getItem('socialFeatures'));
};

// Save social features data back to localStorage
const saveSocialFeatures = (data) => {
  localStorage.setItem('socialFeatures', JSON.stringify(data));
};

const api = {
  getPosts: async () => {
    try {
      const response = await axios.get(API_URL);
      const socialData = initSocialFeaturesStorage();
      
      // Enhance posts with social features data
      const enhancedResults = response.data.results.map(post => {
        const postLikes = socialData.likes[post.id] || { count: 0, likedBy: [] };
        const postComments = socialData.comments[post.id] || [];
        
        return {
          ...post,
          likes: postLikes.count,
          likedBy: postLikes.likedBy,
          comments: postComments
        };
      });
      
      return {
        ...response.data,
        results: enhancedResults
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  
  createPost: async (postData) => {
    try {
      const response = await axios.post(API_URL, postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  
  updatePost: async (id, postData) => {
    try {
      const response = await axios.patch(`${API_URL}${id}/`, postData);
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },
  
  deletePost: async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      
      // Clean up social features data for the deleted post
      const socialData = initSocialFeaturesStorage();
      if (socialData.likes[id]) delete socialData.likes[id];
      if (socialData.comments[id]) delete socialData.comments[id];
      saveSocialFeatures(socialData);
      
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
  
  // Like/unlike a post (toggle)
  toggleLike: async (postId, isLiking) => {
    try {
      const username = localStorage.getItem('username');
      if (!username) throw new Error('User not logged in');
      
      const socialData = initSocialFeaturesStorage();
      
      // Initialize post likes if it doesn't exist
      if (!socialData.likes[postId]) {
        socialData.likes[postId] = { count: 0, likedBy: [] };
      }
      
      const postLikes = socialData.likes[postId];
      const hasLiked = postLikes.likedBy.includes(username);
      
      // Toggle like status
      if (isLiking && !hasLiked) {
        postLikes.count += 1;
        postLikes.likedBy.push(username);
      } else if (!isLiking && hasLiked) {
        postLikes.count = Math.max(0, postLikes.count - 1);
        postLikes.likedBy = postLikes.likedBy.filter(user => user !== username);
      }
      
      socialData.likes[postId] = postLikes;
      saveSocialFeatures(socialData);
      
      return { success: true, likes: postLikes.count, likedBy: postLikes.likedBy };
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },
  
  // Add a comment to a post
  addComment: async (postId, commentData) => {
    try {
      if (!commentData.username || !commentData.content) {
        throw new Error('Username and comment content are required');
      }
      
      const socialData = initSocialFeaturesStorage();
      
      // Initialize post comments if it doesn't exist
      if (!socialData.comments[postId]) {
        socialData.comments[postId] = [];
      }
      
      const newComment = {
        ...commentData,
        created_datetime: new Date().toISOString()
      };
      
      socialData.comments[postId].push(newComment);
      saveSocialFeatures(socialData);
      
      return { success: true, comment: newComment };
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }
};

export default api;
