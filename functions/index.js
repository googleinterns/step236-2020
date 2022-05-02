/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const functions = require('firebase-functions');
const authenticator = require('./authenticator');
const CONFIG = require('./config.json');

// Modules used for communications with Google APIs
const gmailEmailSender = require('./gmailEmailSender');
const googleGroupsManager = require('./googleGroupsManager');

// gMail API constants.
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

exports.triggerSpooglerMail = functions.firestore
    .document('pending-members/{docId}')
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
