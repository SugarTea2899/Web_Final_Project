adminDB = require('../models/admin.js');
module.exports= {
    checkUserInfo: async function (username){
        try{
            const admin = await adminDB.findOne({username: username});
            if (admin == null)
                return true;
            return false;
        }
        catch(e)
        {
            throw(e);
        }
        
    }
}