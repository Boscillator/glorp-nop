const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

var db = admin.firestore()

exports.sendPushNotification = functions.firestore
    .document('messages/{messageId}')
    .onCreate(event => {
        let message = event.data.data()
        console.log(message)
        let to_email = message.to

        return new Promise((resolve, reject) => {
            //Find user with that email
            db.collection('users').where('email', '==', to_email).get()
                .then(snapshot => {
                    let to_user = snapshot.docs[0]
                    if (to_user) {
                        console.log(to_user.data())
                        var notification = {
                            notification: {
                                title: message.from,
                                body: message.body
                            },
                            token: to_user.data().fcmToken
                        }

                        admin.messaging().send(notification)
                            .then(response => {
                                console.log(response)
                                resolve()
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                })
        })

    })