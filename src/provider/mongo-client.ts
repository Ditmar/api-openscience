
import { Db } from 'mongodb';
import UserQueries from '../queries/user-queries';
import RoleQueries from '../queries/role-queries';
import { UserWrapper } from '../data/interfaces/user-wrapper';
import { RoleWrapper } from '../data/interfaces/role-wrapper';
import SeoQueries from '../queries/seo-queries';
import { SEOWrapper } from '../data/interfaces/seo-wrapper';
import { SiteWrapper } from '../data/interfaces/site-wrapper';
import SiteQueries from '../queries/site-queries';

interface QueryWrapper {
    userQueries: UserWrapper;
    roleQueries: RoleWrapper;
    seoQueries: SEOWrapper;
    siteQueries: SiteWrapper;
}

const MongoClient = (db: Db): QueryWrapper  => {
    const userQueries = UserQueries(db);
    const roleQueries = RoleQueries(db);
    const seoQueries = SeoQueries(db);
    const siteQueries = SiteQueries(db);
    return {
        userQueries,
        roleQueries,
        seoQueries,
        siteQueries
    } as unknown as QueryWrapper;
}
export default MongoClient;