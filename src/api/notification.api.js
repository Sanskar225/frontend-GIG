import axios from './axios';

export const notificationAPI = {
  getNotifications: async () => {
    const response = await axios.get('/notifications');
    return response.data;
  },

  markAsRead: async (notificationIds) => {
    const response = await axios.patch('/notifications/read', {
      notificationIds,
    });
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axios.patch('/notifications/read-all');
    return response.data;
  },

  deleteNotification: async (notificationId) => {
    const response = await axios.delete(`/notifications/${notificationId}`);
    return response.data;
  },
};