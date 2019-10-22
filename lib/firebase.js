const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://mws-p2c1.firebaseio.com'
});

module.exports = admin;
