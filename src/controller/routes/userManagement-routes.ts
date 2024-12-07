import express from 'express';
import { UserWrapper } from '../../data/interfaces/userManagement-wrapper';
import { schemaValidationMiddleware } from '../../middlewares/schemaValidator.middleware';
import { userManagementWrapperPostSchema, userManagementWrapperPutSchema } from '../../schemmas/userManagement.schema'
import { UserManagementModel } from '../../data/interfaces/userManagement-model';

const UserManagementRoutes = (database: UserWrapper) => {
    const userManagementRoutes = express.Router();
    userManagementRoutes.get('/users-management', async (req, res) => {
        try {
            //const userList = await database.find();
            let limitData: number | null;
            let { limit }= req.query;
            limitData = limit? Number.parseInt(limit as string) : null;
            const userList = limitData? 
            await database.findByQuery(limitData) : await database.find();
            if (!userList) {
                res.status(404).json({ message: 'No user found' });
            }
            res.status(201).json({ userList });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

    userManagementRoutes.post('/users-management', schemaValidationMiddleware(userManagementWrapperPostSchema), async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const userData = {
                username, email, password,
                blocked: false, confirmed: false, role: []
            } as UserManagementModel;

            const user = await database.create(userData);
            res.status(201).json({ user });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

    userManagementRoutes.get('/users-management/:id', async (req, res) => {
        try {
            const user = await database.findById(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

    userManagementRoutes.put('/users-management/:id', schemaValidationMiddleware(userManagementWrapperPutSchema), async (req, res) => {
        try {
            const user = await database.update(req.body, req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

    userManagementRoutes.delete('/users-management/:id', async (req, res) => {
        try {
            const user = await database.remove(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
    return userManagementRoutes;
}

export default UserManagementRoutes;