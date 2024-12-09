import { UserWrapper } from '../data/interfaces/userManagement-wrapper';
import { Db, ObjectId } from 'mongodb';
import { UserManagementModel } from '../data/interfaces/userManagement-model';
import { RemoveType } from '../data/interfaces/common/remove-type';

const UserManagementQueries = (db: Db): UserWrapper => {
    const find = async (): Promise<UserManagementModel[]> => {
        const users = await db.collection('users_management').find().toArray() as unknown as UserManagementModel[];
        return users;
    }

    const findById = async (id: string): Promise<UserManagementModel> => {
        const user = await db.collection('users_management').findOne({ _id: new ObjectId(id) }) as unknown as UserManagementModel;
        return user;
    }

    const create = async (userData: UserManagementModel): Promise<ObjectId> => {
        const user = (await db.collection('users_management').insertOne(userData)).insertedId;
        return user;
    }

    const update = async (userData: UserManagementModel, id: string): Promise<UserManagementModel> => {
        const user: UserManagementModel = await db.collection('users_management').updateOne({ _id: new ObjectId(id) }, { $set: userData }) as unknown as UserManagementModel;
        return user;
    }

    const remove = async (id: string): Promise<RemoveType> => {
        const user: RemoveType = await db.collection('users_management').deleteOne({ _id: new ObjectId(id) }) as unknown as RemoveType;
        return user;
    }

    const findByQuery = async (limit: number): Promise<UserManagementModel[]> => {
        
        console.log("limit print parameters ", limit)
        const user= await db.collection('users_management').find({
        }, {limit}).toArray() as unknown as UserManagementModel[];
        return user;
    } 

    return {
        find,
        findById,
        create,
        update,
        remove,
        findByQuery
    }
}

export default UserManagementQueries;