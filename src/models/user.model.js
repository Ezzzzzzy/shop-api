const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
}

mongoose.model('User', UserSchema)
