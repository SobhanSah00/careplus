import {z} from "zod"

const UserFormSchema = z.object({
    name: z.string()
        .min(2, "Username must be at least 2 characters.")
        .max(30, "name must not be excided 30 charecter."),
    email: z.string()
        .email("Email must be a valid email address."),
    phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone),
    'invalid Phone number'
    )
})

export  {UserFormSchema}