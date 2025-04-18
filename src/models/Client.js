const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  deposit: { 
    type: Number, 
    default: 0 
  },
  totalDebt: { 
    type: Number, 
    default: 0 
  },
  debts: [{
    amount: { 
      type: Number, 
      required: true 
    },
    productName: { 
      type: String, 
      required: true 
    }, 
    date: { 
      type: Date, 
      default: Date.now 
    },
    paid: { 
      type: Boolean, 
      default: false 
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', clientSchema);
