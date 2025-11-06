"use client";

import { PLATFORMS, SORT_OPTIONS, TYPES } from "@/contstants/filter-constants";
import { X } from "lucide-react";

interface FilterBarProps {
	selectedPlatform: string;
	setSelectedPlatform: (platform: string) => void;
	selectedType: string;
	setSelectedType: (type: string) => void;
	sortBy: string;
	setSortBy: (sort: string) => void;
}

export default function FilterBar({
	selectedPlatform,
	setSelectedPlatform,
	selectedType,
	setSelectedType,
	sortBy,
	setSortBy,
}: FilterBarProps) {
	const hasActiveFilters =
		selectedPlatform || selectedType || sortBy !== "newest";

	return (
		<div className="mb-8 space-y-4">
			{/* Filter Controls */}
			<div className="flex flex-col sm:flex-row gap-4 flex-wrap">
				{/* Platform Filter */}
				<div className="flex-1 min-w-[200px]">
					<label className="block text-sm font-semibold text-foreground mb-2">
						Platform
					</label>
					<select
						value={selectedPlatform}
						onChange={e => setSelectedPlatform(e.target.value)}
						className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="">All Platforms</option>
						{PLATFORMS.map(platform => (
							<option key={platform} value={platform}>
								{platform}
							</option>
						))}
					</select>
				</div>

				{/* Type Filter */}
				<div className="flex-1 min-w-[200px]">
					<label className="block text-sm font-semibold text-foreground mb-2">
						Type
					</label>
					<select
						value={selectedType}
						onChange={e => setSelectedType(e.target.value)}
						className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="">All Types</option>
						{TYPES.map(type => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>

				{/* Sort */}
				<div className="flex-1 min-w-[200px]">
					<label className="block text-sm font-semibold text-foreground mb-2">
						Sort By
					</label>
					<select
						value={sortBy}
						onChange={e => setSortBy(e.target.value)}
						className="w-full bg-card border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					>
						{SORT_OPTIONS.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				{/* Clear Filters Button */}
				{hasActiveFilters && (
					<div className="flex items-end">
						<button
							onClick={() => {
								setSelectedPlatform("");
								setSelectedType("");
								setSortBy("newest");
							}}
							className="flex items-center gap-2 bg-muted text-foreground hover:bg-muted/80 px-4 py-2 rounded-lg transition-colors font-semibold"
						>
							<X className="w-4 h-4" />
							Clear
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
