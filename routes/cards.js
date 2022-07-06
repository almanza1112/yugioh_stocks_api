const express = require('express')
const card = require('../models/card')
const router = express.Router()
const Card = require('../models/card')
const fetch = require('node-fetch')
const EbayAuthToken = require('ebay-oauth-nodejs-client')


const ebayAuthToken = new EbayAuthToken({
    filePath: 'ebay-config-files.json'
})

//GET CARDS EBAY
router.get('/ebay', async (req, res) => {
    (async () => {
        const token = await ebayAuthToken.getApplicationToken('SANDBOX', 'https://api.ebay.com/oauth/api_scope');
        const parsedToken = JSON.parse(token)
        const url = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=drone&limit=3'
    
        const respizzle = await fetch(url ,{
            method: 'GET',
            headers:{
                'Authorization':'Bearer ' + parsedToken.access_token,
                'Content-Type':'application/json',
                'X-EBAY-C-MARKETPLACE-ID':'EBAY_US',
                'X-EBAY-C-ENDUSERCTX':'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>',
                'encoding': null
            }
            }).catch(err => {
                console.error({'FETCH MESSAGE': err.message})
            })

        const data  = await respizzle.json()
        console.log(data)
        
        res.send(data)
    })();   
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


//GET CARDS AMAZON
router.get('/ygo', async (req, res) => {

    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?id=50588353'

    const respizzle = await fetch(url, {
        method: 'GET'
    }).catch(err => {
        console.log({'Error message':err.message})
    })
    
    const respuesta = await respizzle.json()
    console.log(respuesta.data[0].id)
    
    const card = new Card({
        card_id: respuesta.data[0].id,
        name: respuesta.data[0].name,
        type: respuesta.data[0].type,
        description: respuesta.data[0].desc,
        race: respuesta.data[0].race,
        level: respuesta.data[0].level,
        rank: respuesta.data[0].rank,
        scale: respuesta.data[0].scale,
        linkval: respuesta.data[0].linkval,
        linkmarkers: respuesta.data[0].linkmarkers,
        card_sets: respuesta.data[0].card_sets
    })

    try {
        const newCard = await card.save()
    } catch (err){
        res.status(400).json({message: err.message})
    } 
    //for (let i = 0; i < data.data.length; i++) {}
    res.send("success")
})

module.exports = router