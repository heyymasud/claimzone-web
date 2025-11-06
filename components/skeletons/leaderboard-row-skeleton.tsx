"use client";

export default function LeaderboardRowSkeleton() {
	return (
		<div className="border border-border/50 rounded-lg p-6 flex items-center justify-between backdrop-blur-sm animate-pulse">
			<div className="flex items-center gap-4 flex-1">
				<div className="w-12 h-12 bg-muted rounded-full" />
				<div className="flex-1">
					<div className="h-4 bg-muted rounded w-12 mb-2" />
					<div className="h-3 bg-muted rounded w-24" />
				</div>
			</div>
			<div className="flex gap-8">
				<div className="text-right">
					<div className="h-3 bg-muted rounded w-16 mb-2" />
					<div className="h-6 bg-muted rounded w-20" />
				</div>
				<div className="text-right">
					<div className="h-3 bg-muted rounded w-16 mb-2" />
					<div className="h-6 bg-muted rounded w-20" />
				</div>
			</div>
		</div>
	);
}
