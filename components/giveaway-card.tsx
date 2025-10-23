"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Giveaway } from "@/types/giveaway"
import { useRouter } from "next/navigation"

export default function GiveawayCard({ giveaway }: { giveaway: Giveaway }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const { user, isFavorite, addFavorite, removeFavorite } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setIsFavorited(isFavorite(giveaway.id))
    }
  }, [giveaway.id, user, isFavorite])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/login")
      return
    }

    if (isFavorited) {
      removeFavorite(giveaway.id)
    } else {
      addFavorite(giveaway.id)
    }
    setIsFavorited(!isFavorited)
  }

  const platformColors: Record<string, string> = {
    steam: "bg-blue-600",
    epic: "bg-purple-600",
    gog: "bg-red-600",
    ubisoft: "bg-blue-500",
    origin: "bg-orange-600",
    twitch: "bg-purple-500",
    playstation: "bg-blue-700",
    xbox: "bg-green-600",
  }

  const typeColors: Record<string, string> = {
    game: "bg-accent",
    loot: "bg-secondary",
    beta: "bg-primary",
  }

  const platformKey = giveaway.platforms?.toLowerCase().split(",")[0].trim() || "steam"
  const platformColor = platformColors[platformKey] || "bg-muted"
  const typeColor = typeColors[giveaway.type?.toLowerCase()] || "bg-muted"

  return (
    <Link href={`/giveaway/${giveaway.id}`}>
      <div className="group cursor-pointer h-full">
        <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:shadow-primary/20">
          {/* Image Container */}
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            <Image
              src={giveaway.thumbnail || giveaway.image || "/placeholder.svg?height=192&width=400&query=game"}
              alt={giveaway.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition-colors"
              title={user ? (isFavorited ? "Remove from favorites" : "Add to favorites") : "Sign in to favorite"}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-destructive text-destructive" : "text-foreground"}`} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {giveaway.title}
            </h3>

            {/* Tags */}
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className={`text-xs font-semibold text-white px-2 py-1 rounded ${platformColor}`}>
                {giveaway.platforms?.split(",")[0].trim() || "Steam"}
              </span>
              <span className={`text-xs font-semibold text-white px-2 py-1 rounded ${typeColor}`}>
                {giveaway.type || "Game"}
              </span>
            </div>

            {/* Worth and Date */}
            <div className="flex justify-between items-end mt-auto">
              <div className={`${giveaway.worth != "N/A" ? "" : "invisible"}`}>
                <p className="text-xs text-muted-foreground">Worth</p>
                <p className="font-bold text-accent">{giveaway.worth || "Free"}</p>
              </div>
              <div className={`text-right ${giveaway.end_date != "N/A"  ? "" : "invisible"}`}>
                <p className="text-xs text-muted-foreground">Ends</p>
                <p className="text-xs font-semibold text-foreground">
                  {new Date(giveaway.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
