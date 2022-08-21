const cheerio = require('cheerio');
const fetch = require('node-fetch')

async function trollandtoad(setCode, condition, edition) {

    const url = "https://trollandtoad.com/category.php?selected-cat=4736&search-words=" + setCode

    // get html from trollandtoad
    const response = await fetch(url)
        .catch(err => {
            console.log('ERROR!!!: ' + err.message)
        })

    // using await to ensure promise resolves
    const body = await response.text()

    // parse html text
    const cards = []
    const $ = cheerio.load(body, null, false) //false to disable introducing <html>, <head>, and <body> elements
    const buyingContainer = $('buying-options-container').html()
    $('.position-relative', buyingContainer).each(function () {
        const cardInfo = $(this).text()
        if(cardInfo.includes(condition) && cardInfo.includes(edition)){
            cards.push({ cardInfo })
        }
    })

    return cards
}


async function amazon(setCode, condition, edition) {

    const url = "https://www.amazon.com/s?k=" + setCode

    // get html from trollandtoad
    const response = await fetch(url)
        .catch(err => {
            console.log('ERROR!!!: ' + err.message)
        })

    // using await to ensure promise resolves
    const body = await response.text()

    // parse html text
    const cards = []
    const $ = cheerio.load(body, null, false) //false to disable introducing <html>, <head>, and <body> elements

    // find all instances of data-component-type that equals s-search-results
    $('div[data-component-type="s-search-result"]', body).each((index, element) => {
        const cardInfo = $(element).find('h2').text()
        if (cardInfo.includes(setCode.toUpperCase())) { //setCode has to be uppercase
            cards.push({ cardInfo })
        }
    })

    return cards
}




module.exports = { trollandtoad, amazon };
