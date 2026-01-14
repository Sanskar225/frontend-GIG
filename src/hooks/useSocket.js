import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketService from '../utils/socket';
import { addNotification, setSocketConnected } from '../store/slices/notificationSlice';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export const useSocket = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      socketService.connect(user._id);

      socketService.on('connect', () => {
        dispatch(setSocketConnected(true));
      });

      socketService.on('disconnect', () => {
        dispatch(setSocketConnected(false));
      });

      socketService.on('hired', (data) => {
        toast.success(`You have been hired for ${data.gigTitle}!`);
        dispatch(addNotification({
          type: 'bid_accepted',
          message: `You have been hired for ${data.gigTitle}!`,
          read: false,
          createdAt: new Date().toISOString(),
        }));
      });

      socketService.on('new-bid', (data) => {
        toast.success(`New bid received on ${data.gigTitle}`);
        dispatch(addNotification({
          type: 'new_bid',
          message: `${data.bidderName} placed a bid on ${data.gigTitle}`,
          read: false,
          createdAt: new Date().toISOString(),
        }));
      });

      socketService.on('bid-rejected', (data) => {
        toast.error(`Your bid on ${data.gigTitle} was rejected`);
        dispatch(addNotification({
          type: 'bid_rejected',
          message: `Your bid on ${data.gigTitle} was rejected`,
          read: false,
          createdAt: new Date().toISOString(),
        }));
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [isAuthenticated, user, dispatch]);

  return socketService;
};