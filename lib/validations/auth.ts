import {z} from "zod"

/* Login Schemas */
export const loginSchema = z.object({
    email: z.string().min(1, "Email address is required").email("please enter a valid email address"),
    password: z.string().min(1, "password is required").min(8, "password must be atleast 8 characters")
})

export type LoginFormValues = z.infer<typeof loginSchema>

/* Signup Schemas */
export const signupSchema = z.object({
    fullName: z.string().min(1, "Full name is required").min(2, "name must be atleast 2 characters"),
    email: z.string().email('must be a proper email').min(1,'Email address is required'),
    password: z.string().min(1,'password is required').min(8, "password must be 8 characters atleast"),
    confirmPassword: z.string().min(1,'password is required').min(8, "password must be 8 characters atleast")
}).refine(data => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
})

export type SignupFormValues = z.infer<typeof signupSchema>

/* Forget password schema for form validation */
export const forgetPasswordSchema = z.object({
    email: z.string().min(1, "email address is required").email("Please enter a valid email address")
})

export type ForgetPasswordValues = z.infer<typeof forgetPasswordSchema>