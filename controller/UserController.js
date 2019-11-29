userDB = require('../models/users.js');
module.exports= {
    checkUserInfo: async function (username){
        try{
            const user = await userDB.findOne({username: username});
            if (user == null)
                return true;
            return false;
        }
        catch(e)
        {
            next(e);
        }
        
    }
}