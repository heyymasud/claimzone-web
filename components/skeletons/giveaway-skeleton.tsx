export default function GiveawaySkeleton() {
	return (
		<div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
			<div className="w-full h-48 bg-muted" />
			<div className="p-4">
				<div className="h-4 bg-muted rounded mb-3 w-3/4" />
				<div className="h-4 bg-muted rounded mb-3 w-1/2" />
				<div className="flex gap-2 mb-4">
					<div className="h-6 bg-muted rounded w-16" />
					<div className="h-6 bg-muted rounded w-16" />
				</div>
				<div className="flex justify-between">
					<div className="h-4 bg-muted rounded w-12" />
					<div className="h-4 bg-muted rounded w-12" />
				</div>
			</div>
		</div>
	);
}
