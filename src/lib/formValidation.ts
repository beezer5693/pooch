import { ZodType, z } from "zod"

export type AuthFormType = {
	name: string
	email: string
	password: string
	agreement?: boolean
}

export const authSignUpSchema: ZodType<AuthFormType> = z.object({
	name: z
		.string()
		.nonempty("Name is required")
		.max(100, { message: "Name must be less than 100 characters" })
		.refine(val => /^[a-zA-Z\s]+$/.test(val), "Name must contain only letters"),
	email: z.string().nonempty("Email is required").email({ message: "Invalid email address" }),
	password: z
		.string()
		.nonempty("Password is required")
		.min(8, "Password must be at least 8 characters")
		.refine(val => /[A-Z]/.test(val), "Password must contain at least 1 uppercase letter"),
	// .refine(val => /[a-z]/.test(val), "Password must contain at least 1 lowercase letter")
	// .refine(val => /[0-9]/.test(val), "Password must contain at least 1 number")
	// .refine(val => /[^A-Za-z0-9]/.test(val), "Password must contain at least 1 symbol"),
	agreement: z
		.boolean()
		.default(false)
		.refine(val => val, "You must agree to the Terms of Service"),
})

export const authSignInSchema: ZodType<Partial<AuthFormType>> = z.object({
	email: z.string().nonempty("Email is a required field").email({ message: "Invalid email address" }),
	password: z.string().nonempty("Password is a required field"),
})
