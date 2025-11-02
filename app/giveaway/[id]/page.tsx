"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, Copy, ExternalLink, Check } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Giveaway } from "@/types/giveaway"
import { useToast } from "@/hooks/use-toast"
import { useOpenLink } from "@/hooks/use-openlink"
import { ShareMenu } from "@/components/share-menu"

export default function GiveawayDetail() {
  const params = useParams()
  const id = params.id as string
  const [giveaway, setGiveaway] = useState<Giveaway | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isClaimed, setIsClaimed] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const { user, userStats, isFavorite, addFavorite, removeFavorite, addClaim } = useAuth()
  const { openLink } = useOpenLink()
  const { toast } = useToast()

  useEffect(() => {
    const fetchGiveaway = async () => {
      try {
        const res = await fetch(`/api/giveaway/${id}`)
        const data = await res.json()
        setGiveaway(data)

        if (user) {
          const isFavoritedResult = isFavorite(Number(id))
          setIsFavorited(isFavoritedResult)

          // Check if already claimed - this needs to be updated to use Supabase
          if (userStats) {
            setIsClaimed(userStats.claimed_giveaways?.includes(Number(id)) || false)
          }
        }
      } catch (error) {
        console.error("Error fetching giveaway:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGiveaway()
  }, [id, user, isFavorite, userStats])

  const toggleFavorite = async () => {
    if (!user) {
      openLink("/login")
      return
    }

    if (isFavorited) {
      await removeFavorite(Number(id))
      setIsFavorited(false)
    } else {
      await addFavorite(Number(id))
      setIsFavorited(true)
    }
  }

  const handleClaimLoots = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (giveaway) {
      const worthValue = Number.parseFloat(giveaway.worth?.replace(/[^0-9.-]+/g, "") || "0")
      await addClaim(Number(id), worthValue)
      setIsClaimed(true)

      toast({
        title: "Loot Claimed!",
        description: "Your claim has been recorded. Good luck!",
        duration: 5000,
      })

      openLink(giveaway.open_giveaway_url, true)
    }
  }

  const handleOpenLinkWithoutLogin = () => {
    if (giveaway) {
      openLink(giveaway.open_giveaway_url, true)
    }
    setShowLoginPrompt(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8" />
            <div className="h-96 bg-muted rounded mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!giveaway) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Giveaway not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to giveaways
        </Link>

        {/* Main Content */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Image */}
          <div className="relative w-full h-96 bg-muted">
            <Image
              src={giveaway.image || giveaway.thumbnail || "/placeholder.svg?height=384&width=800&query=game"}
              alt={giveaway.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-2">{giveaway.title}</h1>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {giveaway.platforms || "Steam"}
                  </span>
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {giveaway.type || "Game"}
                  </span>
                </div>
              </div>
              <button
                onClick={toggleFavorite}
                className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                title={user ? (isFavorited ? "Remove from favorites" : "Add to favorites") : "Sign in to favorite"}
              >
                <Heart className={`w-6 h-6 ${isFavorited ? "fill-destructive text-destructive" : "text-foreground"}`} />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Worth</p>
                <p className="text-2xl font-bold text-accent">{giveaway.worth || "Free"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="text-lg font-semibold text-foreground capitalize">{giveaway.status || "Active"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">End Date</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(giveaway.end_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Participants</p>
                <p className="text-lg font-semibold text-foreground">{giveaway.users?.toLocaleString() || "N/A"}</p>
              </div>
            </div>

            {/* Description */}
            {giveaway.description && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-3">Description</h2>
                <p className="text-foreground/80 leading-relaxed">{giveaway.description}</p>
              </div>
            )}

            {/* Instructions */}
            {giveaway.instructions && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-3">How to Claim</h2>
                <div
                  className="text-foreground/80 leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: giveaway.instructions }}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleClaimLoots}
                disabled={isClaimed}
                className={`flex-1 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all ${isClaimed
                  ? "bg-green-600/20 text-green-400 border border-green-600/50"
                  : "bg-accent text-accent-foreground hover:opacity-90"
                  }`}
              >
                {isClaimed ? (
                  <>
                    <Check className="w-5 h-5" />
                    Claimed
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5" />
                    Claim Loots
                  </>
                )}
              </button>
              <button
                onClick={copyLink}
                className="flex-1 bg-muted text-foreground font-bold py-3 px-6 rounded-lg hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-5 h-5" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <ShareMenu title={giveaway.title} url={window.location.href} />
            </div>
            {showLoginPrompt && !user && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-2xl font-bold text-foreground mb-3">Sign in to Track Your Claims</h2>
                  <p className="text-foreground/80 mb-6">Create a free account to unlock exclusive benefits:</p>
                  <ul className="space-y-2 mb-6 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Track all claimed giveaways and total worth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Save favorite giveaways for quick access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Compete on the leaderboard with other gamers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Access your personal gaming stats dashboard</span>
                    </li>
                  </ul>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/register"
                      className="bg-accent text-accent-foreground font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-center"
                    >
                      Create Account
                    </Link>
                    <Link
                      href="/login"
                      className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-center"
                    >
                      Sign In
                    </Link>
                    <button
                      onClick={handleOpenLinkWithoutLogin}
                      className="bg-muted text-foreground font-bold py-2 px-4 rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      Continue Without Signing In
                    </button>
                    <button
                      onClick={() => setShowLoginPrompt(false)}
                      className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
