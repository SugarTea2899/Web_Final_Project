product = require('../models/product.js');

module.exports = {
    getListProducts: async function(req, res) {
        try {
            const type = req.query.type;
            const brand = req.query.brand;
            if (type === undefined && brand === undefined) {
                const docs = await product.find();
                res.render('pages/category', { products: docs });
            } else {
                if (type !== undefined) {
                    const docs = await product.find({ type: type });
                    res.render('pages/category', { products: docs });
                } else {
                    if (brand !== undefined) {
                        const docs = await product.find({ brand: brand });
                        res.render('pages/category', { products: docs });
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
};