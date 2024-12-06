import { z } from 'zod';

export const siteSchema = z.object({
    Title: z.string().nonempty(),
    Lenguaje: z.string().nonempty(),
    Author: z.string().url(),
    Types: z.string().nonempty(),
})
