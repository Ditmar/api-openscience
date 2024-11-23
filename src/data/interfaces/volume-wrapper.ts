import { ObjectId } from 'mongodb';
import { VolumeModel } from './volume-model';
import { RemoveType } from './common/remove-type';

export interface VolumeWrapper {
    find(): Promise<VolumeModel[]>;
    findById(id: string): Promise<VolumeModel>;
    create(volume: VolumeModel): Promise<ObjectId>;
    update(volume: VolumeModel, id: string): Promise<VolumeModel>;
    remove(id: string): Promise<RemoveType>;
}