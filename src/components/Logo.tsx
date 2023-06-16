"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { UseThemeProps } from "next-themes/dist/types"

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

	return <Image priority src={src} width={width} height={height} alt="logo" />
}
