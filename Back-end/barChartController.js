const Transaction = require('../models/Transaction');

exports.getBarChart = async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(`${month} 1`);
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const priceRanges = [
      { range: '0-100', count: 0 },
      { range: '101-200', count: 0 },
      // More ranges...
      { range: '901-above', count: 0 }
    ];

    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) priceRanges[0].count++;
      else if (price <= 200) priceRanges[1].count++;
      // Add other ranges
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
};
