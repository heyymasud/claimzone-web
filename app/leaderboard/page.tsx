"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Trophy, Medal, Flame } from "lucide-react"
import { UserStats } from "@/types/users"

export default function LeaderboardPage() {
  const [topByWorth, setTopByWorth] = useState<UserStats[]>([])
  const [topByClaims, setTopByClaims] = useState<UserStats[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"worth" | "claims">("worth")

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Get all users and their stats
        const users = JSON.parse(localStorage.getItem("claimzone_users") || "[]")

        const leaderboardData: UserStats[] = users
          .map((user: any) => {
            const stats = JSON.parse(
              localStorage.getItem(`claimzone_stats_${user.id}`) || '{"totalWorth": 0, "claimedGiveaways": []}',
            )
            return {
              username: user.username,
              totalWorth: stats.totalWorth || 0,
              totalClaimed: stats.claimedGiveaways?.length || 0,
            }
          })
          .filter((user: UserStats) => user.totalClaimed > 0 || user.totalWorth > 0)

        // Sort by worth
        const sortedByWorth = [...leaderboardData].sort((a, b) => b.totalWorth - a.totalWorth)
        setTopByWorth(sortedByWorth)

        // Sort by claims
        const sortedByClaims = [...leaderboardData].sort((a, b) => b.totalClaimed - a.totalClaimed)
        setTopByClaims(sortedByClaims)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const getMedalIcon = (position: number) => {
    if (position === 0) return <Trophy className="w-5 h-5 text-yellow-500" />
    if (position === 1) return <Medal className="w-5 h-5 text-gray-400" />
    if (position === 2) return <Medal className="w-5 h-5 text-orange-600" />
    return <Flame className="w-5 h-5 text-muted-foreground" />
  }

  const getMedalColor = (position: number) => {
    if (position === 0) return "from-yellow-500/20 to-yellow-600/10"
    if (position === 1) return "from-gray-400/20 to-gray-500/10"
    if (position === 2) return "from-orange-600/20 to-orange-700/10"
    return ""
  }

  const leaderboard = activeTab === "worth" ? topByWorth : topByClaims

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">See who's claiming the most giveaways and worth</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("worth")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "worth" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Top by Worth
          </button>
          <button
            onClick={() => setActiveTab("claims")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "claims" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Top by Claims
          </button>
        </div>

        {/* Leaderboard */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : leaderboard.length === 0 ? (
          <Card className="p-12 text-center border border-border/50 bg-card/50 backdrop-blur-sm">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No users on the leaderboard yet</p>
            <p className="text-sm text-muted-foreground">Start claiming giveaways to appear here!</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`bg-linear-to-r ${getMedalColor(index)} border border-border/50 rounded-lg p-6 flex items-center justify-between backdrop-blur-sm transition-all hover:border-border/80`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                    {getMedalIcon(index)}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">#{index + 1}</p>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      {activeTab === "worth" ? "Total Worth" : "Claims"}
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      {activeTab === "worth" ? `$${user.totalWorth.toFixed(2)}` : user.totalClaimed}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">{activeTab === "worth" ? "Claims" : "Worth"}</p>
                    <p className="text-lg font-semibold text-foreground">
                      {activeTab === "worth" ? user.totalClaimed : `$${user.totalWorth.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <Card className="mt-12 p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="font-bold text-foreground mb-2">How the Leaderboard Works</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Users appear on the leaderboard after claiming their first giveaway</li>
            <li>• "Top by Worth" ranks users by the total value of giveaways they've claimed</li>
            <li>• "Top by Claims" ranks users by the number of giveaways they've claimed</li>
            <li>• Stats are updated in real-time as you claim giveaways</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
