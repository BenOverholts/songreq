/*
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = 'c617b042d42f44a69afdf01bd9dfdcf7'; // Your client id
var client_secret = '724b41ad51c04cf4bea032d3918911fa'; // Your client secret
var redirect_uri = 'http://partify.me/callback'; // Your redirect uri
var api_root = 'https://api.spotify.com/v1/';

//TODO Use some actual persistant storage
var partyRequests = {};
var partyPlids = {};
var uid;

var spotifyApi = new SpotifyWebApi({
  clientId : client_id,
  clientSecret : client_secret,
  redirectUri : redirect_uri
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/create', function(req, res) {
    console.log("Handling /create");

    // Create new party
    var access_token = req.param('access_token');
    var uid = req.param('uid');
    partyRequests[uid] = [];
    var datetime = new Date();


    // Create Playlist
    spotifyApi.setAccessToken(access_token);

    spotifyApi.createPlaylist(uid, 'Partify (' + datetime + ')', { 'public': true })
        .then(function(data) {
            console.log('Success!');
            console.log(data.body.id);
            partyPlids[uid] = data.body.id;
        }, function(err) {
            console.log("Fuck... ", err);
        });

    res.send( {'success': true} );
});

app.get('/api/requests', function(req, res) {
    console.log('Handling /requests');
    // Show all pending requests
    var uid = req.param('uid');
    if (!partyRequests[uid]) {
        partyRequests[uid] = [];
    }
    res.send( partyRequests[uid] );
});

/*{
    "122879": [
    { "uri": "asdf ", "name": "lakjsdfls", "artist": "alkbj"},
    { "" },
    ],
    ...

] */
// /api/dismiss?party="pid"&uri="spotify:1231adfasdf24332"
app.get('/api/dismiss', function(req, res) {
    console.log('Handling /dismiss');
    var uri = req.param('uri');
    var uid = req.param('uid');
    var party = partyRequests[uid];
    var remove = -1;
    for (var i in party) {
        if (party[i]['uri'] == uri) {
            remove = i;
        }
    }
    if (remove >= 0) {
        partyRequests['uid'] = party.splice(remove, 1);
    }
    res.send({'success': true});
});

app.get('/api/approve', function(req, res) {
    // DJ Adds song to playlist
    var uri = req.param('uri');
    var uid = req.param('uid');
    var access_token = req.param("access_token");

    // Add to playlist
    spotifyApi.setAccessToken(access_token);

    spotifyApi.addTracksToPlaylist(uid, partyPlids[uid], [uri])
      .then(function(data) {
        console.log('Added tracks to playlist!');
      }, function(err) {
        console.log('Something went wrong!', err);
      });

    var party = partyRequests[uid];
    var remove = -1;
    for (var i in party) {
        if (party[i]['uri'] == uri) {
            remove = i;
        }
    }
    if (remove >= 0) {
        partyRequests['uid'] = party.splice(remove, 1);
    }
    res.send({'success': true});
});

app.get('/api/request', function(req, res) {
    console.log('Handling /request');
    // Add user submitted request to requests list
    var uri = req.param('uri');
    var uid = req.param('uid');
    var song_name = req.param('song_name');
    var artist = req.param('artist');

    partyRequests[uid].push({
        "uri": uri,
        "name": song_name,
        "artist": artist
    });

    //console.log(partyRequests);
    //console.log(partyRequests[uid]);
    res.send( {'success': true} );
});

app.get('/api/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'playlist-modify-public playlist-modify-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                res.cookie('access_token', access_token);
                res.cookie('refresh_token', refresh_token);
                res.cookie('uid', body.id);
                res.redirect('/login?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token,
                        uid: body.id,
                        session: (partyRequests[body.id] != undefined)
                }));
            } else {
                console.log(error);
            }
        });


            // we can also pass the token to the browser to make requests from there
            //res.cookie('access_token', access_token);
            //res.cookie('refresh_token', refresh_token);
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/api/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8080');
app.listen(8080);
