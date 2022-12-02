// testing: hhtps://www.boredapi.com/api/activity
// testing: https://httpstat.us/500
// testing: htpps://reqres.in/api

const axios = require('axios')

const pexelsUrl = 'https://api.pexels.com/v1/search?query=starwars';

// In Azure Static Web App (Portal) -configuration add 'PEXELS_API_KEY
const PEXELS_API_KEY=process.env["PEXELS_API_KEY"]

const quotes = [
  '"It\'s not my fault" - Han Solo',
  '"Your focus determines your reality.” – Qui-Gon Jinn',
  ' “Do. Or do not. There is no try.” – Yoda',
  ' “Somebody has to save our skins.” – Leia Organa',
  '“In my experience there is no such thing as luck.” – Obi-Wan Kenobi',
  '“I find your lack of faith disturbing.” – Darth Vader',
  ' “I’ve got a bad feeling about this.” – basically everyone',
  ' “It’s a trap!” – Admiral Ackbar',
  '“So this is how liberty dies…with thunderous applause.” – Padmé Amidala',
  ' “Never tell me the odds.” – Han Solo',
  ' “Mind tricks don’t work on me.” – Watto',
  '“Great, kid. Don’t get cocky.” – Han Solo',
  '“Stay on target.” – Gold Five',
  ' “This is a new day, a new beginning.” – Ahsoka Tano',
  ' “Nazaré, a gift from Mars.” – Kelly Slater',
  ' “Smells like a fresh saulty ocean.” – Poseidon',
  ' “Make my day in Zarautz, a new beginning.” – BoardX',
  ' “Jaws is not a shark, but a wave.” – Maui Master',
];

async function getImages(api_key) {
    const url = pexelsUrl,
    config = {
        responseType: 'json',
        headers:{
            'Content-Type':'application/json',
            'Authorization': api_key,
        },
    }
    
    try {
        const msg = await axios.get(url,config)
        
        return msg.data.photos
    } catch (err) {
        console.log(`ERROR: ${err}`)
    }
       
}
  

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        // we get a photos array with for each photo a "src" dict with key=format value = url
        const imageUrls = await getImages(PEXELS_API_KEY);

        //determine format by get quary param -default: 'large'
        if (['tiny','landscape','portrait','small','medium','large','large2x','original'].includes(req.query.format)){
            picFormat = req.query.format
        }
        else {picFormat = 'large'}

        //get list or pictures with the selected format
        filteredUrls = imageUrls.map(photo => photo['src'][picFormat])

        // Choose random nr pic and quote
        randomUrlNr = Math.floor(Math.random()*imageUrls.length) 
        randomQuoteNr = Math.floor(Math.random()*quotes.length) 

    } catch (err) {
        context.log.error('ERROR', err);
        // This rethrown exception will be handled by the Functions Runtime and will only fail the individual invocation
        throw err;
    }


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            'url':filteredUrls[randomUrlNr],
            'quote': quotes[randomQuoteNr]
        }
    };
}