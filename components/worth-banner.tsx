export default function WorthBanner({ count, worth }: { count: number; worth: string }) {
  return (
    <div className="bg-linear-to-r from-primary to-secondary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm font-semibold opacity-90">Total Active Giveaways</p>
            <p className="text-3xl font-bold">{count} giveaways</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold opacity-90">Total Worth</p>
            <p className="text-3xl font-bold">$ {worth}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
