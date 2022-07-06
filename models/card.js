const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    card_id: {type: String, required: true},
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: String,
    race: String,
    level: String,
    rank: Number,
    scale: Number,
    linkval: Number,
    linkmarkers: {type: [String], default: undefined},
    attack: String,
    defense: String,
    attribute: String,
    archetype: String,
    card_sets:[{
        set_name: String,
        set_code: String,
        set_rarity: String}],
    card_images: {
        image_url: String,
        image_url_small: String },
    prices: {

    }
})

module.exports = mongoose.model('card', cardSchema)