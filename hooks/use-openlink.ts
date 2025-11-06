import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useOpenLink() {
	const router = useRouter();

	const openLink = useCallback(
		(url: string, newTab?: boolean) => {
			if (!url) {
				return;
			}
			try {
				if (newTab) {
					window.open(url, "_blank", "noopener,noreferrer");
				} else {
					router.push(url);
				}
			} catch (error) {
				console.log("Failed to open link", error);
			}
		},
		[router]
	);

	return {
		openLink,
	};
}
