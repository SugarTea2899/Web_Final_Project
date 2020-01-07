module.exports = {
    getProductDetails: function(req, res, product) {
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
    }
}