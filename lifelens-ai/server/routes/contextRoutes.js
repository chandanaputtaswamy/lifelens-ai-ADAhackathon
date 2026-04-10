const express = require('express');
const router = express.Router();
const { saveContext, getContexts } = require('../controllers/contextController');

// Map the routes to their respective controller methods
// Base route: /api/context

// Route to save new context
router.post('/', saveContext);

// Route to retrieve all context entries
router.get('/', getContexts);

module.exports = router;
