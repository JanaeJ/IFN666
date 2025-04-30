# Language Learning Platform

## Purpose
The Language Learning Platform helps users manage language courses and vocabulary. It allows users to register, log in, organize courses, and add, view, or edit vocabulary items efficiently.

## API endpoints

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID
- `POST /courses` - Create a new course
- `PUT /courses/:id` - Update course by ID
- `DELETE /courses/:id` - Delete course by ID

### Users
- `POST /users/register` - Register a user
- `POST /users/login` - User login
- `GET /users` - Get all users
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

### Vocabularies
- `GET /vocabularies` - Get all vocabularies
- `GET /vocabularies/:id` - Get vocabulary by ID
- `POST /vocabularies` - Create a new vocabulary
- `PUT /vocabularies/:id` - Update vocabulary by ID
- `DELETE /vocabularies/:id` - Delete vocabulary by ID


## How to Contribute

1. Fork the repository and clone it.
2. Create a new branch for your changes.
3. Commit your code with a descriptive message.
4. Push your branch and create a pull request.

## A list of features

- **User Authentication**  
  Users can register, log in, and securely manage passwords with hashing.

- **JWT Token Authentication**  
  Protect API routes using JWT tokens, ensuring secure access to user data.

- **Input Validation**  
  Validates user inputs to prevent errors.

- **Security with Helmet**  
  Utilizes Helmet to secure HTTP headers, helping protect against common vulnerabilities.

- **Rate Limiting**  
  Limits the number of requests to the API to prevent abuse and ensure fair usage.

- **Roles Based Access Control (RBAC)**  
  Enforces role-based access control, ensuring that only admin with the appropriate roles can access specific resources and actions.

- **MongoDB Integration**  
  Uses MongoDB to store data, with Mongoose handling schema definitions for users and courses.


## A list of dependencies and how to install them

### **Backend (Node.js + Express)**
- **express** — Web framework for HTTP APIs.
- **mongoose** — ODM for MongoDB database.
- **cors** — Enables CORS (Cross-Origin Resource Sharing).
- **dotenv** — Loads environment variables.
- **helmet** — Security middleware for setting HTTP headers.
- **express-rate-limit** — Middleware for API rate limiting.
- **bcryptjs** — Hashing library for secure password storage.
- **jsonwebtoken** — JWT authentication for user sessions.


### **Frontend (Vite + React + Mantine)**
- **react** — UI component framework for building the frontend.
- **react-dom** — DOM bindings for React.
- **vite** — Build tool and development server for React.
- **@mantine/core** — Modular component library for UI elements.
- **@mantine/hooks** — Collection of useful React hooks by Mantine.
- **@mantine/form** — Feature-rich form management for React.
- **@emotion/react** — CSS-in-JS styling used by Mantine.
- **@tabler/icons-react** — Icon pack for use with Mantine components.
- **axios** — HTTP client (used for API requests).
- **cors** — (For any client-side proxying, if used.)
- **lodash.debounce** — Utility for debouncing user input (used in search).
- **react-router-dom** — Routing for single-page React apps.


## Installation

**Backend**
```bash
cd ~/language-learning-platform/server/
npm install
node server.js
```

**Frontend**
```bash
cd cd ~/language-learning-platform/client/
rm -rf dist
npm run build
sudo cp -r dist/* /var/www/html/language-learning/
sudo systemctl restart caddy
```


## Applications architecture
The application follows a **client-server architecture**:

- **Frontend:** The frontend is a React app, which handles rendering the user interface and sending API requests to the backend.
- **Backend:** The backend is built with **Node.js** and **Express**, providing the API to manage tasks and user authentication. It communicates with a **MongoDB** database using **Mongoose** for data storage.
- **Authentication:** User authentication is handled with **JWT** tokens, providing secure sessions.

The frontend and backend are separated, making it easy to scale or swap technologies in the future.

## Deployment

Using Caddy, both applications can be deployed behind a reverse proxy on a single server.

```bash
$cat /etc/caddy/Caddyfile

n11789450.ifn666.com {
  
    handle /assessment02/api/* {
        uri strip_prefix /assessment02
        reverse_proxy localhost:5002
    }

    handle /language-learning/* {
        root * /var/www/html
        try_files {path} /language-learning/index.html 
        file_server
    }

    encode gzip
}

```

## How to report issues
Please open an issue on GitHub with steps to reproduce, expected behavior, and error messages (if any).