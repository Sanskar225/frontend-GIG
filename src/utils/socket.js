import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    // Prevent duplicate connections
    if (this.socket?.connected) {
      return;
    }

    // 🔑 Get token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('⚠️ Socket not connected: No token found');
      return;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,

      // ✅ SEND TOKEN HERE (MOST IMPORTANT PART)
      auth: {
        token: token,
      },
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);

      if (userId) {
        this.socket.emit('join', { userId });
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

export default new SocketService();
