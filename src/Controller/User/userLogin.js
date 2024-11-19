const User = require('../../models/user')
const bcrypt = require('bcrypt');
const loginUser = async (req, res) => {
    const loginInfo = req.body;
    
    try {
        const user = await User.findOne({ email: loginInfo.email });
        if (!user)
            return res.status(404).send({ Message: 'Invalid credentials.' });
        const isMatch = await bcrypt.compare(loginInfo.password, user.password);
        if (!isMatch)
            return res.status(404).send({ Message: 'Invalid credentials.' });
        const token = await user.generateToken();
        await user.save();
        res.send({
            Message: "You login successfully!",
            "token": token
        });
    }
    catch (e) {
        return res.status(400).send({ Message: e });
    }
}
module.exports = { loginUser }