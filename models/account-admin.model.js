const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    fullName: String,
    email: String,
    password: String,
    status: String
})

const AccountAdmin = mongoose.model('AccountAdmin', schema, "accounts-admin")

module.exports = AccountAdmin;