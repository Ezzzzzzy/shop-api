let mongoose = require("mongoose")

exports.create = async (req, res) => {
    try {
        let Product = mongoose.model('Product')
        let newProduct = new Product(req.body);
        let response = await newProduct.save();

        return res.json(response);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Create product failed" })
    }
}

exports.get = async (req, res) => {
    let Product = mongoose.model("Product")
    let allProducts = await Product.find({});

    return res.json({
        data: allProducts
    })
}

exports.update = async (req, res) => {
    try {
        let Product = mongoose.model("Product")
        await Product.findOneAndUpdate({ _id: req.params.id }, req.body)
        let product = await Product.findOne({ _id: req.params.id })
        return res.json({
            product: product
        })
    } catch (eerr) {
        console.log(err)
        return res.status(500).json({ message: "Update product failed" })
    }
}