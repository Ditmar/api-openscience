
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import RoleQueries from '../queries/role-queries';
import VolumeQueries from '../queries/volume-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';
import { RoleWrapper } from '../data/interfaces/role-wrapper';
import SeoQueries from '../queries/seo-queries';
import { SEOWrapper } from '../data/interfaces/seo-wrapper';
import { VolumeWrapper } from '../data/interfaces/volume-wrapper';

interface QueryWrapper {
    userQueries: UserWrapper;
    roleQueries: RoleWrapper;
    seoQueries: SEOWrapper;
    volumeQueries: VolumeWrapper;
}

const MongoClient = (db: Db): QueryWrapper => {
    const userQueries = UserQueries(db);
    const roleQueries = RoleQueries(db);
    const seoQueries = SeoQueries(db);
    const volumeQueries = VolumeQueries(db);
    return {
        userQueries,
        roleQueries,
        seoQueries,
        volumeQueries
    } as unknown as QueryWrapper;
}
export default MongoClient;