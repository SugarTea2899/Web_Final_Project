var multer = require('multer');
var productDB = require('../models/product');
let id;
let link;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename: async function(req, file, cb) {
    const product = new productDB();
    id = product._id;
    link = '/images/' + id + '.' + file.originalname.split('.').pop().toLowerCase();
    await product.save();
    cb(null, id + '.' + file.originalname.split('.').pop().toLowerCase())
  }
});
var upload = multer({storage:storage});

module.exports = {
  uploadImage: function() {
    return upload.single("image");
  },
  getId: function() {
    return id;
  },
  getLink: function() {
    return link;
  }
}