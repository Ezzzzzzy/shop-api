const express = require("express");
const db = require("./config/db.config")
const dotenv = require('dotenv')
const authMiddleware = require("./middleware/auth.middleware")
const merchantMiddleware = require("./middleware/merchant.middleware")
const customerMiddleware = require("./middleware/customer.middleware")
const User = require("./models/user.model")
const Product = require("./models/products.model")
const Order = require("./models/order.model")
const Item = require("./models/item.model")
const UserController = require("./controllers/user.controller")
const ProductController = require("./controllers/product.controller")
const OrderController = require("./controllers/order.controller")
const PaymayaController = require("./controllers/paymaya.controller")


dotenv.config()
db.connect()
const app = express()

app.use(express.json())
app.use('/products', [authMiddleware, merchantMiddleware])
app.use("/orders", [authMiddleware, customerMiddleware])

app.route('/auth/login')
  .post(UserController.login)
app.route('/auth/register')
  .post(UserController.register,)
app.route('/products')
  .get(ProductController.get)
  .post(ProductController.create)
app.route('/products/:id')
  .put(ProductController.update)
  .delete(ProductController.delete)
app.route('/orders')
  .post(OrderController.addItem)
  .get(OrderController.getOrder)
  .put(OrderController.updateOrder)
app.route('/orders/checkout')
  .post(OrderController.checkout)
app.route('/paymaya/:id/:status')
  .get(PaymayaController.finishOrder)

app.get('/test', authMiddleware, (req, res) => {
  res.json({
    "data": "Hello World!"
  })
})

module.exports = app

