"use client";

import { useEffect } from "react";
import GiveawayCard from "@/components/giveaway-card";
import WorthBanner from "@/components/worth-banner";
import GiveawaySkeleton from "@/components/skeletons/giveaway-skeleton";
import FilterBar from "@/components/filter-bar";
import ImageCarousel from "@/components/image-carousel";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import WorthBannerSkeleton from "@/components/skeletons/worth-banner-skeleton";
import Pagination from "@/components/pagination";
import { useGiveaway } from "@/hooks/use-giveaway";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function Home() {
	const {
		giveaways,
		totalWorth,
		filteredGiveaways,
		paginatedGiveaways,
		totalPages,
		startIndex,
		endIndex,
		selectedPlatform,
		setSelectedPlatform,
		selectedType,
		setSelectedType,
		sortBy,
		setSortBy,
		currentPage,
		setCurrentPage,
		loading,
		fetchGiveaways,
		refreshGiveaways,
	} = useGiveaway();

	useEffect(() => {
		fetchGiveaways();
		const interval = setInterval(() => refreshGiveaways(), 10 * 60 * 1000);
		return () => clearInterval(interval);
	}, [fetchGiveaways, refreshGiveaways]);

	const carouselGiveaways = giveaways.slice(0, 8);

	return (
		<div className="min-h-screen bg-background">
			{loading ? (
				<>
					<div className="mb-8 pt-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
						<CarouselSkeleton />
					</div>
					<WorthBannerSkeleton />
				</>
			) : (
				<>
					{carouselGiveaways.length > 0 && (
						<div className="mb-8 pt-8 animate-slide-in-right px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
							<ImageCarousel giveaways={carouselGiveaways} />
						</div>
					)}
					{totalWorth && (
						<WorthBanner
							count={totalWorth.active_giveaways_number}
							worth={totalWorth.worth_estimation_usd}
						/>
					)}
				</>
			)}

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-foreground mb-2">
						Active Giveaways
					</h1>
					<p className="text-muted-foreground">
						Discover free games, loot, and beta access
					</p>
				</div>

				<FilterBar
					selectedPlatform={selectedPlatform}
					setSelectedPlatform={setSelectedPlatform}
					selectedType={selectedType}
					setSelectedType={setSelectedType}
					sortBy={sortBy}
					setSortBy={setSortBy}
				/>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Array.from({ length: 9 }).map((_, i) => (
							<GiveawaySkeleton key={i} />
						))}
					</div>
				) : (
					<>
						<div
							id="giveaways"
							className="flex justify-between scroll-mt-115 md:scroll-m-80"
						>
							<p className="text-muted-foreground mb-6">
								Showing {startIndex + 1}-{Math.min(endIndex, filteredGiveaways.length)}{" "}
								of {filteredGiveaways.length} giveaways
							</p>
							<div className="flex justify-center">
								<Button
									onClick={() => refreshGiveaways()}
									disabled={loading}
									className="group"
								>
									{loading ? (
										"Refreshing..."
									) : (
										<RefreshCcw
											className="h-4 w-4 group-hover:animate-spin"
											aria-label="Refreshing"
											role="status"
										/>
									)}
								</Button>
							</div>
						</div>
						{filteredGiveaways.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-20">
								<p className="text-xl text-muted-foreground mb-4">No giveaways found</p>
								<button
									onClick={() => {
										setSelectedPlatform("");
										setSelectedType("");
										setSortBy("newest");
									}}
									className="text-primary hover:underline"
								>
									Clear filters
								</button>
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{paginatedGiveaways.map(giveaway => (
										<GiveawayCard key={giveaway.id} giveaway={giveaway} />
									))}
								</div>
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={setCurrentPage}
								/>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}
