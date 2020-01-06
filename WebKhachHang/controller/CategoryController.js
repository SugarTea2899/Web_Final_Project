product = require('../models/product.js');

module.exports = {
    getListProducts: async function(req, res, next) {
        try {
            if (req.isAuthenticated())
            {
                res.render('pages/category',{
                    breadcrumbValue: "Trang chủ / Cửa hàng",
                    isAuthenticated: true,
                    username: req.user.fullName,
                } );
            }
            else
            {
                res.render('pages/category',{
                    breadcrumbValue: "Trang chủ / Cửa hàng",
                    isAuthenticated: false,
                    username: null,
                } );
            } 
        }
         catch (e) {
            next(e);
        }
    }
};