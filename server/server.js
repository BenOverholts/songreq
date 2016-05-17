/*
 * This is the api server for Songreq.me
 *
 * For more information, see
 * https://github.com/BenOverholts/songreq
 */

var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = process.env.SRQ_CLIENT_ID;
var client_secret = process.env.SRQ_CLIENT_SECRET;
var scopes = ['playlist-modify-public', 'playlist-modify-private']
var server_base_uri = 'http://localhost:8080/';
var app_base_uri = 'http://localhost:3000/';
//var server_base_uri = 'http://songreq.me/';
//var app_base_uri = server_base_uri;
var redirect_uri = app_base_uri + 'login';
var callback_uri = server_base_uri + 'api/callback';
var api_root = 'https://api.spotify.com/v1/';

mongoose.connect('mongodb://localhost/songreq');



/********************************************
 *
 * DB Schema Setup
 *
 ********************************************/
var partySchema = new mongoose.Schema({
  uid: String,
  plid: String,
  songs: [{
    uri: String,
    name: String,
    artist: String,
    artUrl: String
  }]
});

// Add a song to a party's requests
partySchema.methods.addSong = function(uri, name, artist, artUrl, callback) {
  this.songs.push({
    uri: uri,
    name: name,
    artist: artist,
    artUrl: artUrl
  });
  this.save(function(err, party) {
    if (callback) callback(err, party);
  });
};

// Remove song from a party's requests
partySchema.methods.removeSong = function(uri, callback) {
  var index = this.songs.map(function(s) { return s.uri; }).indexOf(uri);
  this.songs.splice(index, 1);
  this.save(function(err, party) {
    if (callback) callback(err, party);
  });
};

// Finalize schema model
var Party = mongoose.model('Party', partySchema);



/********************************************
 *
 * Spotify API Wrapper Setup
 *
 * Need a new instance within each route handler so that
 * user credentials are properly segregated
 *
 ********************************************/
var getSpotifyApi = function() {
  return new SpotifyWebApi({
    clientId : client_id,
    clientSecret : client_secret,
    redirectUri : callback_uri
  });
};

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

/********************************************
 *
 * Express / Route Handlers
 *
 ********************************************/
var app = express();
app.use(cookieParser());

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

// Create a new playlist and set up a party
app.get('/api/create', function(req, res) {
  console.log('[/create] Begin handling');

  var spotifyApi = getSpotifyApi();
  var access_token = req.cookies.access_token;
  var uid = req.cookies.uid;
  var datetime = new Date();

  spotifyApi.setAccessToken(access_token);

  // Check if party already exists
  Party.findOne({ uid: uid }, function(err, party) {
    if (err) {
      console.log('[/create] Error checking for party' + party.uid);
      res.status(500).send('Error creating party');
    }

    if (party) {

      console.log('[/create] Warning: Party ' + party.uid
        + ' already exists');
      res.sendStatus(200); // TODO is this ideal behavior?

    } else {

      // Create playlist
      spotifyApi.createPlaylist(uid, 'Partify (' + datetime + ')',
        { 'public': true })
      .then(function(data) {
        console.log('[/create] Successfully created playlist ' + data.body.id);

          // Create party
          var party = Party({
            uid: uid,
            plid: data.body.id,
            songs: []
          });

          // Persist party
          party.save(function(err, party) {
            if (err) {
              console.log('[/create] Error saving party' + party.uid);
              res.status(500).send('Error creating party');
            }

            console.log('[/create] Instantiated party ' + party.uid);
            console.log('[/create] Complete')
            res.sendStatus(200);
          });

        }, function(err) {
          console.log('[/create] Error interacting with Spotify...', err);
          res.status(500).send('Error interacting with Spotify');
        });
    }
  })
});

// End a party :(
app.get('/api/destroy', function(req, res) {
  console.log('[/destroy] Begin handling');
  var uid = req.cookies.uid; // TODO Enforce authenticity of this cookie

  Party.remove({ uid: uid }, function(err, party) {
    if (err) {
      console.log('[/destroy] Error destroying party ' + uid);
      res.status(400).send('Error destroying party ' + uid);
    }

    console.log('[/destroy] Successfully destroyed party ' + uid);
    console.log('[/destroy] Complete');
    res.sendStatus(200);
  });
});

// Check if a party exists, and TODO return details about it
app.get('/api/status', function(req, res) {
  console.log('[/status] Begin handling');
  var uid = req.cookies.uid; // TODO Enforce authenticity of this cookie

  // Fetch party from storage
  Party.findOne({ uid: uid }, function(err, party) {
    if (err) {
      console.log('[/status] Error finding party ' + uid);
      res.status(400).send('Error finding party ' + uid);
    }
    if (!party) {
      console.log('[/status] Party ' + uid + ' does not exist');
      res.send({ party: false });
    } else {
      console.log('[/status] Party ' + uid + ' found');

      // TODO send details about party
      res.send({ party: true });
    }
  });
});

// Get the list of song requests for a party
app.get('/api/requests', function(req, res) {
    console.log('[/requests] Begin handling');
    var uid = req.param('uid');

    // Fetch party from storage
    Party.findOne({ uid: uid }, function(err, party) {
      if (err || !party) {
        console.log('[/requests] Error finding party ' + uid);
        res.status(400).send('Error finding party ' + uid);
      }

      // Respond with the song requests
      console.log('[/requests] Complete');
      res.send( party.songs );
    });
});

// Remove a song request from the request queue for a party
app.get('/api/dismiss', function(req, res) {
  console.log('[/dismiss] Begin handling');
  var uri = req.param('uri');
  var uid = req.cookies.uid;

  // Fetch party from storage
  Party.findOne({ uid: req.cookies.uid }, function(err, party) {
    if (err || !party) {
      console.log('[/dismiss] Error finding party ' + uid);
      res.status(400).send('Error finding party ' + uid);
    }

    // Remove song
    party.removeSong(uri, function(err, party) {
      if (err) {
        console.log('[/dismiss] Error removing song ' + uri +
          ' from party ' + party.uid);
        res.status(500).send('Error removing song ' + uri);
      }

      console.log('[/dismiss] Successfully removed song ' + uri +
        ' from party ' + party.uid);
      console.log('[/dismiss] Complete');
      res.sendStatus(200);
    });
  });
});

// Add a requested song to the party playlist
app.get('/api/approve', function(req, res) {
  console.log('[/approve] Begin handling');

  // DJ Adds song to playlist
  var spotifyApi = getSpotifyApi();
  var uri = req.param('uri');
  var uid = req.cookies.uid;
  var access_token = req.cookies.access_token;

  // Fetch party from storage
  Party.findOne({ uid: uid }, function(err, party) {
    if (err || party === null) {
      console.log('[/approve] Error finding party ' + uid);
      res.status(400).send('Error finding party ' + uid);
    }

    spotifyApi.setAccessToken(access_token);

    // Add to playlist
    spotifyApi.addTracksToPlaylist(uid, party.plid, [uri])
      .then(function(data) {
        console.log('[/approve] Succesfully added song' + uri + 
          ' to playlist ' + party.plid);
        party.removeSong(uri, function(err, party) {
          if (err) {
            console.log('[/approve] Error adding song ' + uri +
              ' to party ' + party.uid);
          }

          console.log('[/approve] Successfully added song ' + uri +
            ' to party ' + party.uid);
          console.log('[/approve] Complete');
          res.sendStatus(200);
        });
      }, function(err) {
        console.log('[/approve] Error interacting with Spotify...', err);
        res.status(500).send('Error interacting with Spotify');
      });
  });
});

// Add a song request to a party
app.get('/api/request', function(req, res) {
    console.log('[/request] Begin handling');

    // Add user submitted request to requests list
    var uri = req.param('uri');
    var uid = req.param('uid');
    var name = req.param('song_name');
    var artist = req.param('artist');
    var artUrl = 'http://placehold.it/350x350'; // TODO Pass url from Angular

    Party.findOne({ uid: req.param('uid') }, function(err, party) {
      if (err || !party) {
        console.log('[/request] Error finding party ' + uid);
        res.status(400).send('Error finding party ' + uid);
      }

      console.log(party);

      party.addSong(uri, name, artist, artUrl, function(err, party) {
        if (err) {
          console.log('[/request] Error requesting song ' + uri +
            ' for party ' + party.uid);
          res.status(500).send('Error requestinb song ' + uri);
        }

        console.log('[/request] Successfully requested song ' + uri +
          ' for party ' + party.uid);
        console.log('[/request] Complete');
        res.sendStatus(200);
      });
    });
});

// Initiate Spotify login flow
app.get('/api/login', function(req, res) {
  console.log('[/login] Redirected user to Spotify Authorization');

  var spotifyApi = getSpotifyApi();
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Direct user to Spotify authorization
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

// Retrieve access token with auth code granted by user
app.get('/api/callback', function(req, res) {
  console.log('[/callback] Begin handling');

  var spotifyApi = getSpotifyApi();
  var code = req.param('code') || null;

  if (code === null) {
    console.log('[/callback] Error reading authorization code');
    res.status(400).send('Error reading authorization code');
  } else {
    spotifyApi.authorizationCodeGrant(code)
      .then(function(data) {

        console.log('[/callback] Successfully retrieved access token');
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);

        res.cookie('expiry_time', (Date.now() / 1000 | 0) 
          + parseInt(data.body['expires_in']));
        console.log('expiry time: ', data.body['expires_in']);
        console.log('server time: ', (Date.now() / 1000 | 0));
        res.cookie('server_time', (Date.now() / 1000 | 0));

        // Fetch the user's spotify UID
        spotifyApi.getMe()
          .then(function(data) {
            console.log('[/callback] Successfully retrieved UID ' + data.body.id);

            // Set cookies and redirect them back to the client
            // TODO {secure: true} once HTTPS
            res.cookie('access_token', spotifyApi.getAccessToken());
            res.cookie('refresh_token', spotifyApi.getRefreshToken());
            res.cookie('uid', data.body.id);

            console.log('[/callback] Complete');
            res.redirect(redirect_uri);
          }, function(err) {
            console.log('[/callback] Error retrieving UID', err);
            res.status(500).send('Error retrieving UID');
          });
      }, function(err) {
        console.log('[/callback] Error retrieving authorization token');
        res.status(500).send('Error retrieving authorization token');
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
