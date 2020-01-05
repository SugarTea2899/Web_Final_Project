const productDB = require('../models/product');
const cartDB = require('../models/cart');

module.exports = {
    getListProduct: async function(req, res, next){
        const page = req.query.page;
        let sort = req.query.sort;
        let brand = req.query.brand;
        let type = req.query.type;

        if (page === undefined){
            res.json({message: "Page number is not define,"});
            return;
        }

        if (sort === undefined)
            sort = 1;
        
        if (brand === undefined && type === undefined){
            const products = await productDB.find().sort({price: sort})
                .skip(12 * (page - 1))
                .limit(12);

            const total = await productDB.find().countDocuments();
            const result = {total: total, productList: products};

            res.json(result);
        }
        else{
            if (brand !== undefined && type === undefined){
                const brandArr = brand.split(',');
                const products = await productDB.find({ brand: {$in: brandArr}})
                                            .sort({price: sort})
                                            .skip(12 * (page - 1))
                                            .limit(12);

                const total = await productDB.find({ brand: {$in: brandArr}}).count();
                const result = {total: total, productList: products};

                res.json(result);
            }else{
                if (brand === undefined && type !== undefined){
                    const typeArr = type.split(',');
                    const products = await productDB.find({ type:{ $in: typeArr}})
                                              .sort({price: sort})
                                              .skip(12 * (page - 1))
                                              .limit(12);

                    const total = await productDB.find({ type:{ $in: typeArr}}).count();

                    const result = {total: total, productList: products};
                    res.json(result);
                }
                else{
                    const typeArr = type.split(',');
                    const brandArr = brand.split(',');
                    const products = await productDB.find({ brand: {$in: brandArr}, type: {$in: typeArr}})
                                                    .sort({price: sort})
                                                    .skip(12 * (page - 1))
                                                    .limit(12);
                    
                    const total = await productDB.find({ brand: {$in: brandArr}, type: {$in: typeArr}}).count();
                    const result = {total: total, productList: products};
                    res.json(result);
                }
            }
        }

    },
    updateCart: async function(req, res, next){
        try{
            const data = req.body;
            const cartItem = await cartDB.findOne({userId: data.userId, productId: data.productId});

            if (cartItem != null){
                if (data.quantity > 0){
                    cartItem.quantity = data.quantity;
                    cartItem.totalPrice = data.totalPrice;
                    await cartItem.save();
                    res.json({res: true});
                }else{
                    await cartDB.deleteOne({_id: cartItem._id});
                    res.json({res: true});
                }
                
            }else{
                const newItem = new cartDB({
                    userId: data.userId,
                    productId: data.productId,
                    quantity: data.quantity,
                    totalPrice: data.totalPrice
                });
                await newItem.save();
            }
        }catch(e){
            res.json({res: false});
            throw(e);
        }
    },
    getListCart: async function(req, res, next){
        const userId = req.query.userId;
        if (userId === undefined)
        {
            res.json({res: false});
            return;
        }

        const carts = await cartDB.find({userId: userId});
        console.log(carts);
        const cartList = [];

        for (i = 0; i < carts.length; i++){
            const item = carts[i];
            const product = await productDB.findById(item.productId);
            const cartListItem = {product: product, quantity: item.quantity, totalPrice: item.totalPrice};
            cartList.push(cartListItem);
        }

        res.json(cartList);
    }
}