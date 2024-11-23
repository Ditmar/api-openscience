# Multer middleware integration

- This is a guide for integrating middleware in any endpoint

## Step 1

- Create your endpoint with all configurations (schemas, controller, routes, queries)
- import multer middleware
  ```ts
  import { uploadMiddleware } from '../../middlewares/multer.middleware';
  ```

- Import all constants for the multer instance
  ```ts
  import { MAX_FILE_SIZE } from '../../utils/constants';
  ```
  - This constant defines the maximum file size supported for upload
- Import this utility to convert an image to a base64 object and then to a URL
  ```ts
  import { createDataURL } from '../../utils/createUrl';
  ```
- Create an instance of multer
  ```ts
  const uploader = uploadMiddleware(MAX_FILE_SIZE); // 8MB
  ```

- Integrate the multer instance into the route
  ```ts
  volumeRoutes.post('/volumes', uploader.single('file'), schemaValidationMiddleware(volumeWrapperPostSchema), async (req, res) => {
    // This endpoint permits uploading a single file

    })
  ```
