const functions = require('firebase-functions');

// gMail API constants.
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const TOKEN_PATH = 'token.json';

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// If modifying the scopes below, delete token.json.
const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
];

// TODO: Change https request listener to firestore listener.
exports.sendMail = functions.https.onRequest((request, response) => {
  const recipient = request.query.recipient;
  // TODO: Respond with more meaningful response.
  response.send('Hello from Firebase!');
  fs.readFile('credentials.json', (err, content) => {
    if (err) {
      return console.log('Error loading client secret file:', err);
    }
    authorize(JSON.parse(content), (auth) => {
      sendMessage(auth, recipient);
    });
  });
});

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

function makeBody(to, from, subject, message) {
  const str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    'To: ', to, '\n',
    'from: ', from, '\n',
    'Subject: ', subject, '\n\n',
    message,
  ].join('');

  const encodedMail = new Buffer.from(str).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  return encodedMail;
}

function sendMessage(auth, recipient) {
  const raw = makeBody(recipient, 'kluczek@identity-sre.com',
      'Welcome to the community!', 'Welcome, welcome!');
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.send({
    auth: auth,
    userId: 'me',
    resource: {
      raw: raw,
    },
  }, function(err, response) {
    fs.writeFile('sendEmailResponse.json', JSON.stringify(response), (err) => {
      if (err) return console.error(err);
      console.log('Response stored to sendEmailResponse.json');
    });
    return (err || response);
  });
}
