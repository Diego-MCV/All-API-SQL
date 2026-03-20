# 📝 Todo API - Node.js + PostgreSQL + Auth

API REST para gestión de tareas con autenticación de usuarios. Permite registrar usuarios, iniciar sesión y gestionar tareas personales de forma segura.

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt

## 📌 Funcionalidades

### 👤 Usuarios
- Registro de usuario
- Login con generación de token

### 📝 Tareas
- Crear tarea
- Listar tareas del usuario autenticado
- Obtener tarea por ID
- Actualizar tarea (descripción y/o estado)
- Eliminar tarea por ID
- Eliminar todas las tareas del usuario

## 🔐 Autenticación

La API utiliza JWT para proteger las rutas.

Para acceder a endpoints protegidos, debes enviar el token en los headers:

Authorization: Bearer TU_TOKEN

## 📡 Endpoints
### 👤 Usuarios

#### Registro
    POST /usuarios/register

    {
    "email": "test@test.com",
    "password": "123456"
    }

#### Login
    POST /usuarios/login

    {
    "email": "test@test.com",
    "password": "123456"
    }

### 📝 Tareas (requieren autenticación)

#### Obtener todas
    GET /tareas

#### Crear tarea
    POST /tareas

    {
    "descripcion": "Aprender PostgreSQL"
    }

#### Obtener por ID
    GET /tareas/:id

#### Actualizar tarea
    PUT /tareas/:id

    {
    "completada": true
    }

#### Eliminar por ID
    DELETE /tareas/:id

#### Eliminar todas
    DELETE /tareas

## ⚙️ Instalación

  1. Clonar repositorio

    git clone <tu-repo>

  2. Entrar al proyecto

    cd todo-api-sql

  3. Instalar dependencias

  npm install

  4. Ejecutar servidor

    node index.js

## 🔐 Variables de entorno

Crear archivo `.env` en la raíz:

DB_USER=postgres

DB_HOST=localhost

DB_NAME=todo_db

DB_PASSWORD=tu_password

DB_PORT=5432

JWT_SECRET=tu_secreto

## 📂 Estructura del proyecto

/controllers
/routes
/middlewares
/db

## 📈 Mejoras futuras

- Roles de usuario (admin/user)
- Validaciones avanzadas
- Refresh tokens
- Deploy en la nube
- Frontend
  
## 👨‍💻 Autor

Diego Moises Calle Vasquez