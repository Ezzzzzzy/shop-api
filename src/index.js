
// import connect from "./config/db.config.js"
// import { register } from "./controllers/user.controller.js"
// import User from "./models/user.model.js"
const express = require("express");
const db = require("./config/db.config")
const User = require("./models/user.model")
const UserController = require("./controllers/user.controller")


db.connect()
const app = express()

app.use(express.json())

app.route('/auth/register')
  .post(UserController.register)
app.get('/', (req, res) => {
  res.json({
    "data": "Hello World!"
  })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
