import axios from './axios';

export const bidAPI = {
  submitBid: async (bidData) => {
    const response = await axios.post('/bids', bidData);
    return response.data;
  },

  getBidsForGig: async (gigId) => {
    const response = await axios.get(`/bids/${gigId}`);
    return response.data;
  },

  getMyBids: async () => {
    const response = await axios.get('/bids/my/bids');
    return response.data;
  },

  hireBid: async (bidId) => {
    const response = await axios.patch(`/bids/${bidId}/hire`);
    return response.data;
  },

  updateBid: async (bidId, bidData) => {
    const response = await axios.patch(`/bids/${bidId}`, bidData);
    return response.data;
  },

  deleteBid: async (bidId) => {
    const response = await axios.delete(`/bids/${bidId}`);
    return response.data;
  },
};