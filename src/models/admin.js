const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2,"Name must be at least 2 characters"]
        
    },
    role: { type: String, enum: ['admin', 'admin'], default: 'admin' },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [ emailRegex, 'invalid email' ]
    },
    password: {
        type: String,
        required: true,
       minlength: [6,"Password must be at least 6 characters"]
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
 * Finds the admin who holds the given token.
 * @param {Admin token} token 
 * @returns admin object or undefined
 */
adminSchema.statics.findAdmin = async ( token ) => {
    const admins = await Admin.find({});
    for(let i = 0; i < admins.length; i++){
        for(let j = 0; j < admins[i].tokens.length; j++){
            if( token === admins[i].tokens[j].token )
                return admins[i];
        }
    }
}
/**
 * Verifies the given token.
 * @param {Admin token} token 
 * @returns Admin ID
 */


const Admin = mongoose.model('Admins', adminSchema);
module.exports = Admin;