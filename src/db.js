var mongoose = require('mongoose');
var dotenv = require('dotenv').config();

var uri = `mongodb://localhost/${process.env.MONGO_DB || 'unoesc'}`;
console.log(uri);
if (process.env.MONGO_ATLAS_USE) {
    uri = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@${process.env.MONGO_ATLAS_CLUSTER}.mongodb.net/${process.env.MONGO_DB}`;
}

// Mongoose recommended options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const db = mongoose.connect(uri, options, err => {
    if (err) {
        console.error('MongoDB Connection: ', err);
    } else {
        console.info(`MongoDB Connection: Success, connected to ${uri}`);
    }
});

module.exports = db;