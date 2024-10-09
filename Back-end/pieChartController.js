const Transaction = require('../models/Transaction');

exports.getPieChart = async (req, res) => {
  try {
    const { month } = req.query;

    // Ensure month is provided and is valid
    if (!month) {
      return res.status(400).json({ message: 'Month is required' });
    }

    // Map month name to a number (0 for January, 11 for December)
    const monthIndex = new Date(`${month} 1`).getMonth();
    if (isNaN(monthIndex)) {
      return res.status(400).json({ message: 'Invalid month provided' });
    }

    // Get the start and end date of the selected month
    const startOfMonth = new Date(new Date().getFullYear(), monthIndex, 1);
    const endOfMonth = new Date(new Date().getFullYear(), monthIndex + 1, 0);

    // Fetch transactions within the date range
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // If no transactions are found, return an empty result
    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this month' });
    }

    // Count transactions per category
    const categoryCounts = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + 1;
      return acc;
    }, {});

    // Return the category counts as a pie chart data
    res.status(200).json(categoryCounts);
  } catch (error) {
    console.error('Error in getPieChart:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
