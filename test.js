
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var response = httpGet("https://api-partners.soundcloud.com/trending");
var obj = JSON.parse(response);

musicgenres = obj.categories.music;

console.log(musicgenres);

var genre = musicgenres[0];
for (var i = 0; i < musicgenres.length; i++)
{
	if (musicgenres[i] == "techno")
		genre = musicgenres[i];
}

console.log("Getting "+genre);

response = httpGet("https://api-partners.soundcloud.com/explore/"+genre);
var responseOBJ = JSON.parse(response);

var collection = responseOBJ.collection;

console.log("Collection contains: ")
console.log(collection.length);

for (var i = 0; i < collection.length; i++) {
		//var thiscollection = JSON.parse(\\collection[k]);
        //console.log(thiscollection.title);
        console.log(collection[i].title);
        console.log(collection[i].permalink_url);
        }


// Twitter Setup
var Twit = require('twit')

var T = new Twit({
    consumer_key:         '2WURwbMZ5xGjyNwVgkmCrSwkh'
  , consumer_secret:      'sbYarTkjIBdUNNNeXMytMo67BQS0eZqvJnT307glEEysWd9mea'
  , access_token:         '2821119285-p9WrXqZrCqbAKL8aKdYSe3NMm18S1ULmRoFiYXf'
  , access_token_secret:  'qJ84ycqSkBKpxWpaSzcthlDPxYAo6YQ8sGtlP5bnh9USc'
})

// tweet the top track in the genre
  T.post('statuses/update', { status: collection[0].title + " " + collection[0].permalink_url }, function(err, data, response) {
    console.log(data)
  })


function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}