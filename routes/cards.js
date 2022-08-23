const express = require('express')
const card = require('../models/card')
const router = express.Router()
const Card = require('../models/card')
const fetch = require('node-fetch')

const scrapers = require('../grabbers/scrapers')
const ebay = require('../grabbers/ebay')



router.get('/', (req, res) => {
    const tntRes = scrapers.trollandtoad('mp21-en135', 'Near Mint', '1st Edition')
    const ebayRes = ebay.ebay('mp21-en135', '1st', 'Near Mint')
    const amazonRes = scrapers.amazon('mp21-en135', 'Near Mint', '1st Edition')

    const promises =[tntRes, ebayRes, amazonRes]
    Promise.all(promises).then(responses => {

        // merge arrays into one for sorting
        const listings = [...responses[0], ...responses[1], ...responses[2]]

        // sort array
        listings.sort((a,b) => parseFloat(a.cardPrice) - parseFloat(b.cardPrice))

        res.send(listings)
    
    })

})


router.post('/create', async (req, res) => {

    const card = new Card({
        card_id: req.body.card_id,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        linkmarkers: req.body.linkmarkers,
        card_sets: {
            set_name: req.body.card_sets.set_name,
            set_code: req.body.card_sets.set_code,
            set_rarity: req.body.card_sets.set_rarity
        }
    })

    try {
        const newCard = await card.save()
        res.status(201).json(newCard)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})


//POPULATE DB
router.get('/ygopopulate', async (req, res) => {

    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?'

    const respizzle = await fetch(url, {
        method: 'GET'
    }).catch(err => {
        console.log({'Error message':err.message})
    })
    
    const respuesta = await respizzle.json()
 
    for (let i = 0; i < respuesta.data.length; i++) {

   
        const card = new Card({
            card_id: respuesta.data[i].id,
            name: respuesta.data[i].name,
            type: respuesta.data[i].type,
            description: respuesta.data[i].desc,
            race: respuesta.data[i].race,
            level: respuesta.data[i].level,
            rank: respuesta.data[i].rank,
            scale: respuesta.data[i].scale,
            linkval: respuesta.data[i].linkval,
            linkmarkers: respuesta.data[i].linkmarkers,
            card_sets: respuesta.data[i].card_sets,
            attack: respuesta.data[i].atk,
            defense: respuesta.data[i].def,
            attribute: respuesta.data[i].attribute,
            archetype: respuesta.data[i].archetype,
            banlist_info: respuesta.data[i].banlist_info
        })
    
        try {
            const newCard = await card.save()
        } catch (err){
            res.status(400).json({message: err.message})
        } 
    }
    res.send("success")
})

module.exports = router