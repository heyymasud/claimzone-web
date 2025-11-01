"use client"

import Link from "next/link"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-fade-in-out" />
            <div
                className="absolute bottom-10 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-fade-in-out"
                style={{ animationDelay: "2s" }}
            />

            <div className="relative z-10 max-w-2xl w-full">
                <div className="text-center">
                    {/* 404 Text with gradient */}
                    <div className="mb-8">
                        <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                            404
                        </h1>
                        <div className="h-1 w-24 bg-linear-to-r from-primary via-accent to-primary mx-auto mb-6 rounded-full" />
                    </div>

                    {/* Main message */}
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">Oops! This Loot is Gone</h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
                        The page you're looking for seems to have been claimed or doesn't exist. Let's get you back to the action!
                    </p>

                    {/* Decorative grid background */}
                    <div className="mb-12 py-8 bg-linear-to-b from-card/50 to-card/0 rounded-xl border border-border/50 backdrop-blur-sm">
                        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                            {[...Array(9)].map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square rounded-lg bg-primary/5 border border-primary/20 animate-pulse"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
                        >
                            <Home size={20} />
                            Back to Home
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-primary/50 hover:border-primary hover:bg-primary/5 text-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <Search size={20} />
                            Browse Giveaways
                        </Link>
                    </div>

                    {/* Back link */}
                    <div className="mt-8">
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
