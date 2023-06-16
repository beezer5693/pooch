"use client"

import { FC, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { UseThemeProps } from "next-themes/dist/types"
import UserAuthSignInForm from "@/components/auth/AuthSigninForm"
import GoogleAuth from "@/components/auth/GoogleAuth"
import DiscordAuth from "@/components/auth/DiscordAuth"
import Link from "next/link"
import Logo from "@/components/Logo"

const SignIn: FC = () => {
	const [mounted, setMounted] = useState<boolean>(false)
	const { theme }: UseThemeProps = useTheme()

	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	return (
		<div className="relative flex h-screen items-center bg-background md:px-0">
			<div className="flex h-full w-full flex-col items-center gap-10 px-8 pt-10 sm:px-32 md:basis-2/3 md:justify-center md:pt-0">
				<div className="w-full max-w-sm pb-2 md:hidden">
					<Link href="/">
						<Logo theme={theme} width={40} height={40} />
					</Link>
				</div>
				<div className="relative flex max-h-[800px] w-full max-w-sm flex-col items-center justify-between gap-10 rounded-2xl">
					<div className="w-full space-y-6">
						<div className="w-full space-y-1">
							<h1 className="text-foreground-primary self-start text-[1.35rem] font-medium">Sign in</h1>
							<p className="text-sm text-muted-foreground">
								New to Pooch?{" "}
								<Link className="font-medium" href={"/sign-up"}>
									<span className="text-sky-500 dark:text-sky-400">Sign up for an account</span>.
								</Link>
							</p>
						</div>
						<div className="mt-3 space-y-7">
							<UserAuthSignInForm />
							<div className="flex items-center gap-3">
								<div className="flex-1 border-t"></div>
								<p className="text-xs text-muted-foreground">OR CONTINUE WITH</p>
								<div className="flex-1 border-t"></div>
							</div>
							<div className="flex gap-4">
								<GoogleAuth />
								<DiscordAuth />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden h-full w-full flex-1 flex-col gap-5 md:flex">
				<div className="flex-1 border-l dark:border-border/50"></div>
				<div className="flex w-full -translate-x-1/2 justify-center">
					<Link href="/" className="ring-transparent">
						<Logo theme={theme} width={50} height={50} />
					</Link>
				</div>
				<div className="flex-1 border-l dark:border-border/50"></div>
			</div>
		</div>
	)
}

export default SignIn
