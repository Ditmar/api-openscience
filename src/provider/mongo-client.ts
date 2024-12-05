
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import RoleQueries from '../queries/role-queries';
import SiteQueries from '../queries/site-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';
import { RoleWrapper } from '../data/interfaces/role-wrapper';
import { SiteWrapper } from '../data/interfaces/site-wrapper';

interface QueryWrapper {
    userQueries: UserWrapper;
    roleQueries: RoleWrapper;
    siteQueries: SiteWrapper;
}

const MongoClient = (db: Db): QueryWrapper  => {
    const userQueries = UserQueries(db);
    const roleQueries = RoleQueries(db);
    const siteQueries = SiteQueries(db);
    
    return {
        userQueries,
        roleQueries,
        SiteQueries
    } as unknown as QueryWrapper;
}
export default MongoClient;