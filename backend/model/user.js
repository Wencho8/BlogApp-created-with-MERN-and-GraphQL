const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  //para acelerar al hacer fetch
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Posts'
        }
    ]
    },);

userSchema.plugin(uniqueValidator);  //VALIDADOR DE EMAIL Q SEA UNICO.

module.exports = mongoose.model('User', userSchema);