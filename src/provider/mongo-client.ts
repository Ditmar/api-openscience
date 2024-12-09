
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import RoleQueries from '../queries/role-queries';
import VolumeQueries from '../queries/volume-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';
import { RoleWrapper } from '../data/interfaces/role-wrapper';
import { VolumeWrapper } from '../data/interfaces/volume-wrapper';
import SeoQueries from '../queries/seo-queries';
import { SEOWrapper } from '../data/interfaces/seo-wrapper';
import UserManagementQueries from '../queries/userManagement-queries';
import { UserWrapper as UserManagementWrapper } from '../data/interfaces/userManagement-wrapper';

interface QueryWrapper {
    userQueries: UserWrapper;
    roleQueries: RoleWrapper;
    volumeQueries: VolumeWrapper;
    userManagementQueries: UserManagementWrapper;
    seoQueries: SEOWrapper;
}

const MongoClient = (db: Db): QueryWrapper => {
    const userQueries = UserQueries(db);
    const roleQueries = RoleQueries(db);
    const volumeQueries = VolumeQueries(db);
    const userManagementQueries = UserManagementQueries(db);
    const seoQueries = SeoQueries(db);
    return {
        userQueries,
        roleQueries,
        volumeQueries,
        userManagementQueries,
        seoQueries
    } as unknown as QueryWrapper;
}

export default MongoClient;