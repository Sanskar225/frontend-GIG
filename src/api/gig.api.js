import axios from './axios';

export const gigAPI = {
  getAllGigs: async (params = {}) => {
    const response = await axios.get('/gigs', { params });
    return response.data;
  },

  getGigById: async (id) => {
    const response = await axios.get(`/gigs/${id}`);
    return response.data;
  },

  createGig: async (gigData) => {
    const response = await axios.post('/gigs', gigData);
    return response.data;
  },

  updateGig: async (id, gigData) => {
    const response = await axios.patch(`/gigs/${id}`, gigData);
    return response.data;
  },

  deleteGig: async (id) => {
    const response = await axios.delete(`/gigs/${id}`);
    return response.data;
  },

  getMyGigs: async (params = {}) => {
    const response = await axios.get('/api/gigs/my-gigs', { params });
    return response.data;
  },

  searchGigs: async (query) => {
    const response = await axios.get('/gigs', {
      params: { query, status: 'open' }
    });
    return response.data;
  },
};
