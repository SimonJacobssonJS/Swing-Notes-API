// src/routes/notesRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const notesController = require('../controllers/notes');

// Alla endpoints kräver JWT-auth
router.use(authenticate);

router.get('/', notesController.getAllNotes);
router.post('/', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
