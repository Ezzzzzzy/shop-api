
// import connect from "./config/db.config.js"
// import { register } from "./controllers/user.controller.js"
// import User from "./models/user.model.js"
const express = require("express");
const db = require("./config/db.config")
const dotenv = require('dotenv')
const authMiddleware = require("./middleware/auth.middleware")
const User = require("./models/user.model")
const Product = require("./models/products.model")
const UserController = require("./controllers/user.controller")

dotenv.config()
db.connect()
const app = express()

app.use(express.json())

app.route('/auth/register')
  .post(UserController.register,)
app.route('/auth/login')
  .post(UserController.login)

app.get('/test', authMiddleware, (req, res) => {
  res.json({
    "data": "Hello World!"
  })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
