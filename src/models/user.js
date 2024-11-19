const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2,"Name must be at least 2 characters"]
       
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    email:{
        type: String,
        unique: true,
        required: true,
        validate: [ emailRegex, 'invalid email' ]

    },
    password:{
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
    cart: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Book'
        }
    }]
});

/**
 * Encrypts password if needed before every password save or user creation.
 */
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const userPassword = await bcrypt.hash(this.password, 8);
        this.password = userPassword;
    }
    next();
});

/**
 * Generates a logging token for a user.
 * @returns String token.
 */
userSchema.methods.generateToken =  function () {
    const token =  jwt.sign({ ID: this.ID }, '3000', { expiresIn: "1d" });
    this.tokens = this.tokens.concat({ token });
    
    return token;
};

/**
 * Finds the user who holds the given token.
 * @param {User token} token 
 * @returns User object or undefined
 */
userSchema.statics.findUser = async ( token ) => {
    const users = await User.find({});
    for(let i = 0; i < users.length; i++){
        for(let j = 0; j < users[i].tokens.length; j++){
            if( token === users[i].tokens[j].token )
                return users[i];
        }
    }
}



const User = mongoose.model('Users',userSchema);
module.exports = User;