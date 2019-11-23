module.exports = {
    getProductDetails: function(req, res, product) {
        res.render('pages/single-product', { product: product });
    }
}