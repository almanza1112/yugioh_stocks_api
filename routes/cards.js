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