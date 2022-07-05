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


//GET CARDS AMAZON
router.get('/ygo', async (req, res) => {

    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'

    const respizzle = await fetch(url, {
        method: 'GET'
    }).catch(err => {
        console.log({'Error message':err.message})
    })
    
    const data = await respizzle.json()
    
    res.send(data)
})

module.exports = router