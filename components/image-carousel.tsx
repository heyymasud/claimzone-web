"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  images: string[]
}

export default function ImageCarousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Filter out invalid images and ensure we have at least one
  const validImages = images.filter((img) => img && img.trim() !== "")

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, validImages.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  if (validImages.length === 0) {
    return (
      <div className="w-full h-64 sm:h-140 bg-linear-to-r from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-64 sm:h-140 rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {validImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Carousel slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = "/gaming-giveaway.jpg"
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 bg-linear-to-r from-accent/0 via-accent/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}

      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-accent/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % validImages.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-accent/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm">
        {validImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
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
        {currentIndex + 1} / {validImages.length}
      </div>
    </div>
  )
}
