const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.sendPushNotification = functions.firestore
    .document('messages/{messageId}')
    .onCreate( event => {
        console.log(event.data.data())
    })