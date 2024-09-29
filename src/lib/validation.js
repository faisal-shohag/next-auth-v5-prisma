import { z }  from 'zod'

export const updateProfileSchema = z.object({
    name: z.string().min(1,  "Cannot be empty")
})

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})


export const signUpSchema = signInSchema.extend({
    name: z.string().min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 20 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})