export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>© 2025 ClaimZone - All rights reserved</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              Data provided by{" "}
              <a
                href="https://www.gamerpower.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GamerPower.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
