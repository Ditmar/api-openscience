VALIDATION:
The validation is different for each database route; work was done using middleware.
This is an example of how to implement it for the 'user-routes.ts' route


--We import the following where authentication is to be implemented
Configuration implemented in 'user-routes.ts'.

import {schemaValidationMiddleware} from '../../middlewares/schemaValidator.middleware';
import {userWrapperPostSchema, userWrapperPutSchema} from '../../schemmas/users.schema'

--These instances are for POST and PUT; the following syntax should be used to apply them.

    userRoutes.post('/users', schemaValidationMiddleware(userWrapperPostSchema), async (req, res) => {
        // Create a new user
    });

   userRoutes.put('/users/:id', schemaValidationMiddleware(userWrapperPutSchema), async (req, res) => {
        // Update a user by id
    });



-The 'schemaValidationMiddleware.ts' file is not modified
-The 'users.schema.ts' file used for this example is based on the data types in 
 'user-model.ts,' and will depend on the data types used