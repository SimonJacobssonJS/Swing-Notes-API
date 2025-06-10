// src/routes/notesRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const notesController = require('../controllers/noteControllers');

router.use(authenticate);

/**
Nedanför ser du router med swagger för:
GET
POST
PUT
DELETE
 */

router.get('/', notesController.getAllNotes);
/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Hämta alla anteckningar för inloggad användare
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: Lista med anteckningar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Saknar eller ogiltig JWT
 */

router.post('/', notesController.createNote);
/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Skapa en ny anteckning
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *             required:
 *               - title
 *               - text
 *     responses:
 *       201:
 *         description: Anteckning skapad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Ogiltig input
 *       401:
 *         description: Saknar eller ogiltig JWT
 *       500:
 *         description: Serverfel
 */

router.put('/:noteId', notesController.updateNote);
/**
 * @swagger
 * /api/notes/{noteId}:
 *   put:
 *     summary: Uppdatera en anteckning
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID för anteckningen som ska uppdateras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *             required:
 *               - title
 *               - text
 *     responses:
 *       200:
 *         description: Anteckning uppdaterad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Ogiltig input
 *       401:
 *         description: Saknar eller ogiltig JWT
 *       404:
 *         description: Anteckningen hittades inte
 *       500:
 *         description: Serverfel
 */

router.delete('/:noteId', notesController.deleteNote);
/**
 * @swagger
 * /api/notes/{noteId}:
 *   delete:
 *     summary: Ta bort en anteckning
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID för anteckningen som ska tas bort
 *     responses:
 *       204:
 *         description: Anteckningen borttagen
 *       401:
 *         description: Saknar eller ogiltig JWT
 *       404:
 *         description: Anteckningen hittades inte
 *       500:
 *         description: Serverfel
 */
module.exports = router;
