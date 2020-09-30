const config = {
  username: 'daily_wallpapers.png',
  password: 'teste123A',
  
   //If you want multiple/random texts, use <||> as a separator. Example:
   //first comment <||> second comment <||> third comment 
  //If you want a static text, just do not use <||> in the comment
  textToSpam: 'hello! made by @davipatricio.js <||> hi @davipatricio.js <||> beautiful <||>good',
  
  postId: 'CFrozhUjwuu', //PostID, the ID after slash. Like instagram.com/p/postId
  
  cooldown: 5000 //Time to post comments in milisseconds, more than 15 minutes is recommended.
  
}




//Module to interact with Instagram API.
const Instagram = require('instagram-web-api')

//Load config
let { username, password, textToSpam, postId, cooldown} = config;

//New Client
const client = new Instagram({ username, password })

//Login to Instagram with the credentials
client.login().then(() => { start(); });

//Define 0 for these vars
let media;
let mode;
//Get the comments mode. M means multple/random comments, s means a static comment.
if(textToSpam.includes('<||>')) {
     mode = 'm'
  textToSpam = textToSpam.split('<||>');
} else {
     mode = 's';
}

//Start the things.
async function start(){
  media = await client.getMediaByShortcode({ shortcode: postId })
  if(mode==='m') spam()
  if(mode==='s') single()
};

//Multiple/random comments
function spam(){
setInterval(()=>{
item = textToSpam[Math.floor(Math.random() * textToSpam.length)];
  console.log(`Posting comment: ${item}`)
client.addComment({ mediaId: media.id, text: item })
}, cooldown)
}

//Single/static comment
function single(){
setInterval(()=>{
client.addComment({ mediaId: media.id, text: textToSpam })
}, cooldown)
};

//License MIT 
//Available on GitHub: davipatricio/InstagramSpanmer
//Davi Patricio | 2020

//You aren't allowed to sell this.