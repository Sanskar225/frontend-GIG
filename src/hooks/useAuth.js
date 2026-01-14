import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    loading,
    isClient: user?.role === 'client',
    isFreelancer: user?.role === 'freelancer',
  };
};