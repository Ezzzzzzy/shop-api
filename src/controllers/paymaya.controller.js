let mongoose = require("mongoose")

/* Endpoint that is passed to paymaya to update the order.
*  This is not the right way to implement the update.
*  Should implement webhook that receives the update sent by paymaya after
*  success transaction inside the checkout
*/
exports.finishOrder = async (req, res) => {
    let Order = mongoose.model("Order")
    try {
        let userOrder = await Order.findOne({
            _id: req.params.id
        })

        switch (req.params.status) {
            case "success":
                userOrder.status = "SUCCESS"
                break;
            case "failed":
                userOrder.status = "FAILED"
                break;
            case "cancel":
                userOrder.status = "CANCELLED"
                break;
        }

        await userOrder.save()

        res.json({ message: req.params.status })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "FAILED" })
    }
}
