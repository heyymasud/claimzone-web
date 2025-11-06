import { useAuthStore } from "@/lib/stores/auth-store";
import { useStore } from "zustand";

// Custom hook to access the auth store with proper React reactivity
export const useAuth = () => {
	const user = useStore(useAuthStore, state => state.user);
	const userStats = useStore(useAuthStore, state => state.userStats);
	const userFavorites = useStore(useAuthStore, state => state.userFavorites);
	const loading = useStore(useAuthStore, state => state.loading);
	const initialized = useStore(useAuthStore, state => state.initialized);
	const favoriteLoading = useStore(useAuthStore, state => state.favoriteLoading);
	const login = useStore(useAuthStore, state => state.login);
	const register = useStore(useAuthStore, state => state.register);
	const logout = useStore(useAuthStore, state => state.logout);
	const resendConfirmationEmail = useStore(
		useAuthStore,
		state => state.resendConfirmationEmail
	);
	const fetchUserStats = useStore(useAuthStore, state => state.fetchUserStats);
	const addClaim = useStore(useAuthStore, state => state.addClaim);
	const isClaimed = useStore(useAuthStore, state => state.isClaimed);
	const loadFavorites = useStore(useAuthStore, state => state.loadFavorites);
	const addFavorite = useStore(useAuthStore, state => state.addFavorite);
	const removeFavorite = useStore(useAuthStore, state => state.removeFavorite);
	const isFavorite = useStore(useAuthStore, state => state.isFavorite);

	return {
		user,
		userStats,
		userFavorites,
		loading,
		initialized,
		favoriteLoading,
		login,
		register,
		logout,
		resendConfirmationEmail,
		fetchUserStats,
		addClaim,
		isClaimed,
		loadFavorites,
		addFavorite,
		removeFavorite,
		isFavorite,
	};
};
