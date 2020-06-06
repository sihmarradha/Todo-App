const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    todoArr: [
        {
            todoName: {
                type: String
            }
        }
    ]
}, {timestamps:true});

module.exports = mongoose.model('User', userSchema);
