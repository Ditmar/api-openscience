import { ObjectId } from 'mongodb';
import { SiteConfiguration } from './siteConfiguration-model';
import { RemoveType } from './common/remove-type';
export interface SiteConfigurationWrapper {
    find(): Promise<SiteConfiguration[]>;
    findById(id: string): Promise<SiteConfiguration>;
    create(user: SiteConfiguration): Promise<ObjectId>;
    update(user: SiteConfiguration, id: string): Promise<SiteConfiguration>;
    remove(id: string): Promise<RemoveType>;
}