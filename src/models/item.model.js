let mongoose = require("mongoose")
let Schema = mongoose.Schema

let ItemSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})