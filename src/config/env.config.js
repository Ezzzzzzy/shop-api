const dotenv = require('dotenv')
dotenv.config()

exports.config = {
    port: process.env.PORT,
    env: process.env.ENV,
    mongo: {
        uri: process.env.MONGOURI,
        testURI: process.env.MONGOTESTURI
    },
}
