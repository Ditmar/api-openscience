import { RoleWrapper } from '../data/interfaces/role-wrapper';
import { Db, ObjectId } from 'mongodb';
import { RoleModel } from '../data/interfaces/role-model';
import { RemoveType } from '../data/interfaces/common/remove-type';


const RolQueries = (db: Db): RoleWrapper  => {
    const find = async():Promise<RoleModel[]> => {
        const result: RoleModel[] = await db.collection('role').find().toArray() as unknown as RoleModel[];
        return result;
    }
    const findById = async(id: string): Promise<RoleModel> => {
        const result: RoleModel = await db.collection('role').findOne({ _id: new ObjectId(id) }) as unknown as RoleModel;
        return result;
    }
    const create = async(user: RoleModel): Promise<ObjectId>  => {

        const newUser: ObjectId = (await db.collection('role').insertOne(user)).insertedId;
        return newUser;
    }
    const update = async(user: RoleModel, id: string): Promise<RoleModel>  => {
        const updatedRole: RoleModel = await db.collection('role').updateOne({ _id: new ObjectId(id) }, { $set: user }) as unknown as RoleModel;
        return updatedRole;
    }
    const remove = async(id: string): Promise<RemoveType>  => {
        const deletedRole: RemoveType = await db.collection('role').deleteOne({ _id: new ObjectId(id) }) as unknown as RemoveType;
        return deletedRole;
    }
    return {
        find,
        findById,
        create,
        update,
        remove
    }
}
export default RolQueries;