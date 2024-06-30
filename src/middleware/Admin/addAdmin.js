const Admin = require('../../models/admin');
const addAdmin=async (req, res) => {
    const signUpInfo = new Admin(req.body);
    try {
        const admin = await Admin.findOne({ email: signUpInfo.email });
        //If you logged before with this email
        if (admin)
            return res.status(404).send({ Message: 'You is already login' });

     //create token
    let token=await  signUpInfo.generateToken()
      await signUpInfo.save()
        res.send({"token":token})

       
    }
    catch (e) {
        res.status(500).send(e);
    }
}
module.exports={addAdmin}