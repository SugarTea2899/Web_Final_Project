const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const product = require('../models/product');
const fs = require('fs');
const bill_detail = require('../models/bill-detail');
const bill = require('../models/bill');


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
  },

  findTopTen: async function(req, res, next) {
    const billDetailList = await bill_detail.find();
    const productList = await product.find();

    let idList = [];
    var rankingProduct = [];
    for(i = 0; i < productList.length; i++)
    {
      var id = productList[i]._id;
      var name = productList[i].name;
      rankingProduct.push({_id: id, name: name, quantity: 0});
      idList.push(id);
    }
    //Tính số lượng của mỗi sản phẩm
    for(i = 0; i < billDetailList.length; i++)
    {
      var detailId = billDetailList[i].productId;
      var index = idList.findIndex(p => p == billDetailList[i].productId);
      if (index == -1) continue;
      rankingProduct[index].quantity = rankingProduct[index].quantity + billDetailList[i].quantity;

    }
    //Sắp xếp từ lớn tới nhỏ
    rankingProduct.sort(function(a,b) {
      return b.quantity - a.quantity;
    })

    var topTen = [];
    for(i=0;i<rankingProduct.length;i++)
    {
      if (i == 10)
      {
        break;
      }

      topTen.push(rankingProduct[i]);
    }

    res.json(topTen);
  },

  getSales:async function(req, res, next) {

    const startDate = new Date(req.query.startdate);
    const endDate = new Date(req.query.enddate);
    //const now = new Date();
    endDate.setDate(endDate.getDate() + 1);

    const bills = await bill.find({createOn: {$gte: startDate, $lte: endDate}});
    let totalPrice = 0;

    for(i = 0; i < bills.length; i++)
    {
      totalPrice = totalPrice + bills[i].totalBill;
    }
    res.json(totalPrice);
  },

  loadBills: async function(req, res, next){
    const page = req.query.page;

    if (page === undefined) {
      res.json("Page number is not defined");
      return;
    }

    const bills = await bill.find().skip(5 * (page - 1)).limit(5);
    const total = await bill.find().count();
    res.json({total: total, bills: bills});
  }

}
