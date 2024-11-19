const User = require('../../models/user');
const userLogout=async(req,res)=>{
    const {token} = req.headers;
    try{
        const user = await User.findUser( token );
        if( !user )
            return res.status(400).send( { Message: 'User not logged in. Cannot logout.'} )
        for(let i = 0; i < user.tokens.length; i++){
            if( token === user.tokens[i].token ){
                user.tokens[i].token += 'Im gonna ruin this token';
                break;
            }
        }
        await user.save();
        res.send({ Message:"You logout successfully!" });
   
    }
    catch(e){
        res.status(500).send(e);
    }
}
module.exports={userLogout}