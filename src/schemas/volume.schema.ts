import { z } from 'zod';
import { MAX_FILE_SIZE, FILE_TYPES } from '../utils/constants';

export const volumeWrapperPostSchema = z.object({
    body: z.object({
        title: z.string().nonempty('Title is required'),
        // date: z.date({ message: 'Date is required', }),
        article: z.string().nonempty('Article is required'),
        year_volume: z.string().nonempty('Year Volume is required'),
    }),
    file: z.object({
        mimetype: z.string().refine(
            (type) => FILE_TYPES.includes(type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.'
        ),
        size: z.number().refine(
            (size) => size <= MAX_FILE_SIZE,
            'File size is too large'
        ),
    }),
});

export const volumeWrapperPutSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        // date: z.date({ message: 'Date is required', }).optional(),
        article: z.string().optional(),
        year_volume: z.string().optional(),
    }),
    file: z.object({
        mimetype: z.string().refine(
            (type) => FILE_TYPES.includes(type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.'
        ),
        size: z.number().refine(
            (size) => size <= MAX_FILE_SIZE,
            'File size is too large'
        ),
    }),
    params: z.object({
        id: z.string(),
    }),
})