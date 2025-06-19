# Swing Notes API with frontend

An intuitive notes app with user registration, authentication, and full CRUD for notes. Built with Express, PostgreSQL, Sequelize, React + Vite, Tailwind CSS, and deployed on Render.

---

## Key features in this project

- **User authentication** (sign-up, log-in with JWT)
- **Notes management with CRUD** (create/read/update/delete your notes)
- **Search function** Easily search for the title of your created notes
- **Backend API** with Express, PostgreSQL, Sequelize
- **Deployed** on Render (backend + frontend)
- **Frontend app** with React, React Router, Tailwind CSS

---

## Getting Started

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

## On the page (instructions for the site)
*Signup* Create an account with an email and password
*Login* Login with your created credentials 
*Notes* Create a note by adding a title and text, then you can search for specific notes using title in the searchbar. You can also edit and delete titles (pen and trashcan).

## Testing in Postman
Signup *POST* https://swing-notes-api.onrender.com/api/user/signup
Login *POST* https://swing-notes-api.onrender.com/api/user/login
Create note *POST* https://swing-notes-api.onrender.com/api/notes
Get your notes *GET* https://swing-notes-api.onrender.com/api/notes
Edit your note *PUT* https://swing-notes-api.onrender.com/api/notes/noteId  (replace noteId with yours)
Delete a note *DELETE* https://swing-notes-api.onrender.com/api/notes/noteId  (replace noteId with yours)

## Testing with terminal (bash)
curl -X POST https://swing-notes-api.onrender.com/api/user/signup \
-H "Content-Type: application/json" \
-d 
