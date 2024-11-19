const Admin = require('../../models/admin');
const addAdmin = async (req, res) => {
    const signUpInfo = req.body;

    try {
        const isExist = await Admin.findOne({ email: signUpInfo.email });

        if (isExist)
            return res.status(404).send({ Message: 'You logged before using this email' });
        else{
            const admin=new Admin(signUpInfo)
        //save new admin
        await admin.save();
        res.send({ Message: 'You registered successfully! ' })}
    }
    catch (e) {
        return res.status(400).send({ Message: e });
    }
}
module.exports = { addAdmin }
