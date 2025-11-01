"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            if (currentPage > 3) {
                pages.push("...")
            }

            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push("...")
            }

            pages.push(totalPages)
        }

        return pages
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 mt-16 mb-12">
            <div className="text-center">
                <p className="text-sm text-foreground/60">
                    Page <span className="font-bold text-primary">{currentPage}</span> of{" "}
                    <span className="font-bold text-primary">{totalPages}</span>
                </p>
            </div>

            <div className="flex items-center justify-center lg:gap-3 sm:gap-2 gap-1">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="group relative md:p-3 p-2 rounded-xl bg-linear-to-br from-secondary to-secondary/50 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                    aria-label="Previous page"
                >
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <ChevronLeft className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-x-0.5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center md:gap-2 gap-1 px-2">
                    {getPageNumbers().map((page, index) => (
                        <button
                            key={index}
                            onClick={() => typeof page === "number" && onPageChange(page)}
                            disabled={page === "..."}
                            className={`
                relative md:px-3 md:py-2 px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-300 md:text-sm text-xs
                ${page === currentPage
                                    ? "bg-linear-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/50 scale-110"
                                    : page === "..."
                                        ? "cursor-default text-foreground/40"
                                        : "bg-secondary/50 hover:bg-secondary text-foreground hover:text-foreground hover:scale-105 hover:shadow-md hover:shadow-primary/20"
                                }
              `}
                        >
                            {page === currentPage && (
                                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/20 to-primary/0 blur-lg -z-10" />
                            )}
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="group relative md:p-3 p-2 rounded-xl bg-linear-to-br from-secondary to-secondary/50 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                    aria-label="Next page"
                >
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>

            <div className="w-full max-w-xs h-1.5 bg-secondary/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                    style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
            </div>
        </div>
    )
}
