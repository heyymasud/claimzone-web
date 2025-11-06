"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-destructive/10 rounded-full blur-3xl animate-fade-in-out" />
			<div
				className="absolute bottom-10 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-fade-in-out"
				style={{ animationDelay: "2s" }}
			/>

			<div className="relative z-10 max-w-2xl w-full">
				<div className="text-center">
					{/* Error icon with animation */}
					<div className="mb-8 flex justify-center">
						<div className="relative">
							<div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
							<div className="relative bg-linear-to-br from-destructive/20 to-destructive/10 border border-destructive/50 p-6 rounded-full">
								<AlertTriangle size={48} className="text-destructive animate-bounce" />
							</div>
						</div>
					</div>

					{/* Main message */}
					<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
						Something Went Wrong!
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground mb-2 text-balance">
						We encountered an unexpected error while processing your request.
					</p>

					{/* Error details (if available) */}
					{error?.message && (
						<div className="my-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-sm text-muted-foreground font-mono text-left max-w-md mx-auto">
							<p className="text-destructive font-semibold mb-2">Error Details:</p>
							<p className="truncate">{error.message}</p>
						</div>
					)}

					{/* Action buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
						<button
							onClick={reset}
							className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
						>
							<RotateCcw size={20} />
							Try Again
						</button>
						<Link
							href="/"
							className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-primary/50 hover:border-primary hover:bg-primary/5 text-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
						>
							<Home size={20} />
							Back to Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
