import { ObjectId } from 'mongodb';
import { SiteModel } from './site-model';
import { RemoveType } from './common/remove-type';
export interface SiteWrapper {
    find(): Promise<SiteModel[]>;
    findById(id: string): Promise<SiteModel>;
    create(user: SiteModel): Promise<ObjectId>;
    update(user: SiteModel, id: string): Promise<SiteModel>;
    remove(id: string): Promise<RemoveType>;
}