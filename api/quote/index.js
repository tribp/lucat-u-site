// testing: hhtps://www.boredapi.com/api/activity
// testing: https://httpstat.us/500

const fetch = require('node-fetch');

const pexelsUrl = 'https://api.pexels.com/v1/search?query=starwars';

// In Azure Static Web App (Portal) -configuration add 'PEXELS_API_KEY
//const PEXELS_API_KEY=process.env["PEXELS_API_KEY"]

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

testPhotos=[ {
    "src": {
        "large2x": "https://images.pexels.com/photos/14561255/pexels-photo-14561255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/14561255/pexels-photo-14561255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    }},
    { 
    "src": {
        "large2x": "https://images.pexels.com/photos/12156677/pexels-photo-12156677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/12156677/pexels-photo-12156677.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    }}
]
testMsg = {
    "url": "https://images.pexels.com/photos/14561255/pexels-photo-14561255.jpeg?auto=compress&cs=tinysrgb&h=130",
    "quote": " “Nazaré, a gift from Mars.” – Kelly Slater"
    }

function getImages(api_key) {
  
    return fetch(pexelsUrl, {
        headers: {
            'Authorization': api_key
        }
    })
    .then((res) => res.json())
    .then((data) => {
        return(data.photos)
    })
    .catch((error) => {
        console.log(`Error: ${error}`)
        //return(error.message)
        return testPhotos
    })
  };


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // In Azure Static Web App (Portal) -configuration add 'PEXELS_API_KEY
    //const PEXELS_API_KEY=process.env["PEXELS_API_KEY"]
    //context.log("PEXELS_API_KEY: " + process.env["PEXELS_API_KEY"]);

    // we get a photos array with for each photo a "src" dict with key=format value = url
    //const imageUrls = await getImages(PEXELS_API_KEY);

    //determine format by get quary param -default: 'large'
    if (['tiny','landscape','portrait','small','medium','large','large2x','original'].includes(req.query.format)){
        picFormat = req.query.format
    }
    else {picFormat = 'large'}

    //get list or pictures with the selected format
    //filteredUrls = imageUrls.map(photo => photo['src'][picFormat])

    // Choose random nr pic and quote
    //randomUrlNr = Math.floor(Math.random()*imageUrls.length) 
    //randomQuoteNr = Math.floor(Math.random()*quotes.length) 


    context.res = {
        // status: 200, /* Defaults to 200 */
        //body: {
        //    'url':filteredUrls[randomUrlNr],
        //    'quote': quotes[randomQuoteNr]
        //}
        body : testMsg
    };
}