"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Loader2 } from "lucide-react"
import { Icons } from "../Icons"

export default function DiscordAuth() {
	const [loading, setLoading] = useState(false)

	return (
		<Button disabled={loading} variant="outline" className="w-full">
			{loading ? (
				<Loader2 className="mr-2 animate-spin text-accent-foreground" size={17} />
			) : (
				<Icons.discord className="mr-2 h-5 w-5 text-accent-foreground" />
			)}
			<span>Continue with Discord</span>
		</Button>
	)
}
