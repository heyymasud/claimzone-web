"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Giveaway } from "@/types/giveaway"
import Link from "next/link"

interface CarouselProps {
  giveaways: Giveaway[]
}

export default function ImageCarousel({ giveaways }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Filter out invalid giveaways
  const validGiveaways = giveaways.filter((g) => (g.image || g.thumbnail) && g.title)

  useEffect(() => {
    if (!isAutoPlay || validGiveaways.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validGiveaways.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, validGiveaways.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  if (validGiveaways.length === 0) {
    return (
      <div className="w-full h-64 sm:h-140 bg-linear-to-r from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  const currentGiveaway = validGiveaways[currentIndex]
  const imageUrl = currentGiveaway.image || currentGiveaway.thumbnail

  // Truncate description to 100 characters with ellipsis
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
    <div
      className="relative w-full h-64 sm:h-140 rounded-xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {validGiveaways.map((giveaway, index) => (
        <Link key={index} href={`/giveaway/${currentGiveaway.id}`} className="absolute inset-0">
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={giveaway.title}
              fill
              className="object-cover"
              priority={index === 0}
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.src = "/gaming-giveaway.jpg"
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 p-4 sm:p-6 text-white">
              <h2 className="text-lg sm:text-2xl font-bold mb-2 line-clamp-2 text-balance">{giveaway.title}</h2>
              <p className="text-sm sm:text-base text-gray-200 line-clamp-2">
                {truncateText(giveaway.description, 300)}
              </p>
            </div>

            <div className="absolute inset-0 bg-linear-to-r from-accent/0 via-accent/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>
      ))}

      <button
        onClick={(e) => {
          e.preventDefault()
          setCurrentIndex((prev) => (prev - 1 + validGiveaways.length) % validGiveaways.length)
          setIsAutoPlay(false)
        }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-accent/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault()
          setCurrentIndex((prev) => (prev + 1) % validGiveaways.length)
          setIsAutoPlay(false)
        }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-accent/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm">
        {validGiveaways.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              goToSlide(index)
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "bg-accent w-8 h-2 shadow-lg shadow-accent/50"
                : "bg-white/40 hover:bg-white/70 w-2 h-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-linear-to-r from-accent/80 to-primary/80 text-accent-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
        {currentIndex + 1} / {validGiveaways.length}
      </div>
    </div>
  )
}
