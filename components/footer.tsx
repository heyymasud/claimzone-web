"use client"
import { Github, Linkedin, Instagram, ExternalLink } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/50 bg-linear-to-b from-background via-background to-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                Built by
              </h3>
              <p className="text-2xl font-bold text-foreground">M Mas'ud Yunus</p>
              <p className="text-sm text-muted-foreground mt-1">Full Stack Developer</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafting modern web experiences with a passion for gaming and open-source.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Connect</h4>
            <div className="flex flex-col gap-3">
              {/* <a
                href="https://github.com/heyymasud"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a> */}
              <a
                href="https://www.linkedin.com/in/masudyns"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/masudyns"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">About</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.gamerpower.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
              >
                <span className="text-sm">Data by GamerPower</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="/about"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
              >
                <span className="text-sm">About ClaimZone</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© {currentYear} ClaimZone - Claim Free Games & Giveaways</p>
          <p className="text-xs text-muted-foreground">
            Designed & Developed with <span className="text-primary">♥</span> for gamers
          </p>
        </div>
      </div>
    </footer>
  )
}
