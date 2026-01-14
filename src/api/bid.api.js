import axios from './axios';

export const bidAPI = {
  submitBid: async (bidData) => {
    const response = await axios.post('/api/bids', bidData);
    return response.data;
  },

  getBidsForGig: async (gigId) => {
    const response = await axios.get(`/api/bids/${gigId}`);
    return response.data;
  },

  getMyBids: async () => {
    const response = await axios.get('/api/bids/my/bids');
    return response.data;
  },

  hireBid: async (bidId) => {
  if (!bidId) {
    throw new Error('Bid ID is required for hiring');
  }

  const response = await axios.patch(`/bids/${bidId}/hire`);
  return response.data;
},


  updateBid: async (bidId, bidData) => {
    const response = await axios.patch(`/api/bids/${bidId}`, bidData);
    return response.data;
  },

  deleteBid: async (bidId) => {
    const response = await axios.delete(`/api/bids/${bidId}`);
    return response.data;
  },
};
