const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    card_id: {type: String, required: true},
    name: { type: String, required: true },
    type: { type: String, required: false },
    description: { type: String, required: false },
    race: { type: String, required: false },
    archetype: { type: String, required: false },
    card_sets:{
        set_name: { type: String, required: true },
        set_code: { type: String, required: true },
        set_rarity: { type: String, required: true } },
    card_images: {
        image_url: { type: String, required: false },
        image_url_small: {type: String, required: false }
    }
})

module.export = mongoose.model('card', cardSchema)