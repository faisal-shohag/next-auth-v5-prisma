import { z }  from 'zod'

export const updateProfileSchema = z.object({
    name: z.string().min(1,  "Cannot be empty")
})

