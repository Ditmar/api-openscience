### Documentation of User CRUD Endpoints

---

### **Description**
Endpoints were developed to manage users in the system. Endpoints allow you to create, view, update, and delete users. They also include fields such as roles and lock statuses.

---

### **User Form **
- **username**:  
  - Type: Text, minimum 3 characters, required.
- **email**:  
  - Type: Text, must be a valid email, minimum 6 characters, required. 
- **password**:  
  - Type: Text, minimum 6 characters, required.  
- **confirmed**:  
  - Type: Boolean, indicates whether the user confirmed their account.  
  - Predetermined: `false`.  
- **blocked**:  
  - Type: Boolean, indicates whether the user is blocked.
  - Predetermined: `false`.  
- **role**:  
  - Type: Array of roles.
  - Predetermined: `[]`.

---

### **Endpoints**

The endpoints available for user management in the system are detailed below, along with examples of how to use them.

---

#### **1. User Create**
**Endpoint**: `POST /users-management`  
**Example**:  

```bash
curl -X POST http://localhost:3000/users-management \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "securepassword",
  "confirmed": false,
  "blocked": false,
  "role": ["admin", "editor"]
}'
```

---

#### **2. User List**
**Endpoint**: `GET /users-management`  
**Example**:  

```bash
curl -X GET http://localhost:3000/users-management
```

---

#### **3. View User Details**
**Endpoint**: `GET /users-management/:id`  
**Example** (replace `<USER_ID>` with the actual user ID): 

```bash
curl -X GET http://localhost:3000/users-management/<USER_ID>
```

---

#### **4. Update a User**
**Endpoint**: `PUT /users-management/:id`  
**Example** (replace `<USER_ID>` with the actual user ID): 

```bash
curl -X PUT http://localhost:3000/users-management/<USER_ID> \
-H "Content-Type: application/json" \
-d '{
  "username": "updateduser",
  "email": "updateduser@example.com",
  "password": "newsecurepassword",
  "confirmed": true,
  "blocked": false,
  "role": ["editor"]
}'
```

---

#### **5. Delete a User**
**Endpoint**: `DELETE /users-management/:id`  
**Example** (replace `<USER_ID>` with the actual user ID):  

```bash
curl -X DELETE http://localhost:3000/users-management/<USER_ID>
```

---

### **Notes**
- Replace `http://localhost:3000` with your server's base URL if it is different.
- Make sure the server is running before making requests. 
- Some endpoints may require authentication depending on your system rules.