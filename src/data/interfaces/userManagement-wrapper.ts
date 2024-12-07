import { ObjectId } from 'mongodb';
import { UserManagementModel } from './userManagement-model';
import { RemoveType } from './common/remove-type';


export interface UserWrapper {
    find(): Promise<UserManagementModel[]>;
    findById(id: string): Promise<UserManagementModel>;
    create(user: UserManagementModel): Promise<ObjectId>;
    update(user: UserManagementModel, id: string): Promise<UserManagementModel>;
    remove(id: string): Promise<RemoveType>;
    findByQuery(limit: number): Promise<UserManagementModel[]>;
}