import { NextFunction, Request, Response } from 'express';
import { siteSchema } from '../schemmas/site.schema';
import { StatusCodes } from 'http-status-codes';

export const validateSite = (req: Request, res: Response, next: NextFunction) => {
    const result = siteSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.errors.map((o) => ({
            field: o.path[0],
            message: o.message
        }));
        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
    
    next();
};