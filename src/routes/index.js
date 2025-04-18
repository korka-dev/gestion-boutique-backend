const express = require('express');
const clientRoutes = require('./clientRoutes');

const router = express.Router();

// Assurez-vous que cette ligne est correcte
router.use('/clients', clientRoutes);

module.exports = router;
