const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

},
 { timestamps: true} // this will add createdAt and updatedAt fields to the schema
);

module.exports = mongoose.model('Posts', postSchema);

