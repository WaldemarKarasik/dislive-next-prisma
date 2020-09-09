const nc = require('next-connect')
const dbConnection = require('./dbConnection')

const handler = nc()

handler.use(dbConnection)

module.exports = handler