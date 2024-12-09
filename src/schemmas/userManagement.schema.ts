import { z } from 'zod';


export const userManagementWrapperPostSchema = z.object({
    body: z.object({
        username: z.string().min(3, {
            message: 'Username must be at least 3 characters long'
        }).nonempty('Username is required'),
        email: z.string().email().min(6, {
            message: 'Email must be at least 6 characters long'
        }).nonempty('Email is required'),
        password: z.string().min(6, {
            message: 'Email must be at least 6 characters long'
        }).nonempty('Password is required'),
        confirmed: z.boolean().default(false),
        blocked: z.boolean().default(false),
        role: z.array(z.string()).default([]),
    })
})

export const userManagementWrapperPutSchema = z.object({
    body: z.object({
        username: z.string().min(3, {
            message: 'Username must be at least 3 characters long'
        }).nonempty('Username is required'),
        email: z.string().email().min(6, {
            message: 'Email must be at least 6 characters long'
        }).nonempty('Email is required'),
        password: z.string().min(6, {
            message: 'Email must be at least 6 characters long'
        }).nonempty('Password is required'),
        confirmed: z.boolean().default(false),
        blocked: z.boolean().default(false),
        role: z.array(z.string()).default([]),
    }),
    params: z.object({
        id: z.string(),
    })
})