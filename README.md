# Backend-LoginAuth

## Introduction
This is the backend implementation for a User Login And SignUp where a new user can be registered and login. Code contain Signup Login Functionable code MongoDb Schema save With Authentication and Authrization in middlewares And JWT

## Technology Used
- Node.js
- Express.js
- MongoDB
- RESTful API
- JWT

## Tasks 
This project involves implementation the following tasks:

# 1) SignUp 
- Endpoints: ```http://localhost:1234/api/v1/signup```
- Method: POST
- Request Body: JSON
```json
{
    "name" : "Aman",
    "email" : "sharma.aman.sa456@gmail.com",
    "password" : "abcdxyz",
    "role" : "Student"
}
```
- Description: This task involves :
    - Getting name, email, password, role from user.
    - Check for user already exist in Database.
    - If it is a new user, hashed the password using Bcrypt
    - New user is created

# 2) Login 
- Endpoints: ```http://localhost:1234/api/v1/login```
- Method: POST
- Request Body: JSON
```json
{
    "email" : "sharma.aman.sa456@gmail.com",
    "password" : "abcdxyz",
}
```
- Description: This task involves :
    - Getting email, password from user.
    - Validate the entries.
    - Check for user already exist in Database.
    - If exist, verify the password, and generate the JWT token
    - create cookies

## Model
This project uses the following model: 

# User Model
- Fields:
    - Name: String
    - Email: String
    - Password: String
    - Role: String
 
## Middelware 
This project involve middleware , Listed:

- Auth: for the valid user
- isStudent: for the Student User Only
- isAdmin: for the Admin User Only
