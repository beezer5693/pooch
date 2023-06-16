import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/Provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/Toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Pooch",
	description: "Find the best local dog trainers",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("min-h-screen bg-background", inter.className)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="relative flex min-h-screen flex-col">
						<div className="flex-1">{children}</div>
					</div>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
