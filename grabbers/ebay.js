const EbayAuthToken = require('ebay-oauth-nodejs-client')
const fetch = require('node-fetch')


const ebayAuthToken = new EbayAuthToken({
    filePath: 'ebay-config-files.json'
})

async function ebay (setCode, edition, condition) {
    const from = "EBAY"
    const token = await ebayAuthToken.getApplicationToken('PRODUCTION', 'https://api.ebay.com/oauth/api_scope');
    const parsedToken = JSON.parse(token)
    const limit = 6;
    const url = 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=' + setCode + "+"+ edition+'&limit=' + limit + "&sort=price&filter=buyingOptions%3A%7BFIXED_PRICE%7D"

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

    const cards = []

    data.itemSummaries.forEach(element => {
        const cardPriceBeforeShipping = element.price.value
        const cardUrl = element.itemAffiliateWebUrl
        let cardShippingCost = 0;
        let cardPrice = 0;
        console.log(element)
        // For some reason listings will return undefined shippingOptions, if statement filters them out
        if (element.shippingOptions != undefined) {
            cardShippingCost = element.shippingOptions[0].shippingCost.value
            const cardPriceUnfixed = Number(cardPriceBeforeShipping) + Number(cardShippingCost) // Number() is used to avoid concatenation
            cardPrice = cardPriceUnfixed.toFixed(2)// toFixed() is used to round the decimals the float values give
            cards.push({ from, cardPrice, cardUrl })
        }
    })

    return cards
}  

module.exports = {ebay}