// Exemplary function communicating with gSuite for identity-sre.com,
// listing all users.
exports.listUsers = (auth, googleService) => {
  const service = googleService.admin({version: 'directory_v1', auth});
  service.users.list({
    domain: 'identity-sre.com',
    customer: 'my_customer',
    orderBy: 'email',
  }, (err, res) => {
    if (err) return console.error('The API returned an error:', err.message);
    const users = res.data.users;
    if (users.length) {
      console.log('Users:');
      users.forEach((user) => {
        console.log(`${user.primaryEmail} (${user.name.fullName})`);
      });
    } else {
      console.log('No users found.');
    }
  });
}
