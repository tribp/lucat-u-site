/**
 * File: intro.js
 * Data: 05/04/2022
 * Description: Star Wars Movie Intro Logic.
 * Author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 * Author: Peter Tribout <github:tribp> - added quote feature 
 */
 
 let width = window.innerWidth;
 let height = window.innerHeight;
 
 let intro = document.getElementsByClassName('intro')[0];
 let story = document.getElementsByClassName('story')[0];
 let paragraphs = document.getElementsByClassName('paragraphs')[0];
 let sound = document.getElementById('sound');
 let starwarsImage = document.getElementById('starwarsImage');
 let starwarsQuote = document.getElementById('quote');

 intro.style.fontSize = width / 30 + 'px';
 story.style.fontSize = width / 20 + 'px';
 paragraphs.style.height = height + 'px';
 
 window.addEventListener('resize', () => {
   width = canvas.width = window.innerWidth;
   height = canvas.height = window.innerHeight;
   intro.style.fontSize = width / 30 + 'px';
   story.style.fontSize = width / 20 + 'px';
   paragraphs.style.height = height + 'px';
 });

 function start() {
    intro.className = 'intro intro_text animation_intro';
    story.className = 'story story_text animation_story';
    sound.play(); 
 }

 /* Background with Stars */

let canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

const num = 100;
const size = 2;
const elements = [];

function starts() {
  for (let i = 0; i < num; i++) {
    elements[i] = {
      x: Math.ceil(Math.random() * width),
      y: Math.ceil(Math.random() * height),
      size: Math.random() * size,
    };
  }
}

function snow() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < num; i++) {
    const e = elements[i];
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.arc(e.x, e.y, e.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

starts();
snow();

function removeAnimationClass(){
  starwarsImage.className = '';
  starwarsQuote.className = '';
}

async function getQuote(){
  starwarsImage.className = 'animation_quote';
  starwarsQuote.className = 'animation_quote';
  
  // send get request to api of your Azure SWA
  const { url,quote } = await(await fetch(`../api/quote?format=large`)).json();

  //fill image +quote
  document.querySelector('#starwarsImage').src = url;
  document.querySelector('#quote').textContent = quote;

  //set timer to clear the animation class
  let timeoutID  = setTimeout(removeAnimationClass,7000);

}