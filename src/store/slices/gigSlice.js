import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gigAPI } from '../../api/gig.api';
import toast from 'react-hot-toast';

// Async thunks
export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async (params, { rejectWithValue }) => {
    try {
      const response = await gigAPI.getAllGigs(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchGigById = createAsyncThunk(
  'gigs/fetchGigById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await gigAPI.getGigById(id);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch gig');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createGig = createAsyncThunk(
  'gigs/createGig',
  async (gigData, { rejectWithValue }) => {
    try {
      const response = await gigAPI.createGig(gigData);
      toast.success('Gig created successfully!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create gig');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateGig = createAsyncThunk(
  'gigs/updateGig',
  async ({ id, gigData }, { rejectWithValue }) => {
    try {
      const response = await gigAPI.updateGig(id, gigData);
      toast.success('Gig updated successfully!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update gig');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteGig = createAsyncThunk(
  'gigs/deleteGig',
  async (id, { rejectWithValue }) => {
    try {
      await gigAPI.deleteGig(id);
      toast.success('Gig deleted successfully!');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete gig');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchMyGigs = createAsyncThunk(
  'gigs/fetchMyGigs',
  async (params, { rejectWithValue }) => {
    try {
      const response = await gigAPI.getMyGigs(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const searchGigs = createAsyncThunk(
  'gigs/searchGigs',
  async (query, { rejectWithValue }) => {
    try {
      const response = await gigAPI.searchGigs(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Initial state
const initialState = {
  allGigs: [],
  myGigs: [],
  currentGig: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

// Slice
const gigSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    clearCurrentGig: (state) => {
      state.currentGig = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all gigs
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.allGigs = action.payload.data.gigs;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.page || 1;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Fetch gig by ID
      .addCase(fetchGigById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGig = action.payload.data.gig;
      })
      .addCase(fetchGigById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Create gig
      .addCase(createGig.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.loading = false;
        state.myGigs.unshift(action.payload.data.gig);
        state.allGigs.unshift(action.payload.data.gig);
      })
      .addCase(createGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Update gig
      .addCase(updateGig.fulfilled, (state, action) => {
        const updatedGig = action.payload.data.gig;
        state.currentGig = updatedGig;
        state.myGigs = state.myGigs.map((gig) =>
          gig._id === updatedGig._id ? updatedGig : gig
        );
        state.allGigs = state.allGigs.map((gig) =>
          gig._id === updatedGig._id ? updatedGig : gig
        );
      })
      // Delete gig
      .addCase(deleteGig.fulfilled, (state, action) => {
        const gigId = action.payload;
        state.myGigs = state.myGigs.filter((gig) => gig._id !== gigId);
        state.allGigs = state.allGigs.filter((gig) => gig._id !== gigId);
      })
      // Fetch my gigs
      .addCase(fetchMyGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.myGigs = action.payload.data.gigs;
      })
      .addCase(fetchMyGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Search gigs
      .addCase(searchGigs.fulfilled, (state, action) => {
        state.allGigs = action.payload.data.gigs;
      });
  },
});

export const { clearCurrentGig, clearError } = gigSlice.actions;
export default gigSlice.reducer;