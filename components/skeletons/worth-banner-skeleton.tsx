"use client"

export default function WorthBannerSkeleton() {
    return (
        <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="bg-card/50 border border-border/50 rounded-2xl p-6 sm:p-8 animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="h-4 bg-muted rounded w-24 mb-3" />
                                    <div className="h-10 bg-muted rounded w-32 mb-2" />
                                    <div className="h-3 bg-muted rounded w-28" />
                                </div>
                                <div className="w-16 h-16 bg-muted rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
