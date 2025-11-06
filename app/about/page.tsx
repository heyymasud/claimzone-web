import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="mb-12">
					<h1 className="text-4xl font-bold text-foreground mb-4">
						About ClaimZone
					</h1>
					<p className="text-lg text-muted-foreground">
						Your ultimate destination for discovering free games, loot, and giveaways
						from top gaming platforms.
					</p>
				</div>

				{/* Main Content */}
				<div className="space-y-12">
					{/* What is ClaimZone */}
					<section className="bg-card border border-border rounded-lg p-8">
						<h2 className="text-2xl font-bold text-foreground mb-4">
							What is ClaimZone?
						</h2>
						<p className="text-foreground/80 leading-relaxed mb-4">
							ClaimZone is a free gaming giveaway portal that aggregates active
							giveaways, free games, and loot offers from major gaming platforms. We
							make it easy for gamers to discover and claim free content without
							spending a dime.
						</p>
						<p className="text-foreground/80 leading-relaxed">
							Whether you're looking for free Steam games, Epic Games giveaways, GOG
							deals, or exclusive loot drops, we have you covered. Our platform is
							designed to be fast, intuitive, and mobile-friendly so you can browse
							giveaways anytime, anywhere.
						</p>
					</section>

					{/* Features */}
					<section className="bg-card border border-border rounded-lg p-8">
						<h2 className="text-2xl font-bold text-foreground mb-6">Features</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
									<span className="w-2 h-2 bg-accent rounded-full" />
									Real-Time Giveaways
								</h3>
								<p className="text-foreground/80">
									Access the latest active giveaways updated in real-time from multiple
									gaming platforms.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
									<span className="w-2 h-2 bg-accent rounded-full" />
									Smart Filtering
								</h3>
								<p className="text-foreground/80">
									Filter by platform, type (game/loot/beta), and sort by newest, ending
									soon, or highest value.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
									<span className="w-2 h-2 bg-accent rounded-full" />
									Favorites System
								</h3>
								<p className="text-foreground/80">
									Save your favorite giveaways locally to keep track of the ones you're
									interested in.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
									<span className="w-2 h-2 bg-accent rounded-full" />
									Detailed Information
								</h3>
								<p className="text-foreground/80">
									Get comprehensive details about each giveaway including worth, end
									date, and instructions.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
									<span className="w-2 h-2 bg-accent rounded-full" />
									Share & Copy
								</h3>
								<p className="text-foreground/80">
									Easily share giveaways with friends or copy links to save for later.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
									<span className="w-2 h-2 bg-accent rounded-full" />
									Mobile Friendly
								</h3>
								<p className="text-foreground/80">
									Fully responsive design that works seamlessly on desktop, tablet, and
									mobile devices.
								</p>
							</div>
						</div>
					</section>

					{/* Data Source */}
					<section className="bg-card border border-border rounded-lg p-8">
						<h2 className="text-2xl font-bold text-foreground mb-4">Data Source</h2>
						<p className="text-foreground/80 leading-relaxed mb-4">
							All giveaway data on ClaimZone is provided by{" "}
							<a
								href="https://www.gamerpower.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
							>
								GamerPower.com
								<ExternalLink className="w-4 h-4" />
							</a>
							, a trusted source for gaming giveaways and free game information.
						</p>
						<p className="text-foreground/80 leading-relaxed">
							We use their public API to fetch real-time giveaway data, ensuring you
							always have access to the latest offers. We respect their rate limits and
							data usage policies.
						</p>
					</section>

					{/* How It Works */}
					<section className="bg-card border border-border rounded-lg p-8">
						<h2 className="text-2xl font-bold text-foreground mb-6">How It Works</h2>
						<div className="space-y-4">
							<div className="flex gap-4">
								<div className="shrink-0">
									<div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold">
										1
									</div>
								</div>
								<div>
									<h3 className="font-bold text-foreground mb-1">Browse Giveaways</h3>
									<p className="text-foreground/80">
										Visit our home page to see all active giveaways from various gaming
										platforms.
									</p>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="shrink-0">
									<div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold">
										2
									</div>
								</div>
								<div>
									<h3 className="font-bold text-foreground mb-1">Filter & Sort</h3>
									<p className="text-foreground/80">
										Use our filters to find giveaways by platform, type, or sort by value
										and end date.
									</p>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="shrink-0">
									<div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold">
										3
									</div>
								</div>
								<div>
									<h3 className="font-bold text-foreground mb-1">View Details</h3>
									<p className="text-foreground/80">
										Click on any giveaway to see detailed information, instructions, and
										claim it.
									</p>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="shrink-0">
									<div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold">
										4
									</div>
								</div>
								<div>
									<h3 className="font-bold text-foreground mb-1">Claim Your Prize</h3>
									<p className="text-foreground/80">
										Follow the giveaway instructions and claim your free game or loot
										before it ends.
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* FAQ */}
					<section className="bg-card border border-border rounded-lg p-8">
						<h2 className="text-2xl font-bold text-foreground mb-6">
							Frequently Asked Questions
						</h2>
						<div className="space-y-6">
							<div>
								<h3 className="font-bold text-foreground mb-2">
									Is ClaimZone free to use?
								</h3>
								<p className="text-foreground/80">
									Yes! ClaimZone is completely free. We don't charge any fees or require
									subscriptions.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2">
									Do I need an account to use ClaimZone?
								</h3>
								<p className="text-foreground/80">
									No account needed! You can browse all giveaways without signing up.
									Your favorites are saved locally in your browser.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2">
									How often is the data updated?
								</h3>
								<p className="text-foreground/80">
									Our giveaway data is fetched from GamerPower.com in real-time, so you
									always see the latest offers.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2">
									Can I share giveaways with friends?
								</h3>
								<p className="text-foreground/80">
									Each giveaway has share and copy link buttons to easily share with
									friends on social media or via messaging.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-foreground mb-2">
									What platforms do you support?
								</h3>
								<p className="text-foreground/80">
									We support Steam, Epic Games, GOG, Ubisoft, Origin, Twitch,
									PlayStation, Xbox, and more.
								</p>
							</div>
						</div>
					</section>

					{/* CTA */}
					<div className="text-center py-8">
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Ready to find your next free game?
						</h2>
						<Link
							href="/"
							className="inline-block bg-accent text-accent-foreground font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
						>
							Browse Giveaways
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
