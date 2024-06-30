const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: [
            { validator: (value) => value.length >= 6, msg: 'Password must be at least 6 characters' },
        ]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});

/**
 * Encrypts password if needed before every save.
 */
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const adminPassword = await bcrypt.hash(this.password, 6);
        this.password = adminPassword;
    }
    next();
});

/**
 * Generates a log in token [ 15 minutes ] for admin.
 * @returns String token.
 */
adminSchema.methods.generateToken = async function () {

    const token = jwt.sign({ ID: this.ID }, '3000', { expiresIn: "1d" });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

/**
 * Verifies the given token.
 * @param {Admin token} token 
 * @returns Admin ID
 */
adminSchema.statics.verifyToken = async ( token ) => {
    const decoded = jwt.verify(token, '3000');
    return decoded
}

const Admin = mongoose.model('Admins', adminSchema);
module.exports = Admin;