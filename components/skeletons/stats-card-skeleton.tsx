"use client"

export default function StatsCardSkeleton() {
    return (
        <div className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-24 mb-2" />
                    <div className="h-8 bg-muted rounded w-16" />
                </div>
                <div className="w-12 h-12 bg-muted rounded-lg" />
            </div>
        </div>
    )
}
