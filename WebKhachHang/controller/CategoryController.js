product = require('../models/product.js');

module.exports = {
    getListProducts: async function(req, res, next) {
        try {
            const type = req.query.type;
            const brand = req.query.brand;
            let sort = req.query.sort;
            let page = req.query.page;
            let totalPages;
            if (sort === undefined) sort = 1;
            if (page === undefined) page = 1;

            if (type === undefined && brand === undefined) {
                const docs = await product.find().sort({price: sort})
                                                 .skip(12 * (page - 1))
                                                 .limit(12);
                totalPages = (await product.find().count()) / 12;

                if (!Number.isInteger(totalPages)) totalPages++;

                if (req.isAuthenticated())
                {
                    res.render('pages/category',{
                        isAuthenticated: true,
                        username: req.user.fullName,
                        sortActive: sort,
                        pageActive: page,
                    } );
                }
                else
                {
                    res.render('pages/category', {
                        isAuthenticated: false,
                        username: null,
                        sortActive: sort,
                        pageActive: page,
                    });
                }
            } else {
                if (type !== undefined && brand === undefined) {
                    const typeArr = type.split(',');
                    const docs = await product.find({ type:{ $in: typeArr}})
                                              .sort({price: sort})
                                              .skip(12 * (page - 1))
                                              .limit(12);

                    totalPages = (await product.find({ type:{ $in: typeArr}}).count()) / 12;
                    if (!Number.isInteger(totalPages)) totalPages++;

                    if (req.isAuthenticated())
                    {
                        res.render('pages/category',{
                            isAuthenticated: true,
                            username: req.user.fullName,
                            sortActive: sort,
                            pageActive: page,
                        } );
                    }
                    else
                    {
                        res.render('pages/category', {
                            isAuthenticated: false,
                            username: null,
                            sortActive: sort,
                            pageActive: page,
                        });
                    }
                } else {
                    if (brand !== undefined && type === undefined) {
                        const brandArr = brand.split(',');
                        const docs = await product.find({ brand: {$in: brandArr}})
                                                    .sort({price: sort})
                                                    .skip(12 * (page - 1))
                                                    .limit(12);
                        totalPages = (await product.find({ brand: {$in: brandArr}}).count()) / 12;
                        if (!Number.isInteger(totalPages)) totalPages++;

                        if (req.isAuthenticated())
                        {
                            res.render('pages/category',{
                                isAuthenticated: true,
                                username: req.user.fullName,
                                sortActive: sort,
                                pageActive: page,
                            } );
                        }
                        else
                        {
                            res.render('pages/category', {
                                isAuthenticated: false,
                                username: null,
                                sortActive: sort,
                                pageActive: page,
                                totalPages: totalPages
                            });
                        }
                    }
                    else
                    {
                        const typeArr = type.split(',');
                        const brandArr = brand.split(',');
                        const docs = await product.find({ brand: {$in: brandArr}, type: {$in: typeArr}})
                                                    .sort({price: sort})
                                                    .skip(12 * (page - 1))
                                                    .limit(12);
                        
                        totalPages = (await product.find({ brand: {$in: brandArr}, type: {$in: typeArr}}).count()) / 12;
                        if (!Number.isInteger(totalPages)) totalPages++;

                        if (req.isAuthenticated())
                        {
                            res.render('pages/category',{
                                isAuthenticated: true,
                                username: req.user.fullName,
                                sortActive: sort,
                                pageActive: page,
                                totalPages: totalPages
                            } );
                        }
                        else
                        {
                            res.render('pages/category', {
                                isAuthenticated: false,
                                username: null,
                                sortActive: sort,
                                pageActive: page,
                                totalPages: totalPages
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