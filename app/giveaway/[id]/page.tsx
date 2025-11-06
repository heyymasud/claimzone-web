"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Copy, ExternalLink, Check } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useGiveawayStore } from "@/lib/stores/giveaway-store";
import { useToast } from "@/hooks/use-toast";
import { useOpenLink } from "@/hooks/use-openlink";
import { ShareMenu } from "@/components/share-menu";

export default function GiveawayDetail() {
	const params = useParams();
	const id = params.id as string;
	const [copied, setCopied] = useState(false);
	const [showLoginPrompt, setShowLoginPrompt] = useState(false);
	const {
		user,
		isFavorite,
		isClaimed,
		addFavorite,
		removeFavorite,
		addClaim,
		favoriteLoading,
	} = useAuth();
	const {
		singleGiveaway,
		singleGiveawayLoading,
		singleGiveawayError,
		fetchSingleGiveaway,
	} = useGiveawayStore();
	const { openLink } = useOpenLink();
	const { toast } = useToast();

	useEffect(() => {
		const loadGiveaway = async () => {
			await fetchSingleGiveaway(id);
		};

		loadGiveaway();
	}, [id, fetchSingleGiveaway]);

	const toggleFavorite = async () => {
		if (!user) {
			openLink("/login");
			return;
		}

		try {
			const isCurrentlyFavorited = isFavorite(Number(id));
			if (isCurrentlyFavorited) {
				await removeFavorite(Number(id));
				toast({
					title: "Removed from favorites",
					duration: 3000,
				});
			} else {
				await addFavorite(Number(id));
				toast({
					title: "Added to favorites",
					duration: 3000,
				});
			}
		} catch (error) {
			console.error("Toggle favorite error:", error);
			toast({
				title: "Error",
				description: "Failed to update favorites. Please try again.",
				variant: "destructive",
				duration: 5000,
			});
		}
	};

	const handleClaimLoots = async () => {
		if (!user) {
			setShowLoginPrompt(true);
			return;
		}

		if (singleGiveaway) {
			try {
				const worthValue = Number.parseFloat(
					singleGiveaway.worth?.replace(/[^0-9.-]+/g, "") || "0"
				);
				await addClaim(Number(id), worthValue);

				toast({
					title: "Loot Claimed!",
					description: "Your claim has been recorded. Good luck!",
					duration: 5000,
				});

				// Open in new tab
				openLink(singleGiveaway.open_giveaway_url, true);
			} catch (error) {
				console.error("Claim error:", error);
				toast({
					title: "Error",
					description: "Failed to claim loot. Please try again.",
					variant: "destructive",
					duration: 5000,
				});
			}
		}
	};

	const handleOpenLinkWithoutLogin = () => {
		if (singleGiveaway) {
			openLink(singleGiveaway.open_giveaway_url, true);
		}
		setShowLoginPrompt(false);
	};

	const copyLink = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Get the current favorite status from the auth store
	const isFavorited = isFavorite(Number(id));

	if (singleGiveawayLoading) {
		return (
			<div className="min-h-screen bg-background">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="animate-pulse">
						<div className="h-8 bg-muted rounded w-1/4 mb-8" />
						<div className="h-96 bg-muted rounded mb-8" />
						<div className="space-y-4">
							<div className="h-4 bg-muted rounded w-3/4" />
							<div className="h-4 bg-muted rounded w-1/2" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (singleGiveawayError || !singleGiveaway) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-foreground mb-4">
						{singleGiveawayError ? "Error loading giveaway" : "Giveaway not found"}
					</h1>
					<p className="text-muted-foreground mb-4">{singleGiveawayError}</p>
					<Link href="/" className="text-primary hover:underline">
						Back to home
					</Link>
				</div>
			</div>
		);
	}

	// Get the current claimed status from the auth store
	const isCurrentlyClaimed = isClaimed(Number(id));

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Back Button */}
				<Link
					href="/"
					className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to giveaways
				</Link>

				{/* Main Content */}
				<div className="bg-card border border-border rounded-lg overflow-hidden">
					{/* Image */}
					<div className="relative w-full h-96 bg-muted">
						<Image
							src={
								singleGiveaway.image ||
								singleGiveaway.thumbnail ||
								"/placeholder.svg?height=384&width=800&query=game"
							}
							alt={singleGiveaway.title}
							fill
							className="object-cover"
						/>
					</div>

					{/* Content */}
					<div className="p-8">
						{/* Header */}
						<div className="flex justify-between items-start mb-6">
							<div className="flex-1">
								<h1 className="text-4xl font-bold text-foreground mb-2">
									{singleGiveaway.title}
								</h1>
								<div className="flex gap-2 flex-wrap">
									<span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
										{singleGiveaway.platforms || "Steam"}
									</span>
									<span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
										{singleGiveaway.type || "Game"}
									</span>
								</div>
							</div>
							<button
								onClick={toggleFavorite}
								disabled={favoriteLoading === Number(id)} // Disable button while favorite operation is loading
								className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								title={
									user
										? isFavorited
											? "Remove from favorites"
											: "Add to favorites"
										: "Sign in to favorite"
								}
							>
								<Heart
									className={`w-6 h-6 ${favoriteLoading === Number(id) ? "animate-pulse" : ""} ${isFavorited ? "fill-destructive text-destructive" : "text-foreground"}`}
								/>
							</button>
						</div>

						{/* Info Grid */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-border">
							<div>
								<p className="text-sm text-muted-foreground mb-1">Worth</p>
								<p className="text-2xl font-bold text-accent">
									{singleGiveaway.worth || "Free"}
								</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground mb-1">Status</p>
								<p className="text-lg font-semibold text-foreground capitalize">
									{singleGiveaway.status || "Active"}
								</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground mb-1">End Date</p>
								<p className="text-lg font-semibold text-foreground">
									{new Date(singleGiveaway.end_date).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground mb-1">Participants</p>
								<p className="text-lg font-semibold text-foreground">
									{singleGiveaway.users?.toLocaleString() || "N/A"}
								</p>
							</div>
						</div>

						{/* Description */}
						{singleGiveaway.description && (
							<div className="mb-8">
								<h2 className="text-xl font-bold text-foreground mb-3">Description</h2>
								<p className="text-foreground/80 leading-relaxed">
									{singleGiveaway.description}
								</p>
							</div>
						)}

						{/* Instructions */}
						{singleGiveaway.instructions && (
							<div className="mb-8">
								<h2 className="text-xl font-bold text-foreground mb-3">How to Claim</h2>
								<div
									className="text-foreground/80 leading-relaxed prose prose-invert max-w-none"
									dangerouslySetInnerHTML={{ __html: singleGiveaway.instructions }}
								/>
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-3">
							<button
								onClick={handleClaimLoots}
								disabled={isCurrentlyClaimed}
								className={`flex-1 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all ${
									isCurrentlyClaimed
										? "bg-green-600/20 text-green-400 border border-green-600/50"
										: "bg-accent text-accent-foreground hover:opacity-90"
								}`}
							>
								{isCurrentlyClaimed ? (
									<>
										<Check className="w-5 h-5" />
										Claimed
									</>
								) : (
									<>
										<ExternalLink className="w-5 h-5" />
										Claim Loots
									</>
								)}
							</button>
							<button
								onClick={copyLink}
								className="flex-1 bg-muted text-foreground font-bold py-3 px-6 rounded-lg hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
							>
								<Copy className="w-5 h-5" />
								{copied ? "Copied!" : "Copy Link"}
							</button>
							<ShareMenu title={singleGiveaway.title} url={window.location.href} />
						</div>
						{showLoginPrompt && !user && (
							<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
								<div className="bg-card border border-border rounded-lg p-8 max-w-md w-full animate-in fade-in slide-in-from-bottom-4">
									<h2 className="text-2xl font-bold text-foreground mb-3">
										Sign in to Track Your Claims
									</h2>
									<p className="text-foreground/80 mb-6">
										Create a free account to unlock exclusive benefits:
									</p>
									<ul className="space-y-2 mb-6 text-sm text-foreground/80">
										<li className="flex items-start gap-2">
											<span className="text-accent mt-1">✓</span>
											<span>Track all claimed giveaways and total worth</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-accent mt-1">✓</span>
											<span>Save favorite giveaways for quick access</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-accent mt-1">✓</span>
											<span>Compete on the leaderboard with other gamers</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-accent mt-1">✓</span>
											<span>Access your personal gaming stats dashboard</span>
										</li>
									</ul>
									<div className="flex flex-col gap-3">
										<Link
											href="/register"
											className="bg-accent text-accent-foreground font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-center"
										>
											Create Account
										</Link>
										<Link
											href="/login"
											className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-center"
										>
											Sign In
										</Link>
										<button
											onClick={handleOpenLinkWithoutLogin}
											className="bg-muted text-foreground font-bold py-2 px-4 rounded-lg hover:bg-muted/80 transition-colors"
										>
											Continue Without Signing In
										</button>
										<button
											onClick={() => setShowLoginPrompt(false)}
											className="text-foreground/60 hover:text-foreground transition-colors text-sm"
										>
											Close
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
