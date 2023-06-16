"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { Icons } from "../Icons"
import { useToast } from "@/hooks/use-toast"

const GoogleAuth: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { toast } = useToast()

	const loginWithGoogle = async () => {
		setIsLoading(true)
		try {
			await signIn("google")
		} catch (error) {
			// Todo: add toast notification
			toast({
				title: "Uh oh! Something went wrong.",
				description: "An error occurred while trying to sign in with Google.",
				variant: "destructive",
				action: (
					<Button className="h-[34px] shrink-0 px-2 text-xs" variant="outline" onClick={() => loginWithGoogle}>
						Try again
					</Button>
				),
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button onClick={loginWithGoogle} disabled={isLoading} variant="outline" className="w-full">
			{isLoading ? (
				<Loader2 className="mr-2 animate-spin text-accent-foreground" size={17} />
			) : (
				<Icons.google className="mr-2 h-4 w-4 text-accent-foreground" />
			)}
			<span>Continue with Google</span>
		</Button>
	)
}

export default GoogleAuth
