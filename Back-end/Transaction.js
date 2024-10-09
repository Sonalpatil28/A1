// models/Transaction.js
const mongoose = require('mongoose'); // Import mongoose

const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    dateOfSale: { type: Date, required: true },
    // Add other relevant fields as necessary
});

// Export the model
module.exports = mongoose.model('Transaction', transactionSchema);
