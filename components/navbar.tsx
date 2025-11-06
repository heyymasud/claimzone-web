"use client";

import Link from "next/link";
import { LogOut, User, Menu, X, Gamepad } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { user, logout } = useAuth();

	const navLinks = [
		{ href: "/", label: "Home", icon: null },
		{ href: "/favorites", label: "Favorites", icon: null },
		{ href: "/leaderboard", label: "Leaderboard", icon: null },
		{ href: "/about", label: "About", icon: null },
	];

	return (
		<nav className="sticky top-0 z-50 animate-slide-down overflow-hidden">
			{/* Glassmorphism background with blur effect */}
			<div className="absolute inset-0 bg-linear-to-b from-card/80 to-card/40 backdrop-blur-md border-b border-border/30" />
			<div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

			<div className="absolute top-0 left-1/4 w-96 h-10 bg-primary/20 rounded-full blur-3xl animate-pulse" />
			<div
				className={`absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse ${mobileMenuOpen ? "hidden" : ""}`}
				style={{ animationDelay: "1s" }}
			/>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo with enhanced styling */}
					<Link
						href="/"
						className="flex items-center gap-3 group cursor-pointer"
						onMouseEnter={() => setHoveredLink("logo")}
						onMouseLeave={() => setHoveredLink(null)}
					>
						<div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-accent via-primary to-secondary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/50">
							<span className="text-accent-foreground font-bold text-sm">
								<Gamepad />
							</span>
							{hoveredLink === "logo" && (
								<div className="absolute inset-0 rounded-xl bg-linear-to-br from-accent via-primary to-secondary opacity-50 blur-md -z-10 animate-pulse" />
							)}
						</div>
						<span className="text-lg font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent transition-all duration-300 group-hover:from-accent group-hover:to-primary hidden sm:inline">
							ClaimZone
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map(link => {
							const isHovered = hoveredLink === link.href;

							return (
								<Link
									key={link.href}
									href={link.href}
									className="relative group"
									onMouseEnter={() => setHoveredLink(link.href)}
									onMouseLeave={() => setHoveredLink(null)}
								>
									<div className="flex items-center gap-2 text-foreground/80 transition-all duration-300 group-hover:text-accent">
										{/* {Icon && <Icon className="w-4 h-4" />} */}
										<span className="text-sm font-medium">{link.label}</span>
									</div>

									{/* Animated underline */}
									<div
										className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-accent to-primary transition-all duration-300 ${
											isHovered ? "w-full" : "w-0"
										}`}
									/>

									{/* Glow effect on hover */}
									{isHovered && (
										<div className="absolute -inset-2 bg-linear-to-r from-accent/20 to-primary/20 rounded-lg blur-md -z-10 animate-pulse" />
									)}
								</Link>
							);
						})}
					</div>
					<div className="hidden md:flex items-center gap-8">
						{/* Desktop Auth Section */}
						<div className="flex items-center gap-4 pl-4 border-l border-border/30">
							{user ? (
								<div className="flex items-center gap-3">
									<Link
										href="/dashboard"
										className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground transition-colors"
										onMouseEnter={() => setHoveredLink("dashboard")}
										onMouseLeave={() => setHoveredLink(null)}
									>
										<User className="w-4 h-4" />
										<span className="text-sm font-medium">{user.username}</span>
									</Link>
									<Button
										onClick={async () => {
											await logout();
										}}
										variant="ghost"
										size="sm"
										className="text-foreground/80 hover:text-accent"
									>
										<LogOut className="w-4 h-4" />
									</Button>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<Link href="/login">
										<Button
											variant="ghost"
											size="sm"
											className="text-foreground/80 hover:text-accent transition-all duration-300"
										>
											Sign In
										</Button>
									</Link>
									<Link href="/register">
										<Button
											size="sm"
											className="bg-linear-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground hover:shadow-accent/50 transition-all duration-300  hover:shadow-md"
										>
											Register
										</Button>
									</Link>
								</div>
							)}
						</div>
					</div>

					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? (
							<X className="w-6 h-6 text-foreground" />
						) : (
							<Menu className="w-6 h-6 text-foreground" />
						)}
					</button>
				</div>

				{mobileMenuOpen && (
					<div className="md:hidden pb-4 border-t border-border/30 animate-slide-down">
						<div className="flex flex-col gap-2 pt-4">
							{navLinks.map(link => {
								return (
									<Link
										key={link.href}
										href={link.href}
										onClick={() => setMobileMenuOpen(false)}
										className="flex items-center gap-2 px-4 py-2 rounded-lg text-foreground/80 hover:bg-primary/10 hover:text-accent transition-all"
									>
										{/* {Icon && <Icon className="w-4 h-4" />} */}
										<span className="text-sm font-medium">{link.label}</span>
									</Link>
								);
							})}

							{/* Mobile Auth Section */}
							<div className="border-t border-border/30 pt-4 mt-2">
								{user ? (
									<div className="flex flex-col gap-2">
										<Link
											href="/dashboard"
											onClick={() => setMobileMenuOpen(false)}
											className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-foreground hover:bg-primary/20 transition-colors"
										>
											<User className="w-4 h-4" />
											<span className="text-sm font-medium">{user.username}</span>
										</Link>
										<button
											onClick={async () => {
												await logout();
												setMobileMenuOpen(false);
											}}
											className="flex items-center gap-2 px-4 py-2 rounded-lg text-foreground/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
										>
											<LogOut className="w-4 h-4" />
											<span className="text-sm font-medium">Logout</span>
										</button>
									</div>
								) : (
									<div className="flex flex-col gap-2">
										<Link href="/login" onClick={() => setMobileMenuOpen(false)}>
											<Button
												variant="ghost"
												className="w-full justify-start text-foreground/80 hover:text-accent"
											>
												Sign In
											</Button>
										</Link>
										<Link href="/register" onClick={() => setMobileMenuOpen(false)}>
											<Button className="w-full justify-start bg-linear-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground">
												Register
											</Button>
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Bottom gradient accent line */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
		</nav>
	);
}
