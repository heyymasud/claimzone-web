export interface UserStats {
    totalClaimed: number
    totalWorth: number
    claimedGiveaways: number[]
    username: string
}

export interface User {
    id: string
    username: string
    email: string
    createdAt: number
}