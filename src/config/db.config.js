const mongoose = require("mongoose")
const env = require("./env.config")

mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected")
})

mongoose.connection.on("error", (err) => {
    console.log(`Could not connect to MongoDB because of ${err}`)
    process.exit(1)
})

if (env.config.env === 'dev') {
    mongoose.set('debug', true)
}

exports.connect = async () => {

    var mongoURI = (env.config.env === 'prod' || 'dev' ? env.config.mongo.uri : env.config.mongo.testURI)

    await mongoose.connect(mongoURI, {
        keepAlive: 1,
        useNewUrlParser: true
    })


    return mongoose.connection
}

