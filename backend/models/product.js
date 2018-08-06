const mongoose = require('mongoose');

// Schema for products
const productSchema = mongoose.Schema({
  product_id: String,
  product_name: String,
  product_image: String,
  product_description: String
}, {
  collection: 'products'
});

module.exports = mongoose.model('Product', productSchema);
