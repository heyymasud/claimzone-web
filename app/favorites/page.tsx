"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GiveawayCard from "@/components/giveaway-card"
import GiveawaySkeleton from "@/components/giveaway-skeleton"
import { Heart } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Giveaway } from "@/types/giveaway"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Giveaway[]>([])
  const [loading, setLoading] = useState(true)
  const { user, getFavorites } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchFavorites = async () => {
      try {
        const favoriteIds = getFavorites()

        if (favoriteIds.length === 0) {
          setFavorites([])
          setLoading(false)
          return
        }

        const res = await fetch("/api/giveaways")
        const allGiveaways = await res.json()
        const favoriteGiveaways = allGiveaways.filter((g: Giveaway) => favoriteIds.includes(g.id))
        setFavorites(favoriteGiveaways)
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user, getFavorites, router])

  if (!user) {
    return null
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

        {loading ? (
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
