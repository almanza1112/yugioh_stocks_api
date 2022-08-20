const cheerio = require('cheerio');
const fetch = require('node-fetch')

async function trollandtoad (searchWords){

    const url = "https://trollandtoad.com/category.php?selected-cat=4736&search-words=" + searchWords
    console.log(url)

    // get html from trollandtoad
    const response = await fetch(url)    
    .catch(err => {
        console.log('ERROR!!!: ' + err.message)
    })

    // using await to ensure promise resolves
    const body = await response.text()

    // parse html text
    const $ = cheerio.load(body)

}

module.exports = trollandtoad();
