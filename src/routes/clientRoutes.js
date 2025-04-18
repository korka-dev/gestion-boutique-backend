const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

// Routes pour les clients
router.get('/', clientController.getClients);
router.post('/', clientController.createClient);
router.get('/:id', clientController.getClientById);
router.post('/:id/debts', clientController.addDebt);
router.put('/:id/debts/:debtId/pay', clientController.payDebt);

module.exports = router;

