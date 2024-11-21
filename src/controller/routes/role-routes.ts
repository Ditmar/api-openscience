import express from 'express';
import { RoleWrapper } from '../../data/interfaces/role-wrapper';
import {schemaValidationMiddleware} from '../../middlewares/schemaValidator.middleware';
import {roleWrapperPostSchema, roleWrapperPutSchema} from '../../schemmas/role.schema'

const roleRoute = (database: RoleWrapper) => {
    const roleRoute = express.Router();
    roleRoute.get('/role', async (req, res) => {
        // Create a new user
        const roleList = await database.find();
        res.status(201).json({ roleList });
    });
    roleRoute.post('/role', schemaValidationMiddleware(roleWrapperPostSchema),async (req, res) => {
        // Create a new user
        const role = await database.create(req.body);
        res.status(201).json({ role });
    });
    roleRoute.get('/role/:id', async (req, res) => {
        // Get a user by id
        const role = await database.findById(req.params.id);
        res.status(200).json({ role });
    });
    roleRoute.put('/role/:id', schemaValidationMiddleware(roleWrapperPutSchema),async (req, res) => {
        // Update a user by id
        const role = await database.update(req.body, req.params.id);
        res.status(200).json({ role });
    });
    roleRoute.delete('/role/:id', async (req, res) => {
        // Delete a user by id
        const role = await database.remove(req.params.id);
        res.status(200).json({ role });
    });

    return roleRoute;
}
export default roleRoute;