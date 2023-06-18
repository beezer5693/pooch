"use client"

import { FC, useEffect, useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSignUpSchema } from "@/lib/formValidation"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { usePasswordValidation } from "@/hooks/usePasswordValidation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { signIn } from "next-auth/react"
import PasswordValidationProgress from "../PasswordValidationProgress"

const AuthSignUpForm: FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [password, setPassword] = useState<string>("")
	const [percentage, setPercentage] = useState<number>(0)

	const { status } = useSession()
	const router = useRouter()
	const { toast } = useToast()

	// Check if user is authenticated, if so redirect to home page.
	useEffect(() => {
		status === "authenticated" && router.push("/")
	}, [router, status])

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
		watch,
		formState: { errors },
	} = form

	// Watch for changes in the password input field.
	const passwordInput = watch("password")
	// Check if the password input field is valid.
	const passwordValidationCheck = usePasswordValidation(password)

	// Set the password state to the password input field.
	useEffect(() => {
		setPassword(passwordInput)
	}, [passwordInput])

	// Calculate the percentage of the password validation check.
	// Used to display the password strength in the radial progress bar.
	useEffect(() => {
		const percentage = passwordValidationCheck.reduce((acc, curr) => {
			if (curr.isValidated === true) {
				return acc + 1
			}
			return acc
		}, 0)

		setPercentage(percentage * 20)
	}, [password, passwordValidationCheck])

	// Handle form submission.
	const onSubmit = (values: z.infer<typeof authSignUpSchema>) => {
		setIsLoading(true)

		fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then(() => {
				signIn("credentials", {
					...values,
					redirect: false,
				})
			})
			.catch(error => {
				toast({
					title: "Uh oh! Something went wrong.",
					description: error.response.data.message,
					variant: "destructive",
				})
				setIsLoading(false)
			})
			.finally(() => setIsLoading(false))
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
							<div className="flex w-full items-center justify-between">
								<FormLabel>Password</FormLabel>
								{percentage > 0 && <PasswordValidationProgress percentage={percentage} password={password} />}
							</div>
							<FormControl>
								<div className="relative">
									<Input
										disabled={isLoading}
										className={cn(errors.password && "border-destructive")}
										type={showPassword ? "text" : "password"}
										{...field}
										required
									/>
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
						{isLoading && <span className="loading loading-spinner loading-xs mr-2 text-primary-foreground"></span>}
						<span>Create account</span>
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default AuthSignUpForm
