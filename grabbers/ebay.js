const EbayAuthToken = require('ebay-oauth-nodejs-client')
const fetch = require('node-fetch')


const ebayAuthToken = new EbayAuthToken({
    filePath: 'ebay-config-files.json'
})

async function ebay (setCode, edition, condition) {
    const token = await ebayAuthToken.getApplicationToken('PRODUCTION', 'https://api.ebay.com/oauth/api_scope');
    const parsedToken = JSON.parse(token)
    const url = 'https://api.ebay.com/buy/browse/v1/item_summary/search?q='+ setCode + '&limit=5'

    const respizzle = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + parsedToken.access_token,
            'Content-Type': 'application/json',
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
            'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>'
        }
    }).catch(err => {
        console.error({ 'FETCH MESSAGE': err.message })
    })

    const data = await respizzle.json()

    return data
}  

module.exports = {ebay}