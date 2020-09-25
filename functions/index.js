const functions = require('firebase-functions');

// Modules used for communications with Google APIs
const gmailEmailSender = require('./gmailEmailSender');
const googleGroupsManager = require('./googleGroupsManager');

// gMail API constants.
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const emailContent = require('./email-content.json');
const TOKEN_PATH = 'token.json';
const DOMAIN = 'identity-sre.com';

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// If modifying the scopes below, delete token.json.
const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/admin.directory.group',
  'https://www.googleapis.com/auth/admin.directory.user',
  'https://www.googleapis.com/auth/admin.directory.group.member',
  'https://www.googleapis.com/auth/admin.directory.user.alias',
];

exports.sendMail = functions.firestore
    .document('pending-users/{doc-id}')
    .onWrite((change, context) => {
  if (context.params.isVerified) {
    return checkCredentials('credentials.json',
        (auth) => {
          gmailEmailSender.sendMessage(auth, context.params.email, emailContent.spoogler, google);
        });
  } else {
    return checkCredentials('credentials.json',
        (auth) => {
          gmailEmailSender.sendMessage(auth, context.params.partnerEmail, emailContent.googler, google);
        });
  }
});

/**
 * Cloud function for retrieving all users in gSuite of DOMAIN
 * @type {HttpsFunction} (request, response) used for communication with end-user
 * @return {JSON} found list of users
 */
exports.listUsers = functions.https.onRequest((request, response) => {
  return checkCredentials('credentials.json',
      (auth) => {
        googleGroupsManager.listUsers(auth, google, DOMAIN)
            .then((output) => {
              response.json(output);
              return output;
            })
            .catch((error) => {
              response.status(403);
              response.json(error);
              return error;
        });
      },
  );
});

function checkCredentials(path, callback) {
  fs.readFile('credentials.json', (err, content) => {
    if (err) {
      return console.log('Error loading client secret file:', err);
    }
    return authorize(JSON.parse(content), (auth) => callback(auth));
  });
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if the token is already stored.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions.
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
