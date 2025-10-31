import { useStore } from 'zustand';
import { useAuthStore } from './auth-store';

// Custom hook to access the auth store with proper React reactivity
export const useAuth = () => {
  const user = useStore(useAuthStore, (state) => state.user);
  const userStats = useStore(useAuthStore, (state) => state.userStats);
  const userFavorites = useStore(useAuthStore, (state) => state.userFavorites);
  const loading = useStore(useAuthStore, (state) => state.loading);
  const initialized = useStore(useAuthStore, (state) => state.initialized);
  const login = useStore(useAuthStore, (state) => state.login);
  const register = useStore(useAuthStore, (state) => state.register);
  const logout = useStore(useAuthStore, (state) => state.logout);
  const fetchUserStats = useStore(useAuthStore, (state) => state.fetchUserStats);
  const addClaim = useStore(useAuthStore, (state) => state.addClaim);
  const loadFavorites = useStore(useAuthStore, (state) => state.loadFavorites);
  const addFavorite = useStore(useAuthStore, (state) => state.addFavorite);
  const removeFavorite = useStore(useAuthStore, (state) => state.removeFavorite);
  const isFavorite = useStore(useAuthStore, (state) => state.isFavorite);

  return {
    user,
    userStats,
    userFavorites,
    loading,
    initialized,
    login,
    register,
    logout,
    fetchUserStats,
    addClaim,
    loadFavorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};