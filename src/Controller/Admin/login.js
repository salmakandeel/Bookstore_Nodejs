
const Admin = require('../../models/admin');
const bcrypt=require('bcrypt')
const login= async(req,res) =>{
    const loginInfo = req.body;
    
    try {
        const admin = await Admin.findOne({ email: loginInfo.email });
        
        
        if (!admin)
            return res.status(404).send({ Message: 'Invalid credentials.' });
        const isMatch = await bcrypt.compare(loginInfo.password, admin.password);
        if (!isMatch)
            return res.status(404).send({ Message: 'Invalid credentials.' });
        const token = await admin.generateToken();
        await admin.save();
        res.send({
            Message: "You login successfully!",
            "token": token
        });
    }
    catch (e) {
        return res.status(400).send({ Message: e });
    }

};




/**
* Verifies admin token and sends back the last token.
*/
const verifyAdminToken= async (req, res) => {
   try {
       const admin = await Admin.findOne({ email: req.body.email });
        if (!admin)
            return res.status(404).send({ Message: 'Invalid credentials.' });
        const token=admin.tokens[admin.tokens.length-1].token
        res.send( { "token":token } );
   }
   catch (e) {
       res.status(400).send(e);
   }
}
module.exports={login,verifyAdminToken}