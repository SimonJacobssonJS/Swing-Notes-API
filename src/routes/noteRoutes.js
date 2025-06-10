// src/routes/notesRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const notesController = require('../controllers/noteControllers');

router.use(authenticate);

router.get('/', notesController.getAllNotes);
router.post('/', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Hämta alla anteckningar för inloggade användare
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: En lista med anteckningar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Du har en ogiltig eller saknar JWT
 */
router.get('/', notesController.getAllNotes);
