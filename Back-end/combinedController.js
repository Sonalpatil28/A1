const Transaction = require('../models/Transaction');
const { getStatistics } = require('./statsController');
const { getBarChart } = require('./barChartController');
const { getPieChart } = require('./pieChartController');

exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    // Fetch data from the other APIs
    const statsPromise = getStatistics(req, res);
    const barChartPromise = getBarChart(req, res);
    const pieChartPromise = getPieChart(req, res);

    // Wait for all promises to resolve
    const [statistics, barChart, pieChart] = await Promise.all([
      statsPromise,
      barChartPromise,
      pieChartPromise
    ]);

    // Send combined response
    res.status(200).json({
      statistics,
      barChart,
      pieChart
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching combined data', error });
  }
};
