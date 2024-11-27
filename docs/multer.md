### **Documentación del Ticket: "Integrar Multer en la API api-openscience para la carga de archivos de manera reutilizable"**

#### **Descripción General**
El objetivo de este ticket es integrar **Multer**, una biblioteca de manejo de archivos para Node.js, en la API `api-openscience`. La implementación se diseñó para que sea modular y reutilizable, permitiendo la carga de archivos de diferentes tipos y tamaños, según se especifique en la configuración. 

En esta integración, se implementó un sistema para almacenar imágenes en disco y generar URLs en formato `data:` a partir de las imágenes subidas. Este enfoque asegura flexibilidad y reutilización en diferentes endpoints.

---

### **Código Implementado**

#### 1. **Middleware de Multer**
El middleware `uploadMiddleware` es el núcleo de esta integración, permitiendo definir configuraciones reutilizables para el manejo de archivos. El middleware toma como entrada un tamaño máximo permitido para los archivos y valida el tipo de archivo.

```typescript
import multer from 'multer';
import { bucket } from '../config/multerConfig';
import { fileValidator } from '../schemas/multer.schema';

export const uploadMiddleware = (maxSize: number) => {
    const storage = bucket({
        storageType: 'disk',
        bucketName: 'uploads',
    });
    return multer({
        storage,
        fileFilter: fileValidator,
        limits: { fileSize: maxSize },
    });
};
```

---

#### 2. **Configuración del Storage**
Se implementaron dos opciones de almacenamiento (en disco o memoria) usando una función llamada `bucket`. Para esta API, se optó por el almacenamiento en disco, asegurando que el directorio se cree automáticamente si no existe.

```typescript
import multer from 'multer';
import path from 'path';
import fs from 'fs';

interface MulterConfigProps {
    storageType: 'disk' | 'memory';
    bucketName: string;
}

export function bucket({ storageType, bucketName }: MulterConfigProps) {
    switch (storageType) {
        case 'disk':
            return multer.diskStorage({
                destination: (req, file, cb) => {
                    const folderPath = path.join(__dirname, `../../${bucketName}`);
                    ensureFolderExists(folderPath);
                    cb(null, folderPath);
                },
                filename: (req, file, cb) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    const extencion = path.extname(file.originalname);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extencion}`);
                },
            });
        case 'memory':
            return multer.memoryStorage();
    }
}

const ensureFolderExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};
```

---

#### 3. **Validación de Archivos**
Se agregó un validador de archivos (`fileValidator`) para restringir los tipos permitidos (por ejemplo, imágenes) y evitar archivos no deseados.

```typescript
import { FILE_TYPES } from '../utils/constants';

export const fileValidator = (req, file, cb) => {
    if (FILE_TYPES.includes(file.mimetype)) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Invalid file type (only images allowed)'), false);
    }
};
```

---

#### 4. **Creación de URLs en Base64**
El archivo subido se convierte en un `data:` URL para facilitar su uso inmediato en diferentes contextos.

```typescript
import fs from 'fs';

export function createDataURL(file: Express.Multer.File) {
    const pathImg = file.path;
    const mimeType = file.mimetype;
    const encodeImg = fs.readFileSync(pathImg, 'base64');
    return `data:${mimeType};base64,${encodeImg}`;
}
```

---

#### 5. **Rutas para Manejo de Archivos**
Se configuró un router que incluye un endpoint para subir imágenes, usando el middleware y las utilidades anteriores.

```typescript
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { uploadMiddleware } from '../../middlewares/multer.middleware';
import { createDataURL } from '../../utils/createUrl';
import { MAX_FILE_SIZE } from '../../utils/constants';

const ImageRouter = () => {
    const router = express.Router();
    const uploader = uploadMiddleware(MAX_FILE_SIZE);

    router.get('/upload', (req, res) => {
        res.status(StatusCodes.OK).json({ message: 'GET /bucket' });
    });

    router.post('/upload', uploader.single('image'), (req, res) => {
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'No image has been uploaded.',
            });
        }
        const url = createDataURL(req.file);
        res.status(StatusCodes.CREATED).json({
            message: 'Image uploaded successfully.',
            filePath: `/uploads/${req.file.filename}`,
            url,
        });
    });

    return router;
};

export default ImageRouter;
```

---

### **Ejemplos de Uso con `curl`**

#### **Subir una Imagen**
```bash
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: multipart/form-data" \
  -H "Accept: multipart/form-data" \
  -F "image=@path_to_your_image.jpg"
```

#### **Respuesta Exitosa**
```json
{
    "message": "Image uploaded successfully.",
    "filePath": "/uploads/image-163163163-123.jpg",
    "url": "data:image/jpeg;base64,/9j/4AAQSkZJR..."
}
```

#### **Error de Tipo de Archivo**
```bash
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: multipart/form-data" \
  -H "Accept: multipart/form-data" \
  -F "image=@path_to_non_image_file.txt"
```

**Respuesta:**
```json
{
    "error": "Invalid file type (only images allowed)"
}
```

---

### **Cómo Reutilizar para Nuevos Endpoints**
Puedes usar el mismo enfoque para manejar otros tipos de recursos (por ejemplo, documentos PDF para reportes). Solo necesitas ajustar el middleware de validación y las configuraciones de Multer.

---

#### **1. Importaciones**
```javascript
import express from 'express';
import { uploader } from '../../middlewares/multer.middleware'; // Middleware para manejo de archivos
import { schemaValidationMiddleware } from '../../middlewares/schemaValidation.middleware'; // Middleware para validación de esquemas
import { reportSchema } from '../../schemas/report.schema'; // Esquema para validación de los datos del reporte
import database from '../../database'; // Módulo para la interacción con la base de datos
```

- **`express`**: Se utiliza para crear el router y definir las rutas.
- **`uploader`**: Middleware basado en Multer para manejar la subida de archivos.
- **`schemaValidationMiddleware`**: Middleware que valida el cuerpo de la solicitud según el esquema definido.
- **`reportSchema`**: Esquema de validación específico para los datos de un reporte.
- **`database`**: Simula o representa la interacción con una base de datos para almacenar los datos.

---

#### **2. Creación del Router**
```javascript
const reportRoutes = express.Router();
```

Se crea una instancia del router para agrupar las rutas relacionadas con los reportes.

---

#### **3. Definición del Endpoint `/reports`**
```javascript
reportRoutes.post(
    '/reports',
    uploader.single('file'), // Middleware para manejar el archivo
    schemaValidationMiddleware(reportSchema), // Middleware para validar los datos
    async (req, res) => { ... }
);
```

Este endpoint permite crear un nuevo reporte. A continuación, se desglosan los pasos:

---

##### **3.1. Middleware para Manejo de Archivos (`uploader.single('file')`)**
- Este middleware, basado en Multer, procesa un archivo enviado en la solicitud con el campo `file`.
- El archivo procesado queda disponible en `req.file`.

---

##### **3.2. Middleware de Validación del Esquema (`schemaValidationMiddleware(reportSchema)`)**
- Este middleware valida que los datos en el cuerpo de la solicitud (`req.body`) cumplan con las reglas definidas en `reportSchema`.
- Si los datos no son válidos, el middleware responde con un error antes de llegar al controlador principal.

---

##### **3.3. Lógica Principal del Controlador**
```javascript
async (req, res) => {
    try {
        // Validación: Asegurarse de que el archivo haya sido subido
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ningún archivo.' });
        }

        // Extracción de datos del cuerpo de la solicitud
        const { title, description } = req.body;

        // Creación de los datos del reporte
        const reportData = {
            title,
            description,
            filePath: `/uploads/${req.file.filename}`, // Ruta del archivo subido
            date: new Date(), // Fecha de creación
        };

        // Guardado de los datos en la base de datos
        const report = await database.create(reportData);

        // Respuesta exitosa
        return res.status(201).json({
            report,
            message: 'Reporte creado exitosamente.',
        });
    } catch (error) {
        // Manejo de errores internos
        return res.status(500).json({ error: error.message });
    }
}
```

- **1. Validación de Archivo**: Se verifica si el archivo fue subido. Si no, se responde con un error `400`.
- **2. Extracción de Datos**: Se obtienen `title` y `description` del cuerpo de la solicitud.
- **3. Creación del Objeto `reportData`**:
  - **`title`**: Título del reporte.
  - **`description`**: Descripción del reporte.
  - **`filePath`**: Ruta del archivo subido, generada dinámicamente.
  - **`date`**: Fecha y hora actuales.
- **4. Guardado en la Base de Datos**: Se usa el método `database.create` para almacenar los datos en la base de datos.
- **5. Respuesta Exitosa**:
  - Código HTTP: `201 Created`.
  - Datos del reporte creado junto con un mensaje de confirmación.
- **6. Manejo de Errores**: Si ocurre un error durante el proceso, se devuelve un error `500` con el mensaje correspondiente.

---

#### **4. Exportación del Router**
```javascript
export default reportRoutes;
```

Se exporta el router para ser utilizado en otros módulos del servidor.

---

### **Ejemplo de Uso con `curl`**

#### **1. Crear un Reporte**
```bash
curl -X POST http://localhost:3000/reports \
  -H "Content-Type: multipart/form-data" \
  -H "Accept: multipart/form-data" \
  -F "file=@path_to_file.pdf" \
  -F "title=Reporte de Finanzas" \
  -F "description=Análisis del cuarto trimestre"
```

- **Descripción**: Este ejemplo sube un archivo (`path_to_file.pdf`) junto con los campos `title` y `description` para crear un nuevo reporte.
- **Respuesta Exitosa**:
```json
{
  "report": {
    "title": "Reporte de Finanzas",
    "description": "Análisis del cuarto trimestre",
    "filePath": "/uploads/file-uniqueID.pdf",
    "date": "2024-11-24T12:00:00.000Z"
  },
  "message": "Reporte creado exitosamente."
}
```

---

#### **2. Error: Falta el Archivo**
```bash
curl -X POST http://localhost:3000/reports \
  -H "Content-Type: multipart/form-data" \
  -H "Accept: multipart/form-data" \
  -F "title=Reporte de Finanzas" \
  -F "description=Análisis del cuarto trimestre"
```

- **Descripción**: Intenta crear un reporte sin subir un archivo.
- **Respuesta**:
```json
{
  "error": "No se subió ningún archivo."
}
```

---

### **Extensión: Reutilización para Nuevos Endpoints**
Puedes usar este esquema para crear otros endpoints que manejen datos y archivos. Por ejemplo, para gestionar imágenes de productos o documentos legales:
```javascript
productRoutes.post(
    '/products',
    uploader.single('image'),
    schemaValidationMiddleware(productSchema),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No se subió ninguna imagen.' });
            }
            const { name, price } = req.body;
            const productData = {
                name,
                price,
                imagePath: `/uploads/${req.file.filename}`,
                date: new Date(),
            };
            const product = await database.create(productData);
            return res.status(201).json({ product });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);
```