// controllers/transactionController.js
const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    const { month } = req.query;
    // Convert the month to a Date range for querying
    const startOfMonth = new Date(`${month} 1`);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $gte: startOfMonth, $lte: endOfMonth }
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching transactions", error });
    }
};
