"use client"

import { useEffect, useState, FC } from "react"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSignInSchema } from "@/lib/formValidation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"

const AuthSignInForm: FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const session = useSession()
	const router = useRouter()
	const { toast } = useToast()

	useEffect(() => {
		session.status === "authenticated" && router.push("/")
	}, [router, session])

	const form = useForm<z.infer<typeof authSignInSchema>>({
		resolver: zodResolver(authSignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const {
		formState: { errors },
	} = form

	const onSubmit = (values: z.infer<typeof authSignInSchema>) => {
		setIsLoading(true)
		signIn("credentials", {
			...values,
			redirect: false,
		})
			.then(callback => {
				if (callback?.error) {
					toast({
						title: "Invalid login credentials",
						description:
							"The email and password you entered did not match our records. Please double-check and try again.",
						variant: "destructive",
					})
					setIsLoading(false)
				}
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<div className="relative">
									<Input disabled={isLoading} className={cn(errors.email && "border-destructive")} {...field} />
									{errors.email && (
										<AlertCircle
											className="absolute right-3 top-1/2 -translate-y-1/2 stroke-[1.5px] text-destructive"
											size={20}
										/>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										disabled={isLoading}
										className={cn(errors.password && "border-destructive")}
										type={showPassword ? "text" : "password"}
										{...field}
									/>
									{showPassword ? (
										<EyeOff
											onClick={() => setShowPassword(false)}
											className={cn(
												"absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer stroke-[1.5px] text-muted-foreground transition duration-300 ease-out hover:text-accent-foreground"
											)}
											size={20}
										/>
									) : (
										<Eye
											onClick={() => setShowPassword(true)}
											className={cn(
												"absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer stroke-[1.5px] text-muted-foreground transition duration-300 ease-out hover:text-accent-foreground"
											)}
											size={20}
										/>
									)}
									{errors.password && (
										<AlertCircle
											className="absolute right-10 top-1/2 -translate-y-1/2 stroke-[1.5px] text-destructive"
											size={20}
										/>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="pt-4">
					<Button disabled={isLoading} className="w-full disabled:opacity-70" type="submit">
						{isLoading && <span className="loading loading-spinner loading-xs mr-2 text-primary-foreground"></span>}
						<span>{isLoading ? "Signing in..." : "Sign in"}</span>
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default AuthSignInForm
