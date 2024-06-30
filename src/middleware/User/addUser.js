const User = require('../../models/user');
const addUser=async (req,res) => {
    const info = req.body;
    try{
        const user = new User(info);
        if( !user )
            return res.status(404).send({Message: 'You logged before using this email'} );
        if( user.password.length < 6 )
            return res.status(404).send({Message: 'Invalid credentials.'} );
        const token = await user.generateToken();
        await user.save();
        res.send({token});
    }
    catch(e){
       // if(e.errors.email.properties.message === 'Invalid email')
            return res.status(400).send( {Message: 'Invalid credentials.'});
      //  res.status(500).send(e);
    }
}
module.exports={addUser}
