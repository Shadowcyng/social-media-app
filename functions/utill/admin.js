var admin = require("firebase-admin");

var serviceAccount = require('../Social-Media-2b4b8407d2d6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://social-media-7433e.firebaseio.com"
  });
  const db = admin.firestore();

  module.exports = {db, admin}