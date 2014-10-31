
// Twitter Setup
var Twit = require('twit')

var T = new Twit({
    consumer_key:         '2WURwbMZ5xGjyNwVgkmCrSwkh'
  , consumer_secret:      'sbYarTkjIBdUNNNeXMytMo67BQS0eZqvJnT307glEEysWd9mea'
  , access_token:         '2821119285-p9WrXqZrCqbAKL8aKdYSe3NMm18S1ULmRoFiYXf'
  , access_token_secret:  'qJ84ycqSkBKpxWpaSzcthlDPxYAo6YQ8sGtlP5bnh9USc'
})

// Pull list of genres from trending endpoint
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var response = httpGet("https://api-partners.soundcloud.com/trending");
var obj = JSON.parse(response);
var musicgenres = obj.categories.music;

// select a random genre
console.log ("Fetched a list of "+musicgenres.length+" genres");

var genre =  musicgenres[Math.floor((Math.random() * musicgenres.length))];
console.log("Getting genre "+genre);

response = httpGet("https://api-partners.soundcloud.com/explore/"+genre);
var responseOBJ = JSON.parse(response);
var tracks = responseOBJ.collection;
var index =  Math.floor((Math.random() * tracks.length));

console.log ("Getting track "+index+" from genre "+genre)

//index = 3;
console.log ("Attempting to post "+ tracks[index].title +" to Twitter account");
  T.post('statuses/update', { status: "Have some "+musicgenres[genre] + "! " + tracks[index].title + " " + tracks[index].permalink_url }, function(err, data, response) 
  {
    // log response to console
    // console.log(data)
    if (data == null)
      console.log ("Twitter doesn't like this");
    else
      console.log ("Tweeted like a Pro");
  })


function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}