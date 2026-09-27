# Employee Management System API

A REST API for managing employees, departments, users, authentication, and role-based access control.

## Technologies

- FastAPI
- Python
- SQLAlchemy
- MySQL
- JWT
- Pydantic
- Passlib
- PyMySQL

## Features

- User registration and login
- JWT authentication
- Access and refresh tokens
- Refresh token revocation
- Logout
- Role-based authorization
- Admin and employee roles
- Employee CRUD
- Department CRUD
- Employee search
- Pagination
- Sorting
- Employee status management
- Employee image upload
- User role management
- User active/inactive management
- Swagger API documentation

## Authentication

The API uses JWT access and refresh tokens.

Access tokens are required for protected endpoints.

Admin-only endpoints require the `admin` role.

## API Documentation

After starting the application:

`/docs`

## Database

MySQL is used as the database and SQLAlchemy is used as the ORM.

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7