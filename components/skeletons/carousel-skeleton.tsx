"use client";

export default function CarouselSkeleton() {
	return (
		<div className="w-full h-64 sm:h-140 rounded-xl overflow-hidden bg-muted animate-pulse">
			<div className="w-full h-full bg-linear-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
		</div>
	);
}
