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

const fs = require('fs');
const CONFIG = require('./config.json');

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

exports.sendMessage = (auth, recipient, googleService) => {
  const raw = makeBody(recipient, CONFIG.ADMIN_MAIL,
      'Welcome to the community!', 'Welcome, welcome!');
  const gmail = googleService.gmail({version: 'v1', auth});
  gmail.users.messages.send({
    auth: auth,
    userId: 'me',
    resource: {
      raw: raw,
    },
  }, (err, response) => {
    fs.writeFile('sendEmailResponse.json', JSON.stringify(response), (err) => {
      if (err) return console.error(err);
      console.log('Response stored to sendEmailResponse.json');
      return null;
    });
    return (err || response);
  });
}
