import { z } from 'zod';

export const seoSchema = z.object({
    meta_title: z.string().nonempty(),
    og_title: z.string().nonempty(),
    og_url: z.string().url(),
    meta_description: z.string().nonempty(),
    og_type: z.string().nonempty(),
    og_image: z.string().optional(),
    og_image_height: z.number().optional().refine((val:any) => val !== undefined, {
        message: "og_image_height is required when og_image is present",
        path: ["og_image"]
    }),
    og_image_width: z.number().optional().refine((val:any) => val !== undefined, {
        message: "og_image_width is required when og_image is present",
        path: ["og_image"]
    })
}).refine((data:any) => !(data.og_image && (!data.og_image_height || !data.og_image_width)), {
    message: "Both og_image_height and og_image_width are required if og_image is present",
    path: ["og_image"]
});
