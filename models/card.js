const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    set:{
        type: String,
        required: true
    },
    rarity:{
        type: String, 
        required: true
    }
})

module.export = mongoose.model('card', cardSchema)