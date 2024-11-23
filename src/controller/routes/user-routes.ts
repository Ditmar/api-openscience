import express from 'express';
import { UserWrapper } from '../../data/interfaces/user-wrapper';
import {schemaValidationMiddleware} from '../../middlewares/schemaValidator.middleware';
import {userWrapperPostSchema, userWrapperPutSchema} from '../../schemas/users.schema'

const UserRoutes = (database: UserWrapper) => {
    const userRoutes = express.Router();
    userRoutes.get('/users', async (req, res) => {
        // Create a new user
        const userList = await database.find();
        res.status(201).json({ userList });
    });
    userRoutes.post('/users', schemaValidationMiddleware(userWrapperPostSchema), async (req, res) => {
        // Create a new user
        const user = await database.create(req.body);
        res.status(201).json({ user });
    });
    userRoutes.get('/users/:id', async (req, res) => {
        // Get a user by id
        const user = await database.findById(req.params.id);
        res.status(200).json({ user });
    });
    userRoutes.put('/users/:id', schemaValidationMiddleware(userWrapperPutSchema), async (req, res) => {
        // Update a user by id
        const user = await database.update(req.body, req.params.id);
        res.status(200).json({ user });
    });
    userRoutes.delete('/users/:id', async (req, res) => {
        // Delete a user by id
        const user = await database.remove(req.params.id);
        res.status(200).json({ user });
    });

    return userRoutes;
}
export default UserRoutes;