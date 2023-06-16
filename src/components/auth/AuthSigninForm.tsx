"use client"

import { FC, useEffect, useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSignInSchema } from "@/lib/formValidation"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { signIn } from "next-auth/react"
import { toast } from "@/hooks/use-toast"

const UserAuthSignInForm: FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// 1. Define your form.
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

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof authSignInSchema>) => {
		setIsLoading(true)
		try {
			await signIn("credentials", values)
		} catch (error: any) {
			toast({
				title: "An error occurred.",
				description: "Invalid credentials",
				variant: "destructive",
			})
		} finally {
			setIsLoading(false)
		}
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
						{isLoading && <Loader2 className="mr-2 animate-spin text-primary-foreground" size={17} />}
						<span>{isLoading ? "Signing in..." : "Sign in"}</span>
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default UserAuthSignInForm
