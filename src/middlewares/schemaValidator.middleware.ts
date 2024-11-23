import { log } from 'console';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const schemaValidationMiddleware =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {

                schema.parse({
                    body: req.body,
                    params: req.params,
                    file: req.file
                });

                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    log(`Validation error: ${JSON.stringify({
                        errors: error.errors,
                        body: req.body,
                        params: req.params,
                    })}`);
                    res.status(StatusCodes.BAD_REQUEST).json(error);
                } else {
                    log(`Unexpected error: ${JSON.stringify(error)}`);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
                }
            }

        }