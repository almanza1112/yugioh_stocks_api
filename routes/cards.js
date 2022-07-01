const express = require('express')
const card = require('../models/card')
const router = express.Router()
const Card = require('../models/card')
const fetch = require('node-fetch')
const EbayAuthToken = require('ebay-oauth-nodejs-client')
const zlib = require('zlib');



const ebayAuthToken = new EbayAuthToken({
    filePath: 'ebay-config-files.json'
})
//GET CARDS
router.get('/', async (req, res) => {
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
            })
            /*
            .then(res => {
                if (res.ok){
                              
                } else {
                    console.log("i suck: " + res.status)
                }
            })
            .catch(err => {
                console.error({'FETCH MESSAGE': err.message})
            })*/

        const data  = await respizzle.json()
        console.log(data)
        
        res.send(respizzle)
    })();   
})

module.exports = router