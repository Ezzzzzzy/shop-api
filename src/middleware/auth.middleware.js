const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = await jwt.verify(token, process.env.JWT_KEY)
        req.user = user;
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: "Auth Failed"
        })
    }
}