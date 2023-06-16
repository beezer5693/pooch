"use client"

import { FC, useEffect, useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSignUpSchema } from "@/lib/formValidation"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { toast } from "@/hooks/use-toast"

const UserAuthSignUpForm: FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// 1. Define your form.
	const form = useForm<z.infer<typeof authSignUpSchema>>({
		resolver: zodResolver(authSignUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			agreement: false,
		},
	})

	const {
		formState: { errors },
	} = form

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof authSignUpSchema>) => {
		setIsLoading(true)

		try {
			await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})

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
					name="name"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<div className="relative">
									<Input disabled={isLoading} className={cn(errors.name && "border-destructive")} {...field} required />
									{errors.name && (
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
					name="email"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										disabled={isLoading}
										className={cn(errors.email && "border-destructive")}
										{...field}
										required
									/>
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
										required
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
				<div className="pt-3">
					<p className="text-xs text-muted-foreground">
						By registering, you agree to the processing of your personal data by Pooch as described in the{" "}
						<Link href={"/legal/privacy"}>
							<span className="text-sky-500">Privacy Policy</span>
						</Link>
						.
					</p>
				</div>
				<div className="pt-1">
					<FormField
						control={form.control}
						name="agreement"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md">
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} required />
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel className="text-sm font-normal">
										<span className="text-primary">{`I've read and agree to the `}</span>
										<Link href={"/legal/agreement"}>
											<span className="text-sky-500">Terms of Service</span>
										</Link>
									</FormLabel>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="pt-3.5">
					<Button disabled={isLoading} className="w-full disabled:opacity-70" type="submit">
						{isLoading && <Loader2 className="mr-2 animate-spin text-primary-foreground" size={17} />}
						<span>Create account</span>
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default UserAuthSignUpForm
