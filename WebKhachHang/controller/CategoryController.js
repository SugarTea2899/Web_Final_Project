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
                if (type !== undefined && brand === undefined) {
                    const typeArr = type.split(',');
                    const docs = await product.find({ type:{ $in: typeArr}});
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
                    if (brand !== undefined && type === undefined) {
                        const brandArr = brand.split(',');
                        const docs = await product.find({ brand: {$in: brandArr}});
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
                    else
                    {
                        const typeArr = type.split(',');
                        const brandArr = brand.split(',');
                        const docs = await product.find({ brand: {$in: brandArr}, type: {$in: typeArr}});
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