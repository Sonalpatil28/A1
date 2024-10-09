const axios = require('axios');
const Transaction = require('../models/Transaction');

const fetchDataAndSeedDB = async () => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    
    await Transaction.deleteMany({}); // Clear existing data

    await Transaction.insertMany(data); // Insert new data

    console.log('Database seeded with transactions data');
  } catch (error) {
    console.error('Error fetching and seeding data:', error);
  }
};

module.exports = fetchDataAndSeedDB;
