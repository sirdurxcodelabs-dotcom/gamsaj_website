import axios from 'axios';

const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL || 'https://gamsaj-api.onrender.com/api';
  return url.endsWith('/api') ? url : url.replace(/\/$/, '') + '/api';
})();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact form submission
export const submitContactForm = async (data: {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  reasonForContact?: string;
}) => {
  try {
    const response = await api.post('/connections/contact', data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to submit contact form',
    };
  }
};

// Newsletter subscription
export const subscribeNewsletter = async (email: string) => {
  try {
    const response = await api.post('/connections/subscribe', { email });
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to subscribe',
    };
  }
};

// Blog API functions
export const blogAPI = {
  // Get all published blogs — returns { blogs, pagination } or [] on error
  getBlogs: async (params: Record<string, any> = {}) => {
    try {
      // Build query string manually to handle all value types correctly
      const query = new URLSearchParams();
      // Always filter published for public website
      query.set('status', 'published');
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'status') {
          query.set(key, String(value));
        }
      });

      const response = await api.get(`/blogs?${query.toString()}`);
      const data = response.data;

      if (data.success) {
        return { blogs: data.data, pagination: data.pagination };
      }
      return { blogs: [], pagination: null };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return { blogs: [], pagination: null };
    }
  },

  // Get single blog by slug
  getBlogBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/blogs/slug/${slug}`);
      const data = response.data;
      if (data.success) return data.data;
      return null;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },

  // Get single blog by ID
  getBlog: async (id: string) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      const data = response.data;
      if (data.success) return data.data;
      return null;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },

  // Add comment to blog
  addComment: async (id: string, commentData: { author: string; email: string; content: string }) => {
    try {
      const response = await api.post(`/blogs/${id}/comments`, commentData);
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      return { success: false, message: 'Failed to add comment' };
    }
  },

  // Add reaction to comment
  addCommentReaction: async (blogId: string, commentId: string, reaction: string) => {
    try {
      const response = await api.post(`/blogs/${blogId}/comments/${commentId}/reactions`, { reaction });
      return response.data;
    } catch (error) {
      console.error('Error adding comment reaction:', error);
      return { success: false, message: 'Failed to add reaction' };
    }
  },

  // Remove reaction from comment
  removeCommentReaction: async (blogId: string, commentId: string) => {
    try {
      const response = await api.delete(`/blogs/${blogId}/comments/${commentId}/reactions`);
      return response.data;
    } catch (error) {
      console.error('Error removing comment reaction:', error);
      return { success: false, message: 'Failed to remove reaction' };
    }
  },
};

export default api;
