"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Icons } from "../Icons"
import { useToast } from "@/hooks/use-toast"
import { signIn } from "next-auth/react"

export default function DiscordAuth() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { toast } = useToast()

	const loginWithDiscord = async () => {
		setIsLoading(true)
		try {
			await signIn("discord")
		} catch (error) {
			// Todo: add toast notification
			toast({
				title: "Uh oh! Something went wrong.",
				description: "An error occurred while trying to sign in with Discord.",
				variant: "destructive",
				action: (
					<Button className="h-[34px] shrink-0 px-2 text-xs" variant="outline" onClick={loginWithDiscord}>
						Try again
					</Button>
				),
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button onClick={loginWithDiscord} disabled={isLoading} variant="outline" className="w-full">
			{isLoading ? (
				<span className="loading loading-spinner loading-xs mr-2 text-accent-foreground"></span>
			) : (
				<Icons.discord className="mr-2 h-5 w-5 text-accent-foreground" />
			)}
			<span>Discord</span>
		</Button>
	)
}
