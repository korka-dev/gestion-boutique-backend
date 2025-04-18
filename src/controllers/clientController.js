const Client = require('../models/Client');

// Récupérer tous les clients
exports.getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    next(error);
  }
};

// Créer un nouveau client
exports.createClient = async (req, res, next) => {
  try {
    const initialDebt = Number(req.body.initialDebt) || 0;
    
    const client = new Client({
      name: req.body.name,
      phone: req.body.phone,
      deposit: req.body.deposit || 0,
      totalDebt: initialDebt,
      debts: initialDebt ? [{
        amount: initialDebt,
        productName: req.body.initialProductName || 'Produit initial',
        date: new Date()
      }] : []
    });
    
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
};

// Récupérer un client par ID
exports.getClientById = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json(client);
  } catch (error) {
    next(error);
  }
};

// Ajouter une dette à un client
exports.addDebt = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    
    const amount = Number(req.body.amount);
    
    client.debts.push({
      amount: amount,
      productName: req.body.productName,
      date: new Date()
    });
    
    client.totalDebt += amount;
    
    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    next(error);
  }
};

// Marquer une dette comme payée
exports.payDebt = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    const debt = client.debts.id(req.params.debtId);
    if (!debt) {
      return res.status(404).json({ message: 'Dette non trouvée' });
    }

    if (!debt.paid) {
      debt.paid = true;

      // Recalculer la dette totale
      client.totalDebt = client.debts.reduce((total, d) => {
        return !d.paid ? total + d.amount : total;
      }, 0);
    }

    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    next(error);
  }
};
