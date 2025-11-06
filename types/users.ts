export interface UserStats {
	user_id?: string;
	total_claimed: number;
	total_worth: number;
	claimed_giveaways: number[];
	username: string;
}

export interface User {
	id: string;
	username: string;
	email: string;
	createdAt: number;
}
