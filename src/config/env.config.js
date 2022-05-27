const dotenv = require('dotenv')
dotenv.config()

exports.config = {
    port: process.env.PORT,
    env: process.env.ENV,
    secret: process.env.APP_SECRET,
    hostname: process.env.HOSTNAME,
    mongo: {
        uri: process.env.MONGOURI,
        testURI: process.env.MONGOTESTURI
    },
}
