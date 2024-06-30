const User=require('../../models/user')
const bcrypt = require('bcrypt');
const loginUser=async (req,res)=>{
    const loginInfo = req.body;
    try{
        const user = await User.findOne( {email: loginInfo.email} );
        if( !user )
            return res.status(404).send({Message: 'Invalid credentials.'});
        const isMatch = await bcrypt.compare( loginInfo.password, user.password);
        if( !isMatch)
            return res.status(404).send({Message: 'Invalid credentials.'});
        
        res.send( {Message:"You loggeg successfully!"} );
    }
    catch(e){
        res.status(500).send(e);
    }
}
module.exports={loginUser}