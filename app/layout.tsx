import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const _geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
	title: "ClaimZone - Claim your free Games, Loot, and Giveaways",
	description:
		"Discover and claim free games, loot, and giveaways from top platforms",
	generator: "Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
			>
				<Navbar />
				<main className="flex-1">{children}</main>
				<Footer />
				<Toaster />
				<Analytics />
			</body>
		</html>
	);
}
