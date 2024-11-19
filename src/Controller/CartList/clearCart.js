
const User = require('../../models/user');
const clearCart=async(req,res)=>{
    const {token} = req.headers;
    try{
        const user = await User.findUser( token );
        if( !user )
            return res.status(400).send({Message: 'User is not logged in.'});
        if( user.cart.length === 0)
            return res.status(400).send({Message: 'Cart is empty.'});
        user.cart = [];
        await user.save();
        res.send({Message:"Thanks for visit us!"});
    }
    catch(e){
        res.status(500).send(e);
    }
}
module.exports={clearCart}