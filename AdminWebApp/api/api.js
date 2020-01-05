const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const product = require('../models/product');

module.exports={

  loadAccounts: async function(req, res, next){
    const page = req.query.page;


    if (page === undefined) {
      res.json("Page number is not defined");
      return;
    }

    const userAccounts = await user.find().skip(1 * (page - 1)).limit(1);
    const total = await user.find().count();

    console.log(userAccounts.length);
    res.json({total: total, accounts: userAccounts});



  },


  loadProducts: async function(req, res, next){
    const page = req.query.page;


    if (page === undefined) {
      res.json("Page number is not defined");
      return;
    }

    const products = await product.find().skip(4 * (page - 1)).limit(4);
    const total = await product.find().count();

    console.log(products.length);
    res.json({total: total, products: products});

  }
}
