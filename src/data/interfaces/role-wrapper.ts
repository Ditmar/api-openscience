import { ObjectId } from 'mongodb';
import { RoleModel } from './role-model';
import { RemoveType } from './common/remove-type';


export interface RoleWrapper {
    find(): Promise<RoleModel[]>;
    findById(id: string): Promise<RoleModel>;
    create(user: RoleModel): Promise<ObjectId>;
    update(user: RoleModel, id: string): Promise<RoleModel>;
    remove(id: string): Promise<RemoveType>;
}