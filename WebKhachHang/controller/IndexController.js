module.exports = {
    getCartPage: function (req, res, next){
        let empty = req.query.empty;
        if (empty === undefined)
            empty = false;
        if (req.isAuthenticated())
        {
            res.render('pages/cart',{
                breadcrumbValue: "Trang chủ / Giỏ hàng",
                isAuthenticated: true,
                username: req.user.fullName,
                empty: empty
            } );
        }
        else
        {
            res.render('pages/cart', {
                breadcrumbValue: "Trang chủ / Giỏ hàng",
                isAuthenticated: false,
                username: null,
                empty: empty
            });
        } 
    },
    getConfirmPage: function(req, res, next){
        if (req.isAuthenticated())
        {
            res.render('pages/confirmation',{
                breadcrumbValue: "Trang chủ / Xác nhận",
                isAuthenticated: true,
                username: req.user.fullName,
            } );
        }
        else
        {
            res.render('pages/confirmation', {
                breadcrumbValue: "Trang chủ / Xác nhận",
                isAuthenticated: false,
                username: null,
            });
        } 
    },
    
    getHomePage: function(req, res, next){
        if (req.isAuthenticated())
        {
            res.render('pages/index',{
                isAuthenticated: true,
                username: req.user.fullName,
                id: req.user._id
            } );
        }
        else
        {
            res.render('pages/index', {
                isAuthenticated: false,
                username: null,
                id: null
            });
        }
    },

}