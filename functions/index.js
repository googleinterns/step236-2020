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

/**
 * Cloud function for creating a new group in gSuite
 * @type {HttpsFunction} (request, response) used for communication with end-user
 * Request has fields: groups email, description, name
 * @return {JSON} status returned from google API
 */
exports.createGroup = functions.https.onRequest((request, response) => {
  return authenticator.checkCredentials(CREDENTIALS_PATH,
      (auth) => {
        googleGroupsManager.createGroup(auth, google, request.query.email, request.query.description, request.query.name)
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
 * Cloud function for deleting a group in gSuite
 * @type {HttpsFunction} (request, response) used for communication with end-user
 * Request has a field containing group email.
 * @return {JSON} status returned from google API.
 */
exports.deleteGroup = functions.https.onRequest((request, response) => {
  return authenticator.checkCredentials(CREDENTIALS_PATH,
      (auth) => {
        googleGroupsManager.deleteGroup(auth, google, request.query.email)
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
