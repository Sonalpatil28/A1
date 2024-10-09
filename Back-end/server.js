// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// // Replace with your actual connection string
// const connectionString = 'mongodb://localhost:27017/transactionDB';

// mongoose.connect(connectionString)
//     .then(() => {
//         console.log('MongoDB connected successfully');
//         // Start your server after successful connection
//         const PORT = process.env.PORT || 5006;
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//     });
// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const connectionString = 'mongodb://localhost:27017/transactionDB'; // Replace with your actual connection string
mongoose.connect(connectionString)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Example data model (Adjust as necessary)
const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    title: String,
    amount: Number,
    date: Date,
}));

// API endpoint to fetch transactions
app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});

// API endpoint to fetch statistics
app.get('/api/statistics', async (req, res) => {
    try {
        // Example: Return some statistics
        const totalTransactions = await Transaction.countDocuments();
        res.json({ totalTransactions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics' });
    }
});

// Start the server
const PORT = process.env.PORT || 6005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
