const express = require('express');
const { createScreenHandler, getScreensHandler, getScreenByIdHandler, updateScreenHandler } = require('./screenController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Screen:
 *       type: object
 *       required:
 *         - paringCode
 *         - screenId
 *         - status
 *       properties:
 *         paringCode:
 *           type: string
 *         screenId:
 *           type: string
 *         status:
 *           type: boolean
 */

/**
 * @swagger
 * /screens:
 *   post:
 *     summary: Create a new screen
 *     tags: [Screens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screen'
 *     responses:
 *       201:
 *         description: Screen created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screen'
 *       500:
 *         description: Some server error
 */
router.post('/', createScreenHandler);

/**
 * @swagger
 * /screens:
 *   get:
 *     summary: Get all screens
 *     tags: [Screens]
 *     responses:
 *       200:
 *         description: List of all screens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screen'
 *       500:
 *         description: Some server error
 */
router.get('/', getScreensHandler);

/**
 * @swagger
 * /screens/{id}:
 *   get:
 *     summary: Get a single screen by ID
 *     tags: [Screens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The screen ID
 *     responses:
 *       200:
 *         description: Screen found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screen'
 *       404:
 *         description: Screen not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', getScreenByIdHandler);

/**
 * @swagger
 * /screens/{id}:
 *   put:
 *     summary: Update an existing screen
 *     tags: [Screens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The screen ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screen'
 *     responses:
 *       200:
 *         description: Screen updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screen'
 *       404:
 *         description: Screen not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', updateScreenHandler);

// Route to render the index page with screens data
router.get('/view', async (req, res) => {
    try {
        const screens = await getScreens(); // Assuming this function returns the data correctly
        res.render('index', { screens });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a root route to render index.ejs
router.get('/', async (req, res) => {
    try {
        const screens = await getScreens(); // Assuming this function returns the data correctly
        res.render('index', { screens });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
