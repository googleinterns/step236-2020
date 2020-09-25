const functions = require('firebase-functions');
const authenticator = require('./authenticator');
// Modules used for communications with Google APIs
const gmailEmailSender = require('./gmailEmailSender');
const googleGroupsManager = require('./googleGroupsManager');

// gMail API constants.
const {google} = require('googleapis');
const DOMAIN = 'identity-sre.com';
const CREDENTIALS_PATH = 'credentials.json';

// TODO: Change https request listener to firestore listener.
exports.sendMail = functions.https.onRequest((request, response) => {
  const recipient = request.query.recipient;
  return authenticator.checkCredentials(CREDENTIALS_PATH,
      (auth) => {
        response.json(gmailEmailSender.sendMessage(auth, recipient, google));
      });
});

/**
 * Cloud function for retrieving all users in gSuite of DOMAIN
 * @type {HttpsFunction} (request, response) used for communication with end-user
 * @return {JSON} found list of users
 */
exports.listUsers = functions.https.onRequest((request, response) => {
  return authenticator.checkCredentials(CREDENTIALS_PATH,
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

/**
 * Cloud function for retrieving all groups in gSuite of DOMAIN
 * @type {HttpsFunction} (request, response) used for communication with end-user
 * @return {JSON} found list of groups
 */
exports.listGroups = functions.https.onRequest((request, response) => {
  return authenticator.checkCredentials(CREDENTIALS_PATH,
      (auth) => {
        googleGroupsManager.listGroups(auth, google, DOMAIN)
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
