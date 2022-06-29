const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: false
    },
    set:{
        type: String,
        required: false
    }
})

module.export = mongoose.model('card', cardSchema)