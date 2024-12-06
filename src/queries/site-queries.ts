import { SiteWrapper } from '../data/interfaces/site-wrapper';
import { Db, ObjectId } from 'mongodb';
import { SiteModel } from '../data/interfaces/site-model';
import { RemoveType } from '../data/interfaces/common/remove-type';

const SiteQueries = (db: Db): SiteWrapper  => {
    const find = async():Promise<SiteModel[]> => {
        const result: SiteModel[] = await db.collection('site').find().toArray() as unknown as SiteModel[];
        return result;
    }
    const findById = async(id: string): Promise<SiteModel> => {
        const result: SiteModel = await db.collection('site').findOne({ _id: new ObjectId(id) }) as unknown as SiteModel;
        return result;
    }
    const create = async(user: SiteModel): Promise<ObjectId>  => {

        const newUser: ObjectId = (await db.collection('site').insertOne(user)).insertedId;
        return newUser;
    }
    const update = async(user: SiteModel, id: string): Promise<SiteModel>  => {
        const updatedUser: SiteModel = await db.collection('site').updateOne({ _id: new ObjectId(id) }, { $set: user }) as unknown as SiteModel;
        return updatedUser;
    }
    const remove = async(id: string): Promise<RemoveType>  => {
        const deletedUser: RemoveType = await db.collection('site').deleteOne({ _id: new ObjectId(id) }) as unknown as RemoveType;
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
export default SiteQueries;