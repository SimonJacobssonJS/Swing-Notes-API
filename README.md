# Swing Notes API with frontend

An intuitive notes app with user registration, authentication, and full CRUD for notes. Built with Express, PostgreSQL, Sequelize, React + Vite, Tailwind CSS, and deployed on Render.

---

## Key features in this project

- **User authentication** (sign-up, log-in with JWT)
- **Notes management with CRUD** (create/read/update/delete your notes)
- **Backend API** with Express, PostgreSQL, Sequelize
- **Deployed** on Render (backend + frontend)
- **Frontend app** with React, React Router, Tailwind CSS

---

## Getting Started (Locally)

*Clone the repo and install dependencies:*

```bash
git clone https://github.com/SimonJacobssonJS/Swing-Notes-API.git
cd Swing-Notes-API

## Running the backend in bash terminal
```bash 
cd backend
npm install
npm run dev

## Running the backend in bash terminal
```bash 
cd frontend
npm install
npm run dev

## Navigate to the App locally for testing or head over to the site
*Browser* https://swing-notes-frontend.onrender.com/
*Local* http://localhost:5173

## Testing calls in Postman
Signup *POST* https://swing-notes-api.onrender.com/api/user/signup
Login *POST* https://swing-notes-api.onrender.com/api/user/login
Create note *POST* https://swing-notes-api.onrender.com/api/notes
Get your notes *GET* https://swing-notes-api.onrender.com/api/notes
Edit your note *PUT* https://swing-notes-api.onrender.com/api/notes/noteId  (replace noteId with yours)
Delete a note *DELETE* https://swing-notes-api.onrender.com/api/notes/noteId  (replace noteId with yours)

