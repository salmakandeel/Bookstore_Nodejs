const User = require('../../models/user');
const addUser = async (req, res) => {
    const signUpInfo = req.body;

    try {
        const isExist = await User.findOne({ email: signUpInfo.email });

        if (isExist)
            return res.status(404).send({ Message: 'You logged before using this email' });
        else{
            const user=new User(signUpInfo)
        //save new user
        await user.save();
        res.send({ Message: 'You registered successfully! ' })}
    }
    catch (e) {
        return res.status(400).send({ Message: e });
    }
}
module.exports = { addUser }
