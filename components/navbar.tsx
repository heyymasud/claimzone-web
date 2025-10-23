"use client"

import Link from "next/link"
import { Heart, LogOut, User } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { user, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 animate-slide-down">
      {/* Glassmorphism background with blur effect */}
      <div className="absolute inset-0 bg-linear-to-b from-card/80 to-card/40 backdrop-blur-md border-b border-border/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with enhanced styling */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
            onMouseEnter={() => setHoveredLink("logo")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-accent via-primary to-secondary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/50">
              <span className="text-accent-foreground font-bold text-sm">CZ</span>
              {hoveredLink === "logo" && (
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-accent via-primary to-secondary opacity-50 blur-md -z-10 animate-pulse" />
              )}
            </div>
            <span className="text-lg font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent transition-all duration-300 group-hover:from-accent group-hover:to-primary">
              ClaimZone
            </span>
          </Link>

          {/* Navigation links */}
          <div className="flex items-center gap-8">
            {[
              { href: "/", label: "Home", icon: null },
              { href: "/favorites", label: "Favorites", icon: Heart },
              { href: "/leaderboard", label: "Leaderboard", icon: null },
              { href: "/about", label: "About", icon: null },
            ].map((link) => {
              const Icon = link.icon
              const isHovered = hoveredLink === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group"
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <div className="flex items-center gap-2 text-foreground/80 transition-all duration-300 group-hover:text-accent">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span className="text-sm font-medium">{link.label}</span>
                  </div>

                  {/* Animated underline */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-accent to-primary transition-all duration-300 ${
                      isHovered ? "w-full" : "w-0"
                    }`}
                  />

                  {/* Glow effect on hover */}
                  {isHovered && (
                    <div className="absolute -inset-2 bg-linear-to-r from-accent/20 to-primary/20 rounded-lg blur-md -z-10 animate-pulse" />
                  )}
                </Link>
              )
            })}

            <div className="flex items-center gap-4 pl-4 border-l border-border/30">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground transition-colors"
                    onMouseEnter={() => setHoveredLink("dashboard")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </Link>
                  <Button onClick={logout} variant="ghost" size="sm" className="text-foreground/80 hover:text-accent">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-accent">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-linear-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
    </nav>
  )
}
