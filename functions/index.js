
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const {OAuth2Client} = require('google-auth-library');
const {google} = require('googleapis');

const CONFIG_CLIENT_ID = '482093209743-cu7v81s6rpkkua64v43qpfjl89uev9a5.apps.googleusercontent.com';
const CONFIG_CLIENT_SECRET = '1P1wLuygdTXemAwnOv9ASihB';

// The OAuth Callback Redirect.
const FUNCTIONS_REDIRECT = `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/oauthcallback`;

// setup for authGoogleAPI
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
const functionsOauthClient = new OAuth2Client(CONFIG_CLIENT_ID, CONFIG_CLIENT_SECRET,
  FUNCTIONS_REDIRECT);

// OAuth token cached locally.
let oauthTokens = null;

// visit the URL for this Function to request tokens
exports.authgoogleapi = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
  res.redirect(functionsOauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  }));
});

// setup for OauthCallback
const DB_TOKEN_PATH = '/api_tokens';

// after you grant access, you will be redirected to the URL for this Function
// this Function stores the tokens to your Firebase database
exports.oauthcallback = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
  const code = req.query.code;
  try {
    functionsOauthClient.getToken(code).then(tokens => {
      admin.database().ref(DB_TOKEN_PATH).set({tokens}).then(() =>{
        return res.status(200).send('App successfully configured with new Credentials. '
        + 'You can now close this page.');
      }).catch(e => e);
      return;
    }).catch(e => e);
    // Now tokens contains an access_token and an optional refresh_token. Save them.
  } catch (error) {
    return res.status(400).send(error);
  }
});


// accepts an append request, returns a Promise to append it, enriching it with auth
function appendPromise(requestWithoutAuth) {
  return new Promise((resolve, reject) => {
    return getAuthorizedClient().then((client) => {
      const service = google.youtube('v3');
      const request = requestWithoutAuth;
      request.auth = client;
      return service.search.list(request, (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`);
          reject(err);
          return;
        }
        resolve(response.data);
        return;
      });
    });
  });
}

// checks if oauthTokens have been loaded into memory, and if not, retrieves them
function getAuthorizedClient() {
  if (oauthTokens) {
    return functionsOauthClient;
  }

  admin.database().ref(DB_TOKEN_PATH).once('value').then(snapshot => {
    oauthTokens = snapshot.val();
    functionsOauthClient.setCredentials(oauthTokens);
    return functionsOauthClient;
  }).catch(e => e);
}

exports.youtubeRelated = functions.https.onRequest((req, res) => {
  res.header('Content-Type','application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let obj = {}

  if (req.query.id) {
    obj = {
      'part': 'snippet',
      'relatedToVideoId': req.query.id,
      'type': 'video',
      'maxResults': 24
    }
  } else {
    obj = {
      'part': 'snippet',
      'q': req.query.search,
      'type': 'video',
      'maxResults': 24
    }
  }

  appendPromise(obj).then(response =>{
    return res.json(response);
  }).catch(error => {
    res.json(error);
  });
});
