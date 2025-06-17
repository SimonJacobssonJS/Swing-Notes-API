const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Skapa nytt konto
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Konto skapat
 *       400:
 *         description: Ogiltig input
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logga in
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inloggning lyckades, returnerar JWT
 *       401:
 *         description: Felaktiga inloggnings­uppgifter
 */
router.post('/login', userController.login);

module.exports = router;
