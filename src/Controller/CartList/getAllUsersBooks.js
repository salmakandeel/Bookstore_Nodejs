
const User = require('../../models/user');
const getBooks= async(req,res)=>{
    const {token} = req.headers;
    try{
        const user = await User.findUser( token );
        if( !user )
            return res.status(400).send( {Message: 'User not logged in.'} );
        await user.populate('cart.book');
        res.send( user.cart );
    }
    catch(e){
        res.status(500).send(e);
    }
}
module.exports={getBooks}