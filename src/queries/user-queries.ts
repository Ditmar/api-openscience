import { UserWrapper } from '../data/interfaces/user-wrapper';
import { Db, ObjectId } from 'mongodb';
import { UserModel } from '../data/interfaces/user-model';
import { RemoveType } from '../data/interfaces/common/remove-type';

// delete(id: string): UserModel;
const UserQueries = (db: Db): UserWrapper  => {
    const find = async():Promise<UserModel[]> => {
        const result: UserModel[] = await db.collection('users').find().toArray() as unknown as UserModel[];
        return result;
    }
    const findById = async(id: string): Promise<UserModel> => {
        const result: UserModel = await db.collection('users').findOne({ _id: new ObjectId(id) }) as unknown as UserModel;
        return result;
    }
    const create = async(user: UserModel): Promise<ObjectId>  => {

        const newUser: ObjectId = (await db.collection('users').insertOne(user)).insertedId;
        return newUser;
    }
    const update = async(user: UserModel, id: string): Promise<UserModel>  => {
        const updatedUser: UserModel = await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: user }) as unknown as UserModel;
        return updatedUser;
    }
    const remove = async(id: string): Promise<RemoveType>  => {
        const deletedUser: RemoveType = await db.collection('users').deleteOne({ _id: new ObjectId(id) }) as unknown as RemoveType;
        return deletedUser;
    }
    return {
        find,
        findById,
        create,
        update,
        remove
    }
}
export default UserQueries;