"use client"

import Image from "next/image"
import { UseThemeProps } from "next-themes/dist/types"
import Link from "next/link"

type LogoProps = {
	theme: UseThemeProps["theme"]
	width: number
	height: number
}

export default function Logo({ theme, width, height }: LogoProps) {
	let src

	switch (theme) {
		case "light":
			src = "/logo-light.png"
			break
		case "dark":
			src = "/logo-dark.png"
			break
		default:
			src = "/logo-light.png"
			break
	}

	return (
		<Link href="/">
			<Image priority src={src} width={width} height={height} alt="logo" />
		</Link>
	)
}
