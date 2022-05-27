const bcryptjs = require("bcryptjs");
let jsonwebtoken = require("jsonwebtoken");
let mongoose = require("mongoose");

exports.register = async (req, res) => {
    let User = mongoose.model('User')

    let newUser = new User(req.body);
    newUser.hash_password = await bcryptjs.hashSync(req.body.password, 10);

    let response = await newUser.save();

    return res.json(response);
}

