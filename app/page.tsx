"use client"

import { useEffect, useState } from "react"
import GiveawayCard from "@/components/giveaway-card"
import WorthBanner from "@/components/worth-banner"
import GiveawaySkeleton from "@/components/giveaway-skeleton"
import FilterBar from "@/components/filter-bar"
import ImageCarousel from "@/components/image-carousel"
import { Giveaway } from "@/types/giveaway"

export default function Home() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([])
  const [filteredGiveaways, setFilteredGiveaways] = useState<Giveaway[]>([])
  const [loading, setLoading] = useState(true)
  const [totalWorth, setTotalWorth] = useState<{ active_giveaways_number: number; worth_estimation_usd: string } | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("newest")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const giveawaysRes = await fetch("/api/giveaways")
        if (!giveawaysRes.ok) throw new Error("Failed to fetch giveaways")
        const giveawaysData = await giveawaysRes.json()
        setGiveaways(giveawaysData)

        const worthRes = await fetch("/api/worth")
        if (!worthRes.ok) throw new Error("Failed to fetch worth")
        const worthData = await worthRes.json()
        setTotalWorth(worthData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = [...giveaways]

    // Apply platform filter
    if (selectedPlatform) {
      filtered = filtered.filter((g) => g.platforms?.toLowerCase().includes(selectedPlatform.toLowerCase()))
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter((g) => g.type?.toLowerCase() === selectedType.toLowerCase())
    }

    // Apply sorting
    if (sortBy === "value") {
      filtered.sort((a, b) => {
        const worthA = Number.parseFloat(a.worth?.replace(/[^0-9.-]+/g, "") || "0")
        const worthB = Number.parseFloat(b.worth?.replace(/[^0-9.-]+/g, "") || "0")
        return worthB - worthA
      })
    } else if (sortBy === "ending") {
      filtered.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime())
    } else {
      // newest (default)
      filtered.sort((a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime())
    }

    setFilteredGiveaways(filtered)
  }, [giveaways, selectedPlatform, selectedType, sortBy])

  const carouselImages = giveaways
    .slice(0, 8)
    .map((g) => g.image || g.thumbnail)
    .filter((img) => img)

  return (
    <div className="min-h-screen bg-background">
      {totalWorth && <WorthBanner count={totalWorth.active_giveaways_number} worth={totalWorth.worth_estimation_usd} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!loading && carouselImages.length > 0 && (
          <div className="mb-12 animate-slide-in-right">
            <ImageCarousel images={carouselImages} />
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Active Giveaways</h1>
          <p className="text-muted-foreground">Discover free games, loot, and beta access</p>
        </div>

        <FilterBar
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <GiveawaySkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              Showing {filteredGiveaways.length} of {giveaways.length} giveaways
            </p>
            {filteredGiveaways.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-xl text-muted-foreground mb-4">No giveaways found</p>
                <button
                  onClick={() => {
                    setSelectedPlatform("")
                    setSelectedType("")
                    setSortBy("newest")
                  }}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGiveaways.map((giveaway) => (
                  <GiveawayCard key={giveaway.id} giveaway={giveaway} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
