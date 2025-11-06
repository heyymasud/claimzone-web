"use client";

import { Zap, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export default function WorthBanner({
	count,
	worth,
}: {
	count: number;
	worth: string;
}) {
	const [displayCount, setDisplayCount] = useState(0);
	const [displayWorth, setDisplayWorth] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
		if (!isVisible) return;

		let current = 0;
		let currentWorth = 0;
		const target = count;
		const targetWorth = Number(worth);
		const increment = Math.ceil(target / 30);
		const incrementWorth = Math.ceil(targetWorth / 30);
		const timer = setInterval(() => {
			current += increment;
			currentWorth += incrementWorth;
			if (current >= target && currentWorth >= targetWorth) {
				setDisplayCount(target);
				setDisplayWorth(targetWorth);
				clearInterval(timer);
			} else {
				setDisplayCount(current);
				setDisplayWorth(currentWorth);
			}
		}, 30);

		return () => clearInterval(timer);
	}, [count, isVisible, worth]);

	return (
		<div className="relative overflow-hidden">
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
					<div className="group relative">
						<div className="absolute inset-0 bg-linear-to-br from-primary/30 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						<div className="overflow-hidden relative bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 transform hover:scale-105">
							<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse hover:animate-none" />

							<div className="flex items-center justify-between mb-4">
								<div>
									<p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
										Total Active
									</p>
									<p className="text-4xl sm:text-5xl font-black bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
										{displayCount}
									</p>
									<p className="text-xs sm:text-sm text-muted-foreground mt-1">
										Giveaways Available
									</p>
								</div>
								<div className="p-4 bg-linear-to-br from-primary/30 to-accent/20 rounded-xl">
									<Zap className="w-8 h-8 sm:w-10 sm:h-10 text-accent animate-pulse" />
								</div>
							</div>
						</div>
					</div>

					<div className="group relative">
						<div className="absolute inset-0 bg-linear-to-br from-accent/30 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						<div className="overflow-hidden relative bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl border border-accent/20 rounded-2xl p-6 sm:p-8 hover:border-accent/40 transition-all duration-300 transform hover:scale-105">
							<div
								className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse hover:animate-none"
								style={{ animationDelay: "1s" }}
							/>
							<div className="flex items-center justify-between mb-4">
								<div>
									<p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
										Total Worth
									</p>
									<p className="text-4xl sm:text-5xl font-black bg-linear-to-r from-accent to-primary bg-clip-text text-transparent mt-2">
										$ {displayWorth}
									</p>
									<p className="text-xs sm:text-sm text-muted-foreground mt-1">
										USD Value
									</p>
								</div>
								<div className="p-4 bg-linear-to-br from-accent/30 to-primary/20 rounded-xl">
									<Trophy
										className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-pulse"
										style={{ animationDelay: "0.5s" }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
