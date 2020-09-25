const fs = require('fs');

function makeBody(to, from, subject, message) {
  const str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    'To: ', to, '\n',
    'From: ', from, '\n',
    'Subject: ', subject, '\n\n',
    message,
  ].join('');

  const encodedMail = new Buffer.from(str).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  return encodedMail;
}

exports.sendMessage = (auth, recipient, content, googleService) => {
  const raw = makeBody(recipient, 'kluczek@identity-sre.com',
      'Hello from Scriba!', content);
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
