const { response } = require('express');
const fetch = require('node-fetch');

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

async function getImages() {
  
    return fetch(pexelsUrl, {
        headers: {
            'Authorization': PEXELS_API_KEY
        }
    })
    .then((res) => res.json())
    .then((data) => {
        return(data.photos)
    })
    .catch((error) => {
        console.log(`Error: ${error}`)
        return(error.message)
    })
  };


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const imageUrls = await getImages();

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

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            'url':filteredUrls[randomUrlNr],
            'quote': quotes[randomQuoteNr]
        }
    };
}