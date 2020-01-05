const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const product = require('../models/product');
const fs = require('fs');

module.exports={
  loadAccounts: async function(req, res, next){
    const page = req.query.page;

    if (page === undefined) {
      res.json("Page number is not defined");
      return;
    }

    const userAccounts = await user.find().skip(5 * (page - 1)).limit(5);
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
  },

  banAccount: async function(req, res, next) {
    const id = req.query.id;
    const banUser = await user.findById(id);

    if (banUser != null) {
      if (banUser.isBanned == true)
        banUser.isBanned = false;
      else
        banUser.isBanned = true;
      await banUser.save();

      res.json({res: true});
    }else{
      res.json({res: false});
    }
  },

  deleteProduct: async function(req, res, next) {
    const id = req.query.id;
    const link = './public/images/' + id + '.jpg';
    await product.deleteOne( { _id: id }, function(err) {
      if (err) {
        res.json({res: false});
      }
      res.json({res: true});
      fs.unlinkSync(link);
    });
    
    await product.save();
  }
}
