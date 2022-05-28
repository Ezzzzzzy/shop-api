const mongoose = require("mongoose")

let Schema = mongoose.Schema

let OrderSchema = new Schema({
    status: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Item",
    }]
})

mongoose.model('Order', OrderSchema)