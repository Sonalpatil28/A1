const Transaction = require('../models/Transaction');

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  
  const startOfMonth = new Date(`${month} 1`);
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const totalSales = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
    const soldItems = transactions.filter(transaction => transaction.sold).length;
    const unsoldItems = transactions.filter(transaction => !transaction.sold).length;

    res.status(200).json({
      totalSales,
      soldItems,
      unsoldItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};
