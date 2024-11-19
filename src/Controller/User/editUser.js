
const User = require('../../models/user');
const editUser=async(req,res)=>{
    try{
        const user = await User.findUser( req.headers.token );
        const updateUser = req.body;        
        if( !user )
            return res.status(400).send( { Error: 'User was not found. Please contact the management.'} );
        if( updateUser.name ){
            if( updateUser.name.length < 2 )
                return res.status(400).send({ Error: 'Name is too short.'} );
            user.name = updateUser.name;
        }
        if( updateUser.email )
            user.email = updateUser.email;
        if( updateUser.password ){
            if( updateUser.password.length < 6 )
                return res.status(400).send({ Error: 'Password is too short.'} );
            user.password = updateUser.password;
        }
        await user.save();
        res.send( {Message: 'Information has been updated.'} );
    }
    catch(e){
        res.status(500).send( e);
    }
}
module.exports={editUser}