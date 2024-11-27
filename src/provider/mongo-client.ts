
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import RoleQueries from '../queries/role-queries';
import VolumeQueries from '../queries/volume-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';
import { RoleWrapper } from '../data/interfaces/role-wrapper';
import { VolumeWrapper } from '../data/interfaces/volume-wrapper';

interface QueryWrapper {
    userQueries: UserWrapper;
    roleQueries: RoleWrapper;
    volumeQueries: VolumeWrapper;
}

const MongoClient = (db: Db): QueryWrapper => {
    const userQueries = UserQueries(db);
    const roleQueries = RoleQueries(db);
    const volumeQueries = VolumeQueries(db);
    return {
        userQueries,
        roleQueries,
        volumeQueries
    } as unknown as QueryWrapper;
}
export default MongoClient;