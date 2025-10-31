"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GiveawayCard from "@/components/giveaway-card"
import GiveawaySkeleton from "@/components/skeletons/giveaway-skeleton"
import { Heart } from "lucide-react"
import { useAuth } from "@/lib/stores/use-auth"
import { Button } from "@/components/ui/button"
import { Giveaway } from "@/types/giveaway"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Giveaway[]>([])
  const [allGiveaways, setAllGiveaways] = useState<Giveaway[]>([])
  const [loading, setLoading] = useState(true)
  const { user, userFavorites, initialized, loadFavorites } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user && initialized) {
      // Auth is initialized but user is not logged in
      router.push("/login")
      return
    }

    if (user && initialized) {
      // Load user's favorites
      loadFavorites()
    }
  }, [user, initialized, loadFavorites, router])

  // Fetch all giveaways once we know the user is authenticated
  useEffect(() => {
    if (user && initialized) {
      const fetchAllGiveaways = async () => {
        try {
          const res = await fetch("/api/giveaways")
          if (!res.ok) throw new Error("Failed to fetch giveaways")
          const giveawaysData = await res.json()
          setAllGiveaways(giveawaysData)
        } catch (error) {
          console.error("Error fetching giveaways:", error)
        }
      }

      fetchAllGiveaways()
    }
  }, [user, initialized])

  // Update favorites when userFavorites changes
  useEffect(() => {
    if (allGiveaways.length > 0 && userFavorites.length >= 0) { // >= 0 because it can be empty
      const favoriteGiveaways = allGiveaways.filter((g: Giveaway) => userFavorites.includes(g.id))
      setFavorites(favoriteGiveaways)
      setLoading(false) // Set loading to false once we have favorites
    }
  }, [allGiveaways, userFavorites])

  // Show loading state while waiting for auth initialization or data loading
  const pageLoading = !initialized || loading

  if (!user && initialized) {
    return null // Will redirect to login via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-destructive fill-destructive" />
            <h1 className="text-4xl font-bold text-foreground">Your Favorites</h1>
          </div>
          <p className="text-muted-foreground">Giveaways you've saved for later</p>
        </div>

        {pageLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <GiveawaySkeleton key={i} />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Start adding giveaways to your favorites to see them here</p>
            <Button onClick={() => router.push("/")} className="bg-primary text-primary-foreground font-bold">
              Browse Giveaways
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((giveaway) => (
              <GiveawayCard key={giveaway.id} giveaway={giveaway} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
