const product = require('../models/product');

module.exports = {
    PostProductInfoToDatabase: async function(req, res, next, id, link) {
        const filter = { _id: id };
        const update = {
            name: req.body.name,
            type: req.body.type,
            price: parseInt(req.body.price),
            brand: req.body.brand,
            image: link,
            quantity: parseInt(req.body.quantity)
        }
        try {
            let pro = await product.findOneAndUpdate(filter, update, {useFindAndModify: false});
            if (pro != null)
            {
                res.redirect('/product/add?result=1');
            }
            else{
                res.redirect('/product/add?result=0');
            }
        }
        catch (e) {
            next(e);
        }
    },

    addNewProduct: function(req, res, next) {
        let result = req.query.result;
        if (result === undefined)
            result = -1;
        
        if (req.isAuthenticated()) {
            res.render('pages/add-product', {
                isAuthenticated: true,
                username: req.user.fullName,
                loginname: req.user.username,
                result: result
            });
        }
        else {
            res.redirect('/admin/login');
        }
    },
}