
const Admin = require('../../models/admin');
const bcrypt=require('bcrypt')
const login= async(req,res) =>{
    const loginInfo = req.body;
    try {
        const admin = await Admin.findOne({ email: loginInfo.email })
         if (admin==null)
         return res.status(404).send({ Message: 'Invalid credentials.' });
         const isMatch = await bcrypt.compare(req.body.password,admin.password)
         if (!isMatch)
            return res.status(404).send({ Message:'Invalid credentials.' });
      
         res.send({ Message:"You login successfully!" });
    }
    catch (e) {
        res.status(500).send(e);
    }

};




/**
* Verifies admin token and sends back the ID.
*/
const verifyAdminToken= async (req, res) => {
   try {
       const admin = await Admin.findOne({ email: req.body.email });
        if (admin==null)
            return res.status(404).send({ Message: 'Invalid credentials.' });
        res.send( { admin } );
   }
   catch (e) {
       res.status(500).send(e);
   }
}
module.exports={login,verifyAdminToken}