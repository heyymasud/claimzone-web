"use client"

import { User, UserStats } from "@/types/users"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: User | null
  userStats: UserStats | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  addClaim: (giveawayId: number, worth: number) => void
  addFavorite: (giveawayId: number) => void
  removeFavorite: (giveawayId: number) => void
  getFavorites: () => number[]
  isFavorite: (giveawayId: number) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("claimzone_user")
    const storedStats = localStorage.getItem("claimzone_stats")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedStats) {
      setUserStats(JSON.parse(storedStats))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simple validation - in production, this would be a real API call
    const users = JSON.parse(localStorage.getItem("claimzone_users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error("Invalid email or password")
    }

    const userData: User = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
    }

    setUser(userData)
    localStorage.setItem("claimzone_user", JSON.stringify(userData))

    // Load user stats
    const stats = JSON.parse(
      localStorage.getItem(`claimzone_stats_${foundUser.id}`) ||
        '{"totalClaimed": 0, "totalWorth": 0, "claimedGiveaways": []}',
    )
    setUserStats(stats)
    localStorage.setItem("claimzone_stats", JSON.stringify(stats))
  }

  const register = async (username: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("claimzone_users") || "[]")

    if (users.some((u: any) => u.email === email)) {
      throw new Error("Email already registered")
    }

    const newUser = {
      id: `user_${Date.now()}`,
      username,
      email,
      password, // In production, this should be hashed
      createdAt: Date.now(),
    }

    users.push(newUser)
    localStorage.setItem("claimzone_users", JSON.stringify(users))

    // Create initial stats
    const initialStats: UserStats = {
      username,
      totalClaimed: 0,
      totalWorth: 0,
      claimedGiveaways: [],
    }

    const userData: User = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    }

    setUser(userData)
    setUserStats(initialStats)
    localStorage.setItem("claimzone_user", JSON.stringify(userData))
    localStorage.setItem(`claimzone_stats_${newUser.id}`, JSON.stringify(initialStats))
    localStorage.setItem("claimzone_stats", JSON.stringify(initialStats))
  }

  const logout = () => {
    setUser(null)
    setUserStats(null)
    localStorage.removeItem("claimzone_user")
    localStorage.removeItem("claimzone_stats")
  }

  const addClaim = (giveawayId: number, worth: number) => {
    if (!user || !userStats) return

    const updatedStats: UserStats = {
      ...userStats,
      totalWorth: userStats.totalWorth + worth,
      totalClaimed: userStats.totalClaimed + 1,
      claimedGiveaways: [...userStats.claimedGiveaways, giveawayId],
    }

    setUserStats(updatedStats)
    localStorage.setItem("claimzone_stats", JSON.stringify(updatedStats))
    localStorage.setItem(`claimzone_stats_${user.id}`, JSON.stringify(updatedStats))
  }

  const addFavorite = (giveawayId: number) => {
    if (!user) return

    const favorites = JSON.parse(localStorage.getItem(`claimzone_favorites_${user.id}`) || "[]")
    if (!favorites.includes(giveawayId)) {
      favorites.push(giveawayId)
      localStorage.setItem(`claimzone_favorites_${user.id}`, JSON.stringify(favorites))
    }
  }

  const removeFavorite = (giveawayId: number) => {
    if (!user) return

    const favorites = JSON.parse(localStorage.getItem(`claimzone_favorites_${user.id}`) || "[]")
    const updated = favorites.filter((id: number) => id !== giveawayId)
    localStorage.setItem(`claimzone_favorites_${user.id}`, JSON.stringify(updated))
  }

  const getFavorites = (): number[] => {
    if (!user) return []
    return JSON.parse(localStorage.getItem(`claimzone_favorites_${user.id}`) || "[]")
  }

  const isFavorite = (giveawayId: number): boolean => {
    if (!user) return false
    const favorites = JSON.parse(localStorage.getItem(`claimzone_favorites_${user.id}`) || "[]")
    return favorites.includes(giveawayId)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userStats,
        isLoading,
        login,
        register,
        logout,
        addClaim,
        addFavorite,
        removeFavorite,
        getFavorites,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
