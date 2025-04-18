const express = require('express');
const clientRoutes = require('./clientRoutes');

const router = express.Router();

router.use('/clients', clientRoutes);

module.exports = router;

