import { useStore } from 'zustand';
import { useGiveawayStore } from '@/lib/stores/giveaway-store';

// Custom hook to access the auth store with proper React reactivity
export const useGiveaway = () => {
  const giveaways = useStore(useGiveawayStore, (state) => state.giveaways);
  const filteredGiveaways = useStore(useGiveawayStore, (state) => state.filteredGiveaways);
  const totalWorth = useStore(useGiveawayStore, (state) => state.totalWorth);
  const loading = useStore(useGiveawayStore, (state) => state.loading);
  const error = useStore(useGiveawayStore, (state) => state.error);
  const lastFetched = useStore(useGiveawayStore, (state) => state.lastFetched);
  const selectedPlatform = useStore(useGiveawayStore, (state) => state.selectedPlatform);
  const selectedType = useStore(useGiveawayStore, (state) => state.selectedType);
  const sortBy = useStore(useGiveawayStore, (state) => state.sortBy);
  const currentPage = useStore(useGiveawayStore, (state) => state.currentPage);
  const itemsPerPage = useStore(useGiveawayStore, (state) => state.itemsPerPage);
  const totalPages = useStore(useGiveawayStore, (state) => state.totalPages);
  const startIndex = useStore(useGiveawayStore, (state) => state.startIndex);
  const endIndex = useStore(useGiveawayStore, (state) => state.endIndex);
  const paginatedGiveaways = useStore(useGiveawayStore, (state) => state.paginatedGiveaways);
  const fetchGiveaways = useStore(useGiveawayStore, (state) => state.fetchGiveaways);
  const refreshGiveaways = useStore(useGiveawayStore, (state) => state.refreshGiveaways);
  const setSelectedPlatform = useStore(useGiveawayStore, (state) => state.setSelectedPlatform);
  const setSelectedType = useStore(useGiveawayStore, (state) => state.setSelectedType);
  const setSortBy = useStore(useGiveawayStore, (state) => state.setSortBy);
  const setCurrentPage = useStore(useGiveawayStore, (state) => state.setCurrentPage);
  const applyFilters = useStore(useGiveawayStore, (state) => state.applyFilters);

  return {
    giveaways,
    filteredGiveaways,
    totalWorth,
    loading,
    error,
    lastFetched,
    selectedPlatform,
    selectedType,
    sortBy,
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedGiveaways,
    fetchGiveaways,
    refreshGiveaways,
    setSelectedPlatform,
    setSelectedType,
    setSortBy,
    setCurrentPage,
    applyFilters
  };
};