import {z} from 'zod';

export const roleWrapperPostSchema = z.object({
    body: z.object({
        roleType: z.string().nonempty('role is required'),
    })    
});

export const roleWrapperPutSchema = z.object({
    body: z.object({
        roleType: z.string().nonempty('role is required'),
    }),
    params: z.object({
        id: z.string(),
    }),
});