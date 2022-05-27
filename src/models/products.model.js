const mongoose = require("mongoose")

let Schema = mongoose.Schema

let ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Product', ProductSchema)


