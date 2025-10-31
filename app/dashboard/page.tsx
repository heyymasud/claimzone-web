"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/stores/use-auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Gift, TrendingUp, LogOut, Heart } from "lucide-react"
import GiveawayCard from "@/components/giveaway-card"
import { Giveaway } from "@/types/giveaway"

export default function DashboardPage() {
  const { 
    user, 
    userStats, 
    userFavorites, 
    initialized, 
    logout, 
    loadFavorites 
  } = useAuth()
  const router = useRouter()
  const [claimedGiveaways, setClaimedGiveaways] = useState<Giveaway[]>([])
  const [favoriteGiveaways, setFavoriteGiveaways] = useState<Giveaway[]>([])
  const [allGiveaways, setAllGiveaways] = useState<Giveaway[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user && initialized) {
      router.push("/login")
      return
    }

    // Load favorites if not loaded yet
    if (user && initialized && userFavorites.length === 0) {
      loadFavorites();
    }
  }, [user, initialized, userFavorites.length, loadFavorites, router])

  useEffect(() => {
    const fetchGiveaways = async () => {
      if (!initialized || !user) return;
      
      try {
        setLoading(true);
        const res = await fetch("/api/giveaways");
        const giveaways = await res.json();
        setAllGiveaways(giveaways);

        // Filter claimed giveaways
        if (userStats?.claimed_giveaways) {
          const claimed = giveaways.filter((g: Giveaway) => userStats.claimed_giveaways.includes(g.id));
          setClaimedGiveaways(claimed);
        }

        // Filter favorite giveaways
        if (userFavorites.length > 0) {
          const favorites = giveaways.filter((g: Giveaway) => userFavorites.includes(g.id));
          setFavoriteGiveaways(favorites);
        }
      } catch (error) {
        console.error("Error fetching giveaways:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGiveaways();
  }, [user, initialized, userStats?.claimed_giveaways, userFavorites]);

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, {user.username}!</h1>
            <p className="text-muted-foreground">Track your claimed giveaways and manage your account</p>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Claimed</p>
                <p className="text-3xl font-bold text-foreground">{userStats?.total_claimed || 0}</p>
              </div>
              <Gift className="w-12 h-12 text-accent opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Worth</p>
                <p className="text-3xl font-bold text-accent">${userStats?.total_worth?.toFixed(2) || "0.00"}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-accent opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Favorites</p>
                <p className="text-3xl font-bold text-foreground">{userFavorites.length}</p>
              </div>
              <Heart className="w-12 h-12 text-destructive opacity-20" />
            </div>
          </Card>
        </div>

        {/* Claimed Giveaways */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Claimed Giveaways</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : claimedGiveaways.length === 0 ? (
            <Card className="p-12 text-center border border-border/50 bg-card/50 backdrop-blur-sm">
              <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">No claimed giveaways yet</p>
              <Link href="/">
                <Button className="bg-accent text-accent-foreground">Browse Giveaways</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {claimedGiveaways.map((giveaway) => (
                <GiveawayCard key={giveaway.id} giveaway={giveaway} />
              ))}
            </div>
          )}
        </div>

        {/* Favorite Giveaways */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-destructive" />
            <h2 className="text-2xl font-bold text-foreground">Favorite Giveaways</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : favoriteGiveaways.length === 0 ? (
            <Card className="p-12 text-center border border-border/50 bg-card/50 backdrop-blur-sm">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">No favorite giveaways yet</p>
              <Link href="/">
                <Button className="bg-accent text-accent-foreground">Browse Giveaways</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteGiveaways.map((giveaway) => (
                <GiveawayCard key={giveaway.id} giveaway={giveaway} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
