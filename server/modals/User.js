const mongoose = require('mongoose');
const product = require('./Product');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        first: { type: String, required: true, trim: true},
        last: { type: String, required: false, trim: true}
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cart: [{ type : mongoose.Types.ObjectId, ref: product, default: []}],
    date:{
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;