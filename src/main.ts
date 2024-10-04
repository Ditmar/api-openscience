import server from './server';
import UserRoutes from './controller/routes/user-routes';
import mongoProvider from './provider/mongo-client';



if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
    if (dotenv.error) {
        throw dotenv.error;
    }
}

(function() {

    const database = mongoProvider();
    server.use('/api', UserRoutes(database));
    server.listen(process.env.API_PORT, () => {
        console.log(`Server is running on port ${process.env.API_PORT}`);
    });
})();