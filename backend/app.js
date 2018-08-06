const express = require('express');
const mongoose = require('mongoose');

const Products = require('./models/product');
const Inventory = require('./models/inventory');

const app = express();

// User: bonobos
// Password: 7kysITciteJ0x2Xx

mongoose.connect("mongodb+srv://bonobos:7kysITciteJ0x2Xx@cluster0-2khro.mongodb.net/bonobos?retryWrites=true", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

// Access Controls for the app
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET"
  );
  next();
});

// API call to get the inventory for a given product and style
//  - Grouped by measurement (waist x length) and style to get 
//    unique counts for each product
app.get('/api/inventory/:productId', (req, res, next) => {
  Inventory.aggregate(
    [{
        $match: {
          product_id: parseInt(req.params.productId)
        }
      },
      {
        $sort: {
          waist: -1,
          length: -1,
          style: -1
        }
      },
      {
        $group: {
          _id: {
            waist: "$waist",
            length: "$length",
            style: "$style"
          },
          count: {
            $sum: "$count"
          }
        }
      }
    ]
  ).then(documents => {
    res.status(200).json({
      message: 'Inventory fetched successfully!',
      inventory: documents
    });
  });
});

// API call to get a list of products
app.get('/api/products', (req, res, next) => {
  Products.find().then(documents => {
    res.status(200).json({
      message: 'Products fetched successfully!',
      products: documents
    });
  });
});

module.exports = app;
