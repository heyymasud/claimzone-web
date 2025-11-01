import { Giveaway } from "@/types/giveaway";
import { persist } from "zustand/middleware";
import { create } from "zustand";

type Worth = {
    active_giveaways_number: number;
    worth_estimation_usd: string;
};

type GiveawayState = {
    giveaways: Giveaway[]
    filteredGiveaways: Giveaway[]
    totalWorth: Worth | null
    loading: boolean
    error: string | null
    lastFetched: number | null

    selectedPlatform: string
    selectedType: string
    sortBy: string
    currentPage: number
    itemsPerPage: number

    totalPages: number
    startIndex: number
    endIndex: number
    paginatedGiveaways: Giveaway[]

    fetchGiveaways: (force?: boolean) => Promise<void>
    refreshGiveaways: () => Promise<void>

    setSelectedPlatform: (platform: string) => void
    setSelectedType: (type: string) => void
    setSortBy: (sort: string) => void
    setCurrentPage: (page: number) => void
    applyFilters: () => void
}

export const useGiveawayStore = create<GiveawayState>()(
    persist(
        (set, get) => ({
            giveaways: [],
            filteredGiveaways: [],
            totalWorth: null,
            loading: false,
            error: null,
            lastFetched: null,
            selectedPlatform: "",
            selectedType: "",
            sortBy: "newest",
            currentPage: 1,
            itemsPerPage: 9,
            totalPages: 0,
            startIndex: 0,
            endIndex: 0,
            paginatedGiveaways: [],
            fetchGiveaways: async (force = false) => {
                const { lastFetched } = get()
                const now = Date.now()
                const TEN_MINUTES = 10 * 60 * 1000

                // ✅ Skip fetching if data is fresh (< 10 minutes) and not forced
                if (!force && lastFetched && now - lastFetched < TEN_MINUTES) return

                try {
                    set({ loading: true, error: null })
                    const [giveawaysRes, worthRes] = await Promise.all([
                        fetch("/api/giveaways"),
                        fetch("/api/worth"),
                    ])

                    if (!giveawaysRes.ok || !worthRes.ok) throw new Error("Failed to fetch data")

                    const [giveaways, worth] = await Promise.all([
                        giveawaysRes.json(),
                        worthRes.json(),
                    ])

                    set({
                        giveaways,
                        totalWorth: worth,
                        lastFetched: now,
                    })
                    get().applyFilters()
                } catch (error: any) {
                    set({ error: error.message || "Error fetching giveaways" })
                } finally {
                    set({ loading: false })
                }
            },

            // ✅ Manual refresh (force true)
            refreshGiveaways: async () => {
                await get().fetchGiveaways(true)
            },
            applyFilters: () => {
                const { giveaways, selectedPlatform, selectedType, sortBy, currentPage, itemsPerPage } =
                    get()

                let filtered = [...giveaways]

                // Filter by platform
                if (selectedPlatform)
                    filtered = filtered.filter((g) =>
                        g.platforms?.toLowerCase().includes(selectedPlatform.toLowerCase())
                    )

                // Filter by type
                if (selectedType)
                    filtered = filtered.filter(
                        (g) => g.type?.toLowerCase() === selectedType.toLowerCase()
                    )

                // Sort
                if (sortBy === "value") {
                    filtered.sort((a, b) => {
                        const worthA = Number.parseFloat(a.worth?.replace(/[^0-9.-]+/g, "") || "0")
                        const worthB = Number.parseFloat(b.worth?.replace(/[^0-9.-]+/g, "") || "0")
                        return worthB - worthA
                    })
                } else if (sortBy === "ending") {
                    filtered.sort(
                        (a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
                    )
                } else {
                    // newest (default)
                    filtered.sort(
                        (a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
                    )
                }

                const totalPages = Math.ceil(filtered.length / itemsPerPage)
                const startIndex = (currentPage - 1) * itemsPerPage
                const endIndex = startIndex + itemsPerPage
                const paginatedGiveaways = filtered.slice(startIndex, endIndex)

                set({
                    filteredGiveaways: filtered,
                    totalPages,
                    startIndex,
                    endIndex,
                    paginatedGiveaways,
                })
            },

            setSelectedPlatform: (platform) => {
                set({ selectedPlatform: platform, currentPage: 1 })
                get().applyFilters()
            },

            setSelectedType: (type) => {
                set({ selectedType: type, currentPage: 1 })
                get().applyFilters()
            },

            setSortBy: (sort) => {
                set({ sortBy: sort })
                get().applyFilters()
            },

            setCurrentPage: (page) => {
                set({ currentPage: page })
                get().applyFilters()
                const element = document.getElementById(`giveaways`);
                if (element) element.scrollIntoView({ behavior: "smooth" });
            },
        }),
        {
            name: "giveaway-store",
            partialize: (state) => ({
                giveaways: state.giveaways,
                totalWorth: state.totalWorth,
            }),
        }
    )
)