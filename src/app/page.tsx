"use client"

import { Button } from "@/components/ui/Button"
import { useTheme } from "next-themes"
import { UseThemeProps } from "next-themes/dist/types"
import { useEffect, useState } from "react"

export default function Home() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme }: UseThemeProps = useTheme()

	useEffect(() => setMounted(true), [])

	if (!mounted) return null
	return (
		<div className="mt-10 flex w-full justify-center">
			<Button onClick={() => setTheme("dark")}>dark</Button>
			<Button onClick={() => setTheme("light")}>light</Button>
		</div>
	)
}
