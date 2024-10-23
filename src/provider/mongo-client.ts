
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import RoleQueries from '../queries/role-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';
import { RoleWrapper } from '../data/interfaces/role-wrapper';

interface QueryWrapper {
    userQueries: UserWrapper;
    roleQueries: RoleWrapper;
}

const MongoClient = (db: Db): QueryWrapper  => {
    const userQueries = UserQueries(db);
    const roleQueries = RoleQueries(db);
    return {
        userQueries,
        roleQueries
    } as unknown as QueryWrapper;
}
export default MongoClient;