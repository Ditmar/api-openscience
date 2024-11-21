import {z} from 'zod';

export const userWrapperPostSchema = z.object({
    body: z.object({
        name: z.string().nonempty('Name is required'),
        email: z.string().email().nonempty('Email is required'),
    })    
});

export const userWrapperPutSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
    }),
    params: z.object({
        id: z.string(),
    }),
});