"use client"

import { FC, ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"

const Providers = ({ children, ...props }: ThemeProviderProps) => {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<NextThemesProvider {...props}>{children}</NextThemesProvider>
			</SessionProvider>
		</QueryClientProvider>
	)
}

export default Providers
