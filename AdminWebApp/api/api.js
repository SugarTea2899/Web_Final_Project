const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const user = require('../models/user');

module.exports={
//  test: function(req, res, next){
//    const page = req.query.page;
//    let result;
//    if (page === undefined) //ko co truyen
//      result = {url: "/api"};
//    else {
//      result = {url: "/api", page: page};
//    }
//    res.json(result);
//  },
//  getList: function(req, res, next){
//    res.json({abc: "xyz"});
//  },

  loadAccounts: async function(req, res, next){
    const page = req.query.page;


    if (page === undefined) {
      res.json("Page number is not defined");
      return;
    }

    const userAccounts = await user.find().skip(1 * (page - 1)).limit(1);
    console.log(userAccounts.length);
    res.json(userAccounts);

  }
}
