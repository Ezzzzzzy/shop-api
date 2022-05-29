module.exports = async (req, res, next) => {
    try {

        if (req.user.role !== "Custmer")
            return res.status(401).json({ message: "Access denied" })

        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: "Auth Failed"
        })
    }
}