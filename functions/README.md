# SETUP CLOUD FUNCTIONS

If you haven't initialized your firebase project, please start with setup
stated in main directory README. This is only cloud functions guide.

Install the Firebase CLI

```bash
npm install -g firebase-tools
```

To deploy your functions, use

```bash
firebase deploy --only functions
```

## RUNNING LOCALLY

To run your functions locally, use

```bash
firebase emulators:start
```

## USING GOOGLE APIS CLOUD FUNCTIONS

For Google APIs cloud functions such as gMail message sending and gSuite
groups management, you need to have an active Google account and a domain with gSuite
for business. Your account **has to be a superuser** on a gSuite platform you are accessing with cloud functions.
Please fill the domain name and account email address in **config.json** file.

To access your account functionalities programatically, you have to obtain a file
with your credentials. The easiest way (if you are using personal Google account)
to do it is going here:
https://developers.google.com/gmail/api/quickstart/js and clicking a button
"Enable the Gmail API". The process will start and browser will automatically
download a **credentials.json** file.
The first time you invoke one of your cloud functions, you will be guided
on setting up the APIs -- in this app case, you will be prompted
to verify your account and give all Google API scopes consents.

Another way to authorise the app to invoke Google APIs programmatically is enabling APIs first.
Go to GCP of your project and allow APIs listed below:
https://console.cloud.google.com/apis/library/admin.googleapis.com
https://console.cloud.google.com/apis/library/gmail.googleapis.com.
In credentials section, you will be able to download
OAuth2.0 token that will authorise your app --
https://console.cloud.google.com/apis/credentials/oauthclient.

Right now, all required permissions are:

| Scope                        | Description                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| gmail.modify                 | All read/write operations except immediate, permanent deletion of threads and messages, bypassing Trash. |
| gmail.compose                | Create, read, update, and delete drafts. Send messages and drafts.                                       |
| gmail.send                   | Send messages only. No read or modify privileges on mailbox.                                             |
| admin.directory.group        | Global scope for access to all group operations, including group aliases and members.                    |
| admin.directory.user         | Global scope for access to all user and user alias operations.                                           |
| admin.directory.group.member | Scope for access to all group member roles and information operations.                                   |

Once you allow cloud functions to access your APIs, **token.json** containing your authorisation token
will be created and you are all set. Warning: If you decide to change the scopes, i.e. add new scope,
remember to create a new token.

## TESTING

To start testing, use a line below

```bash
npm run test
```

Make sure that your account has superuser privileges and credentials.json is in the directory.
