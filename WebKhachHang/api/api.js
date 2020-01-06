const productDB = require('../models/product');
const cartDB = require('../models/cart');
const billDB = require('../models/bill');
const billDetailDB = require('../models/bill-detail');
const commentDB = require('../models/comment');

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
    },

    checkOutBill: async function(req, res, next){
        const data = req.body;
        const bill = new billDB({
            fullname: data.userInfo.name,
            phone: data.userInfo.phone,
            userId: data.userInfo.id,
            email: data.userInfo.email,
            address: data.userInfo.address,
            note: data.userInfo.note,
            createOn: data.createOn,
            totalBill: data.totalBill
        });

        await bill.save();
        
        for (i = 0; i < data.cartList.length; i++){
            const cartItem = data.cartList[i];
            const product = await productDB.findById(cartItem.product._id);

            if (product.quantity < cartItem.quantity){
                const billDel = await billDetailDB.find({billId: bill._id});
                for (i = 0; i < billDel.length; i++){
                    await billDetailDB.deleteOne({_id: billDel[i]._id});
                }
                await billDB.deleteOne({_id: bill._id});
                const errMess = 'Lỗi: ' + product.name + ' không đủ số lượng';
                res.json({res: false, message: errMess});
                return;
            }

            product.quantity -= cartItem.quantity;

            const billDetail = new billDetailDB({
                billId: bill._id,
                productId: cartItem.product._id,
                quantity: cartItem.quantity,
                totalPrice: cartItem.totalPrice
            });
            await product.save();
            await billDetail.save();
        }

        await cartDB.deleteMany({userId: data.userInfo.id});
        res.json({res: true});
    },

    sendCmt: async function(req, res, next){
        const data = req.body;
        const cmt = new commentDB({
            userId: data.userId,
            fullname: data.fullname,
            createOn: data.createOn,
            productId: data.productId,
            cmt: data.cmt
        });
        await cmt.save();
        res.json({res: true});
    },
    getListCmt: async function(req, res, next){
        const id = req.query.id;
        const page = req.query.page;
        if (id === undefined || page === undefined){
            res.json({res: false, message: 'Page number is not define'});
            return;
        }else{
            const cmtList = await commentDB.find({productId: id})
                                            .sort({createOn: 1})
                                            .skip(4 * (page - 1))
                                            .limit(4);
            
            res.json(cmtList);
        }
    },

    getUserBill: async function(req, res, next){
        const userId = req.query.id;
        if (userId === undefined){
            res.json({res: false});
        }else{
            const userBill = await billDB.find({userId: userId});
            const result = [];
            for (i = 0; i < userBill.length; i++){
                const billItem = userBill[i];
                const cartList = [];
                const billItemDetail = await billDetailDB.find({billId: billItem._id});
                for (j = 0; j < billItemDetail.length; j++){
                    const detail = billItemDetail[j];
                    const product = await productDB.findById(detail.productId);
                    const cartItem = {
                        product: product,
                        quantity: detail.quantity,
                        totalPrice: detail.totalPrice
                    };
                    cartList.push(cartItem);
                }

                const billResult = {
                    cartList: cartList,
                    fullname: billItem.fullname,
                    address: billItem.address
                };
                result.push(billResult);
            }
            res.json(result);
        }
    }


}