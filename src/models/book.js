const mongoose = require('mongoose');
const bookschema = new mongoose.Schema({
    name: {
        type: String,
        required: true, trim: true,
        unique: true, trim: true,
        unique: true, minlength: 2
    },
    author: {
        type: String,
        required: true, minlength: 2
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Book = mongoose.model('Book', bookschema)
module.exports = Book;