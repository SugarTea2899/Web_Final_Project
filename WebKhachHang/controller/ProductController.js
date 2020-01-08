const productDB = require('../models/product');

module.exports = {
    getProductDetails: async function(req, res, next) {

        const id = req.query.id;
        if (id === undefined){
            res.send({message: "Not Found"});
            return;
        }

        try{
            const product = await productDB.findById(id);
            product.image = process.env.ADMIN_DOMAIN + product.image;
            
            if (req.isAuthenticated())
            {
                res.render('pages/single-product',{
                    product: product,
                    isAuthenticated: true,
                    username: req.user.fullName
                } );
            }
            else
            {
                res.render('pages/single-product', {
                    product: product,
                    isAuthenticated: false,
                    username: null
                });
            } 
        }catch(e){
            next(e);
        }
    }
}