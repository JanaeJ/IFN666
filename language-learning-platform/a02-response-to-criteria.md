# IFN666_25se1 Assessment 02 Submission

**Student name:**  Junning Jia

**Student ID:** n11789450

# Response to marking criteria

## (API) Core: Application architecture (1 mark)

- **One line description:** Layered architecture with controllers, models, middleware, and routes for language learning platform
- **Video timestamp:** 06:09
- **Relevant files**
   - /server/src/ (entire directory structure)
   - /server/src/server.js

## (API) Core: Endpoints (2 marks)

- **One line description:** Endpoints for Courses, Vocabularies, and Users (CRUD operations); login and register
- **Video timestamp:** 04:09, 09:12, 09:38
- **Relevant files**
   - /server/src/routes/
   - API-collection.json
- **Endpoints List**:
<!-- User Endpoints

POST /users/register
POST /users/login
GET /users
GET /users/:id
PUT /users/:id
DELETE /users/:id

Course Endpoints

GET /courses
GET /courses/:id
POST /courses
PUT /courses/:id
DELETE /courses/:id

Vocabulary Endpoints

GET /vocabularies
GET /vocabularies/:id
POST /vocabularies
PUT /vocabularies/:id
DELETE /vocabularies/:id -->

## (API) Core: Data model (3 marks)

- **One line description:** Entities: LanguageCourse, Vocabulary, User
- **Video timestamp:** 06:26
- **Relevant files**
   - /server/src/models/LanguageCourse.js
   - /server/src/models/Vocabulary.js
   - /server/src/models/User.js

## (API) Core: Data interface (3 marks)

- **One line description:** Controllers for courses, vocabularies, users, and authentication
- **Video timestamp:** 06:59
- **Relevant files**
   - /server/src/controllers/courseController.js
   - /server/src/controllers/vocabularyController.js
   - /server/src/controllers/userController.js

## (API) Core: Deployment to web server (3 marks)

- **One line description:** Using Caddy for reverse-proxy and systemd for auto-start. Available at n11789450.ifn666.com/language-learning (frontend) and n11789450.ifn666.com/assessment02/api (REST API); systemd launches the server.js node process.
- **Video timestamp:** 09:18
- **Relevant files**
   - Caddyfile

## (API) Core: API testing with Hoppscotch (3 marks)

- **One line description:** Comprehensive testing with Hoppscotch including sample payloads for all endpoints used URL and env variables.
- **Video timestamp:** 03:35
- **Relevant files**
   - API-collection.json

## (API) Additional: Authentication (3 marks)

- **One line description:** JWT authentication with protected routes.
- **Video timestamp:** 04:32
- **Relevant files**
   - /server/src/middleware/authMiddleware.js
   - /server/src/controllers/userController.js

## (API) Additional: Input validation (3 marks)

- **One line description:**  implemented using Express Validator
- **Video timestamp:** 07:13
- **Relevant files**
   - /server/src/controllers/userController.js

## (API) Additional: Security (3 marks)

- **One line description:** Implemented Helmet with CSP, XSS/clickjacking protection, and privacy headers.
- **Video timestamp:** 08:13
- **Relevant files**
   - /server/src/server.js

## (API) Additional: Rate limiting (3 marks)

- **One line description:** Implemented configurable multi-tier rate limiting (public/authenticated/sensitive routes) with IP and JWT awareness.
- **Video timestamp:** 08:24
- **Relevant files**
    - /server/src/middlewares/rateLimit.js 
    - /server/src/server.js



## (API) Additional: Role-based Access Control (3 marks)

- **One line description:** Implemented two-tier RBAC (user/admin) with JWT authentication, protecting user management endpoints with admin-only access.
- **Video timestamp:** 04:32 
- **Relevant files**
   - /server/src/models/User.js
   - /server/src/middleware/authMiddleware.js
   - /server/src/routes/userRoutes.js
   - /server/src/controllers/userController.js


---


## (Client) Core: Application architecture (3 marks)

- **One line description:** two main dirs: components and pages
- **Video timestamp:** 06:19
- **Relevant files**
   - /client/src/pages/ for main pages
   - /client/src/components/ for bespoke task manager components

## (Client) Core: User interface design (3 marks)

- **One line description:** simple interface using Mantine components
- **Video timestamp:** 03:06
- **Relevant files**
   - /client/src/pages/ for main pages
   - /client/src/components/ for bespoke task manager components

## (Client) Core: React components (3 marks)

- **One line description:** Built 2 custom components: VocabularyCard and CourseCard.
- **Video timestamp:** 02:10
- **Relevant files**
   - /client/src/components/VocabularyCard/VocabularyCard.jsx
   - /client/src/components/CourseCard/CourseCard.jsx

## (Client) Core: State management (3 marks)

- **One line description:** Implemented React context for global auth state and useState for local component state.
- **Video timestamp:** 01:44
- **Relevant files**
   - /client/src/contexts/AuthContext.jsx
   - /client/src/pages/Login.jsx (useAuth)
   - /client/src/components/VocabularyCard.jsx (useState)
   - /client/src/components/CourseCard.jsx (useState)

## (Client) Core: API integration (3 marks)

- **One line description:** All frontend features are supported by corresponding REST API endpoints.
- **Video timestamp:** Throughout video
- **Relevant files**
   - /client/src/components/
   - /client/src/pages/

## (Client) Additional: Authentication (3 marks)

- **One line description:** via JWT workflow with REST API.
- **Video timestamp:** 01:25
- **Relevant files**
   - /client/src/pages/Register.jsx
   - /client/src/pages/Login.jsx

## (Client) Additional: Input validation (3 marks)

- **One line description:** Implemented comprehensive client-side validation with clear error messaging for registration form.
- **Video timestamp:** 00:30
- **Relevant files**
   - /client/src/pages/Register.jsx 
   - /client/src/pages/Login.jsx

## (Client) Additional: Rate limiting (3 marks)

- **One line description:** Implemented client-side rate limiting through debouncing to prevent API overloading during search operations. 
- **Video timestamp:** 03:23
- **Relevant files**
   - /client/src/pages/Vocabularies.jsx 


## (Client) Additional: Accessibility (3 marks)

- **One line description:** Meeting basic accessibility including focus management, screen reader support, and keyboard navigation.
- **Video timestamp:** 03:06
- **Relevant files**
   - /client/src/styles/accessibility.css (core accessibility styles)
   - /client/src/components/CourseCard.jsx (ARIA attributes & semantic HTML)
   - /client/src/pages/Login.jsx (keyboard navigable form)

## (Client) Additional: Responsive design (3 marks)

- **One line description:**  Fully responsive layout using Mantine adapting seamlessly various screen sizes.
- **Video timestamp:** 03:06
- **Relevant files**
   - /client/src/components/Layout.jsx
   - /client/src/components/VocabularyCard.jsx
