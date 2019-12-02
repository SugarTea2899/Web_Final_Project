product = require('../models/product.js');

module.exports = {
    getListProducts: async function(req, res) {
        try {
            const type = req.query.type;
            const brand = req.query.brand;
            if (type === undefined && brand === undefined) {
                const docs = await product.find();
                if (req.isAuthenticated())
                {
                    res.render('pages/category',{
                        products: docs,
                        isAuthenticated: true,
                        username: req.user.fullName
                    } );
                }
                else
                {
                    res.render('pages/category', {
                        products: docs,
                        isAuthenticated: false,
                        username: null
                    });
                }
            } else {
                if (type !== undefined) {
                    const docs = await product.find({ type: type });
                    if (req.isAuthenticated())
                    {
                        res.render('pages/category',{
                            products: docs,
                            isAuthenticated: true,
                            username: req.user.fullName
                        } );
                    }
                    else
                    {
                        res.render('pages/category', {
                            products: docs,
                            isAuthenticated: false,
                            username: null
                        });
                    }
                } else {
                    if (brand !== undefined) {
                        const docs = await product.find({ brand: brand });
                        if (req.isAuthenticated())
                        {
                            res.render('pages/category',{
                                products: docs,
                                isAuthenticated: true,
                                username: req.user.fullName
                            } );
                        }
                        else
                        {
                            res.render('pages/category', {
                                products: docs,
                                isAuthenticated: false,
                                username: null
                            });
                        }
                    }
                }
            }
        } catch (e) {
            next(e);
        }
    }
};