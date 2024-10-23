import { ObjectId } from 'mongodb';
import { UserModel } from './user-model';
import { RemoveType } from './common/remove-type';


export interface UserWrapper {
    find(): Promise<UserModel[]>;
    findById(id: string): Promise<UserModel>;
    create(user: UserModel): Promise<ObjectId>;
    update(user: UserModel, id: string): Promise<UserModel>;
    remove(id: string): Promise<RemoveType>;
}