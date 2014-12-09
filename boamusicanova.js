
// Twitter Setup
var Twit = require('twit')

var T = new Twit({
    consumer_key:         'I9ZokVZaCNS9W03C802TDkK7W'
  , consumer_secret:      'ZPP7qOumwTjmF1DZwczY3cJy09uVIR4xIz3aX2jMhZ82KzZCm9'  
  , access_token:         '2912527366-JzCAMfAxCFSrNZrY03wj2GYcxJm4tLfJH4D8RKf'
  , access_token_secret:  'y2ltyacHHSInG7RaWLp9TTX8zTV2BwJGRtn8SV7LuF1Yt'
})

// Pull list of genres from trending endpoint
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var response = httpGet("https://api-partners.soundcloud.com/trending");
var obj = JSON.parse(response);
var musicgenres = obj.categories.music;

// select a random genre
console.log ("Fetched a list of "+musicgenres.length+" genres");

var data = "dummy data"

var response = null;
 
function tweetRandomTrackfromRandomGenre(responseCode)
{
  var genre =  musicgenres[Math.floor((Math.random() * musicgenres.length))];
  console.log("Getting genre "+genre);
  response = httpGet("https://api-partners.soundcloud.com/explore/"+genre);
  var responseOBJ = JSON.parse(response);
  var tracks = responseOBJ.collection;
  var index =  Math.floor((Math.random() * tracks.length));

  //console.log ("Getting track "+index+" from genre "+genre)
  console.log ("Attempting to post "+ tracks[index].title +" to Twitter account");
    T.post('statuses/update', { status: "Apreciar "+genre+ "! " + tracks[index].title + " " + tracks[index].permalink_url +"?ref=HST" }, function(err, data, response) 
    {
      if (data == null)
        console.log ("Twitter doesn't like this");
      else
        console.log ("Tweeted like a Pro");
    })
  }

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


// The infinite loop...
setInterval(tweetRandomTrackfromRandomGenre, 80000, response);  // post a new track every 15min

// Todo: fix category names to make them look nice e.g. drumbass -> Drum & Bass
// Todo: avoid duplicates
// Todo: Mix up the messages... have a list of several
// Todo: More KEWL STUFF







