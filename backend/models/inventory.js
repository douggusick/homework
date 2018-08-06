const mongoose = require('mongoose');

// Schema for inventory
const inventorySchema = mongoose.Schema({
  product_id: Number,
  waist: Number,
  length: Number,
  style: String,
  count: Number
}, {
  collection: 'inventory'
});

module.exports = mongoose.model('Inventory', inventorySchema);
