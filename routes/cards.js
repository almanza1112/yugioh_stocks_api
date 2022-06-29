const express = require('express')
const card = require('../models/card')
const router = express.Router()
const Card = require('../models/card')
const fetch = require('node-fetch')
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const ebayCredentials = require('../ebay-config-files.json')

const token = "v^1.1#i^1#r^0#f^0#I^3#p^3#t^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";


//GET CARDS
router.get('/', async (req, res) => {
    const authorizationUrl = "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
    const encodedClientID = Buffer.from('BryantAl-San-SBX-96f5a01d1-2d5d1702')
    const encodedClientSecret = Buffer.from('SBX-6f5a01d150b5-c40f-4a60-9e4e-612c')
    const authBody={
        'grant_type':'client_credentials',
        'scope':encodeURIComponent('https://api.ebay.com/oauth/api_scope')}

    
    const authorizationResponse = await fetch(authorizationUrl, {
        method: 'post',
        body: JSON.stringify(authBody),
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Basic ' + encodedClientID.toString('base64') +':'+encodedClientSecret.toString('base64')
        }
    })
        .then(res => {
            console.log(res.status)
        })
        .catch(err => {
            console.error({'message':err.message})
        })


    /**
      const url = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=drone&limit=3'
    const options = {
        'method': 'GET',
        "headers": {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
            'X-EBAY-C-ENDUSERCTX':'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>'
        }
    };
    
     const response = await fetch(url ,options)
        .then(res => {
            console.log(res)
            if (res.ok){
                console.log('success')
            } else {
                console.log(res.status)
            }
        })
        .catch(err => {
            console.error({'message': err.message})
        })
    
    res.json(response)
     
      
     */
    
    
   
})

module.exports = router