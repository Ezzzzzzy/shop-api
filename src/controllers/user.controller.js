const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const env = require('../config/env.config')
let mongoose = require("mongoose");

exports.register = async (req, res) => {
    let User = mongoose.model('User')

    let newUser = new User(req.body);
    newUser.hash_password = await bcryptjs.hashSync(req.body.password, 10);

    let response = await newUser.save();

    return res.json(response);
}

exports.login = async (req, res) => {
    try {
        let user = mongoose.model('User')
        user = await user.findOne({ email: req.body.email }).exec()

        if (!user) return res.status(401).json({ "message": "Auth Failed" })

        let validate = await bcryptjs.compare(req.body.password, user.hash_password)

        if (!validate) return res.status(401).json({ "message": "Auth Failed" })

        const token = await jwt.sign(
            {
                ...user,
            }, process.env.JWT_KEY,
            {
                expiresIn: "1h"
            })

        return res.json({
            "message": "Auth Successful",
            "token": token
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}

