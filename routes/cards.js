const express = require('express')
const card = require('../models/card')
const router = express.Router()
const Card = require('../models/card')
const fetch = require('node-fetch')
const EbayAuthToken = require('ebay-oauth-nodejs-client')


const ebayAuthToken = new EbayAuthToken({
    filePath: 'ebay-config-files.json'
})
//GET CARDS
router.get('/', async (req, res) => {
    (async () => {
        
        const token = await ebayAuthToken.getApplicationToken('SANDBOX');
        console.log(token);
    })();
    
    /*

    
const authorizationUrl = "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
    const encodedClientID = Buffer.from('BryantAl-San-SBX-96f5a01d1-2d5d1702')
    const encodedClientSecret = Buffer.from('SBX-6f5a01d150b5-c40f-4a60-9e4e-612c')
    const encodedCredentials = Buffer.from('BryantAl-San-SBX-96f5a01d1-2d5d1702:SBX-6f5a01d150b5-c40f-4a60-9e4e-612c')
    const authBody={
        'grant_type':'client_credentials',
        'scope':encodeURIComponent('https://api.ebay.com/oauth/api_scope')}

    console.log(encodedCredentials.toString('base64'))
    const authorizationResponse = await fetch(authorizationUrl, {
        method: 'post',
        body: JSON.stringify(authBody),
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Basic ' + encodedCredentials.toString('base64')
        }
    })
        .then(res => {
            console.log(res.status)
        })
        .catch(err => {
            console.error({'message':err.message})
        })

*/
     
    /**
      const url = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=drone&limit=3'
    
     const response = await fetch(url ,{
        method: 'post',
        headers:{
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
            'X-EBAY-C-ENDUSERCTX':'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>'
        }
     })
        .then(res => {
            if (res.ok){
                console.log('success')
            } else {
                console.log("i suck")
            }
        })
        .catch(err => {
            console.error({'message': err.message})
        })
    
    res.json(response)
      
      
     
     */
      
     
      
    
    
   
})

module.exports = router