import { Db, ObjectId } from 'mongodb';
import { VolumeModel } from '../data/interfaces/volume-model';
import { VolumeWrapper } from '../data/interfaces/volume-wrapper';
import { RemoveType } from '../data/interfaces/common/remove-type';

const VolumeQueries = (db: Db): VolumeWrapper => {
    const find = async (): Promise<VolumeModel[]> => {
        const result = await db.collection('volumes').find().toArray() as unknown as VolumeModel[];
        return result;
    }

    const findById = async (id: string): Promise<VolumeModel> => {
        const result = await db.collection('volumes').findOne({ _id: new ObjectId(id) }) as unknown as VolumeModel;
        return result;
    }

    const create = async (volume: VolumeModel): Promise<ObjectId> => {
        const { insertedId: newVolume } = await db.collection('volumes').insertOne(volume)
        return newVolume;
    }

    const update = async (volume: VolumeModel, id: string): Promise<VolumeModel> => {
        const updatedVolume = await db.collection('volumes').updateOne({ _id: new ObjectId(id) }, { $set: volume }) as unknown as VolumeModel;
        return updatedVolume;
    }

    const remove = async (id: string): Promise<RemoveType> => {
        const deletedVolume = await db.collection('volumes').deleteOne({ _id: new ObjectId(id) }) as unknown as RemoveType;
        return deletedVolume;
    }

    return {
        find,
        findById,
        create,
        update,
        remove
    }
}

export default VolumeQueries;