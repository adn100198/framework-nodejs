
// Use connect method to connect to the Server
const mongoose = require('mongoose');
const winston = require('winston');

// mongoose.Promise = global.Promise;
const sampleMongoConnectionUrl = process.env.DB_CONNECTION || 'mongodb://localhost:27017/niw_user';

// Connecting to the database
mongoose.connect(sampleMongoConnectionUrl, {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 10000,
}).then(() => {
    winston.info('Connect database successfully: ' + sampleMongoConnectionUrl);
    // console.log('Connect database successfully')
}, err => {
    winston.error('Connection failed.Error:' + err);
    // console.log('Connection failed. Error : ' + err)
})
mongoose.connection.on('reconnected', () => console.log('dbevent: reconnected'))

module.exports = mongoose;