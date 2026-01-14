import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationAPI } from '../../api/notification.api';

// Async thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationAPI.getNotifications();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationIds, { rejectWithValue }) => {
    try {
      const response = await notificationAPI.markAsRead(notificationIds);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationAPI.markAllAsRead();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Initial state
const initialState = {
  list: [],
  unreadCount: 0,
  loading: false,
  socketConnected: false,
};

// Slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    setSocketConnected: (state, action) => {
      state.socketConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.notifications;
        state.unreadCount = action.payload.data.notifications.filter(
          (n) => !n.read
        ).length;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      })
      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const readIds = action.meta.arg;
        state.list = state.list.map((n) =>
          readIds.includes(n._id) ? { ...n, read: true } : n
        );
        state.unreadCount = state.list.filter((n) => !n.read).length;
      })
      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.list = state.list.map((n) => ({ ...n, read: true }));
        state.unreadCount = 0;
      });
  },
});

export const { addNotification, setSocketConnected } = notificationSlice.actions;
export default notificationSlice.reducer;