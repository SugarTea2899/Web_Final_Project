const productDB = require('../models/product');

module.exports = {
    getListProduct: async function(req, res, next){
        const page = req.query.page;
        let sort = req.query.sort;

        if (page === undefined){
            res.json({message: "Page number is not define,"});
            return;
        }

        if (sort === undefined)
            sort = 1;
        
        const products = await productDB.find().sort({price: sort})
                                                .skip(12 * (page - 1))
                                                .limit(12);

        console.log(products.length);
        res.json(products);
    }
}