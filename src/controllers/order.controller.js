let mongoose = require("mongoose")

exports.addItem = async (req, res) => {
    let Order = mongoose.model("Order");
    let Product = mongoose.model("Product")
    let Item = mongoose.model("Item")
    try {
        let userOrder = await Order.findOne({
            owner: req.user,
            status: "PENDING"
        }).populate("items").populate({
            path: "items", populate: {
                path: "product",
                model: "Product"
            }
        })
        let product = await Product.findOne({ _id: req.body.productId })

        if (!userOrder) {
            let newOrder = new Order({
                status: "PENDING",
                owner: req.user,
            })

            let item = new Item({
                order: newOrder,
                product: product,
                quantity: req.body.quantity,
                amount: req.body.quantity * product.price
            })

            await item.save()
            newOrder.items.push(item)
            newOrder = await newOrder.save()
        } else {
            let isSameProduct = userOrder.items.find(value => value.product.code == product.code)
            if (isSameProduct) {
                let item = await Item.findOne({ product: product })
                item.quantity = item.quantity + req.body.quantity
                item.amount = item.quantity * product.price
                item.save()
            } else {
                console.log('asdasdasdasd')
                let item = new Item({
                    order: userOrder,
                    product: product,
                    quantity: req.body.quantity,
                    amount: req.body.quantity * product.price
                })
                await item.save()
                await Order.findOneAndUpdate(
                    { owner: req.user },
                    { $push: { items: item } }
                );
            }
        }

        return res.json(userOrder)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Add to cart failed" })
    }
}

exports.getOrder = async (req, res) => {
    let Order = mongoose.model("Order");
    let userOrder = await Order.findOne({
        owner: req.user,
        status: "PENDING"
    }).populate("items").populate({
        path: "items", populate: {
            path: "product",
            model: "Product"
        }
    })

    if (!userOrder) return res.status(500).json({ message: "No existing Order" })

    return res.json(userOrder)
}

exports.updateOrder = async (req, res) => {
    let Order = mongoose.model("Order");
    let Item = mongoose.model("Item")
    try {
        let userOrder = await Order.findOne({
            owner: req.user,
            status: "PENDING"
        }).populate("items").populate({
            path: "items", populate: {
                path: "product",
                model: "Product"
            }
        })

        if (!userOrder) return res.status(500).json({ message: "No existing Order" })

        req.body.items.forEach(async item => {
            let itemValue = await Item.findOne({ _id: item.itemId }).populate("product")
            if (item.quantity == 0) {
                userOrder.items.pull({ _id: item.itemId })
                await Item.deleteOne({ _id: item.itemId })
                await userOrder.save()
            } else {
                itemValue.quantity = item.quantity
                itemValue.amount = item.quantity * itemValue.product.price
            }
            await itemValue.save()
        });

        return res.json({ message: "update success" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Update order failed" })
    }
}
