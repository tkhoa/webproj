const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    fullname: { type: String },
    auth: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
});

module.exports = mongoose.model('Users', UsersSchema);