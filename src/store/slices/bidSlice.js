import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bidAPI } from '../../api/bid.api';
import toast from 'react-hot-toast';

// Async thunks
export const submitBid = createAsyncThunk(
  'bids/submitBid',
  async (bidData, { rejectWithValue }) => {
    try {
      const response = await bidAPI.submitBid(bidData);
      toast.success('Bid submitted successfully!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit bid');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchBidsForGig = createAsyncThunk(
  'bids/fetchBidsForGig',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await bidAPI.getBidsForGig(gigId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  'bids/fetchMyBids',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bidAPI.getMyBids();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const hireBid = createAsyncThunk(
  'bids/hireBid',
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await bidAPI.hireBid(bidId);
      toast.success('Freelancer hired successfully!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to hire freelancer');
      return rejectWithValue(error.response?.data);
    }
  }
);

// Initial state
const initialState = {
  myBids: [],
  gigBids: {},
  loading: false,
  error: null,
};

// Slice
const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit bid
      .addCase(submitBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitBid.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids.unshift(action.payload.data.bid);
      })
      .addCase(submitBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Fetch bids for gig
      .addCase(fetchBidsForGig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBidsForGig.fulfilled, (state, action) => {
        state.loading = false;
        const gigId = action.meta.arg;
        state.gigBids[gigId] = action.payload.data.bids;
      })
      .addCase(fetchBidsForGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Fetch my bids
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids = action.payload.data.bids;
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Hire bid
      .addCase(hireBid.fulfilled, (state, action) => {
        const { gig, bid } = action.payload.data;
        const gigId = gig._id;
        
        // Update bids for this gig
        if (state.gigBids[gigId]) {
          state.gigBids[gigId] = state.gigBids[gigId].map((b) =>
            b._id === bid._id ? { ...b, status: 'hired' } : { ...b, status: 'rejected' }
          );
        }
        
        // Update my bids
        state.myBids = state.myBids.map((b) => {
          if (b.gigId === gigId) {
            return b._id === bid._id ? { ...b, status: 'hired' } : { ...b, status: 'rejected' };
          }
          return b;
        });
      });
  },
});

export const { clearError } = bidSlice.actions;
export default bidSlice.reducer;