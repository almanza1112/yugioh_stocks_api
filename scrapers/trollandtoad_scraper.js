const cheerio = require('cheerio');
const fetch = require('node-fetch')

async function trollandtoad (searchWords){

    const url = "https://trollandtoad.com/category.php?selected-cat=4736&search-words=" + searchWords

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
    $('.col-2', body).each(function(){
        const cardText = $(this).text()
        console.log(cardText)
        cards.push({cardText})
    })

    return cards
}

module.exports = {trollandtoad};
