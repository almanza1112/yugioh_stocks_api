const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    isSubscribed:{
        type: String,
        required: true
    },
    subscribeDate:{
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)