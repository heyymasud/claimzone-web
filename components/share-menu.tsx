"use client"

import { useState, useRef, useEffect } from "react"
import { Share2, Twitter, Facebook, Copy, Check, Mail, Send } from "lucide-react"

interface ShareMenuProps {
    title: string
    url: string
}

export function ShareMenu({ title, url }: ShareMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const shareOptions = [
        {
            name: "Twitter",
            icon: Twitter,
            color: "hover:text-blue-400",
            action: () => {
                const text = `Check out this free giveaway: ${title} on FreeLoots.gg`
                const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
                window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer")
            },
        },
        {
            name: "Facebook",
            icon: Facebook,
            color: "hover:text-blue-600",
            action: () => {
                const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer")
            },
        },
        {
            name: "Telegram",
            icon: Send,
            color: "hover:text-blue-500",
            action: () => {
                const text = `${title} - Check this out on FreeLoots.gg`
                const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
                window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer")
            },
        },
        {
            name: "WhatsApp",
            icon: "💬",
            color: "hover:text-green-500",
            action: () => {
                const text = `Check out this free giveaway: ${title} on FreeLoots.gg ${url}`
                const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
                window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer")
            },
        },
        {
            name: "Email",
            icon: Mail,
            color: "hover:text-red-400",
            action: () => {
                const subject = `Check out this giveaway: ${title}`
                const body = `I found this awesome free giveaway on FreeLoots.gg: ${title}\n\nCheck it out here: ${url}`
                const shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                window.location.href = shareUrl
            },
        },
        {
            name: "Copy Link",
            icon: Copy,
            color: "hover:text-accent",
            action: () => {
                navigator.clipboard.writeText(url)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            },
        },
    ]

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex-1 bg-muted text-foreground font-bold py-3 px-6 rounded-lg hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
            >
                <Share2 className="w-5 h-5" />
                Share
            </button>

            {isOpen && (
                <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 z-40 max-h-96 overflow-y-auto">
                    {shareOptions.map((option) => {
                        const Icon = typeof option.icon === "string" ? null : option.icon
                        const emoji = typeof option.icon === "string" ? option.icon : null

                        return (
                            <button
                                key={option.name}
                                onClick={() => {
                                    option.action()
                                    if (option.name !== "Copy Link" && option.name !== "Discord" && option.name !== "Instagram") {
                                        setIsOpen(false)
                                    }
                                }}
                                className={`w-full px-4 py-3 flex items-center gap-3 text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors text-left whitespace-nowrap ${option.color}`}
                            >
                                {option.name === "Copy Link" && copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-green-400" />
                                        <span className="text-green-400">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        {Icon ? <Icon className="w-4 h-4" /> : <span className="text-lg">{emoji}</span>}
                                        <span>{option.name}</span>
                                    </>
                                )}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
