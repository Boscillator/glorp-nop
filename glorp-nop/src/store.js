import Vuex from 'vuex'
import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

export const state = {
    show_message_editor: false,
    sending_message: false,
    show_friends: false,
    show_navigation: false,
    adding_friend: false,

    is_signing_in: false,
    user: null,

    messages: [],
    friends: []
}

export const getters = {
    isSignedIn: state => !(state.user === null)
}

export const mutations = {
    addMessage(state, payload) {
        state.messages.push({
            id: payload.id,
            from: payload.message.from,
            body: payload.message.body
        })
    },

    removeMessage(state, id) {
        //Keep all messages who id is not the one that is being deleted
        state.messages = state.messages.filter(message => message.id != id)
    },
    showMessageEditor(state) {
        state.show_message_editor = true
    },
    hideMessageEditor(state) {
        state.show_message_editor = false
    },
    showFriends(state) {
        state.show_friends = true
    },
    hideFriends(state) {
        state.show_friends = false
    },
    toggleNavigation(state) {
        state.show_navigation = !state.show_navigation
    },
    startSendMessage(state) {
        state.sending_message = true
    },
    messageSent(state) {
        state.sending_message = false
    },

    startSignin(state) {
        state.is_signing_in = true
    },

    signinFinished(state, user) {
        state.is_signing_in = false
        state.user = user
    },
    addFriend(state, friend) {
        state.friends.push(friend)
    },
    removeFriend(state, id) {
        state.friends = state.friends.filter(friend => friend.id != id)
    },
    resetFriends(state) {
        state.friends = []
    },
    addingFriend(state, email) {
        state.adding_friend = email
    },
    finishedAddingFriend(state) {
        state.adding_friend = false
    }
}

export const actions = {
    deleteMessage(context, id) {
        let db = firebase.firestore()
        db.collection("messages").doc(id).delete().then(function () {
            context.commit('removeMessage', id)
        })
    },
    sendMessage(context, message) {
        let db = firebase.firestore()
        context.commit('startSendMessage')
        db.collection("messages").add({
            to: message.to,
            body: message.body,
            from: context.state.user.email
        }).then(docRef => {
            context.commit('messageSent')
            context.commit('hideMessageEditor')
        })
    },
    signInWithGoogle(context) {
        context.commit('startSignin')
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {

            let user = result.user;
            console.log('Got User')
            console.log(user)
            context.commit('signinFinished', user)
            context.dispatch('storeUserInDatabase')
            context.dispatch('createDatabaseListeners')
        })
    },
    async storeUserInDatabase(context) {
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey("BCwSaYPETm5lHqWbSHgUmGw02tM6dG1YH9PPbsjJOaIRi0G5VzswxLSkzfXQicf_SBGpyNsMPmKyp5b2MVy9ync");
        if ('serviceWorker' in navigator) {
            let regisation = await navigator.serviceWorker.register('/static/firebase-messaging-sw.js')
            console.log(regisation)
            messaging.useServiceWorker( regisation )
        }

        let token = null;
        try {
            await messaging.requestPermission()
            token = await messaging.getToken()
        } catch (error) {}

        messaging.onMessage(function(payload) {
            console.log("Message received. ", payload);
            // ...
          });

        let user = context.state.user
        firebase.firestore().collection("users").doc(user.uid).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            fcmToken: token
        }, { merge: true })
    },
    createDatabaseListeners(context) {
        let db = firebase.firestore()

        db.collection("users").doc(context.state.user.uid).onSnapshot(doc => {
            context.commit('resetFriends')
            if (doc.data().friends) {
                doc.data().friends.map(friend => {
                    const friendRef = db.collection("users").doc(friend)
                    friendRef.get().then(doc => {
                        if (doc.exists) {
                            let friend = doc.data()
                            friend['id'] = doc.id
                            context.commit('addFriend', friend)
                        }
                    })
                })
            }
        })

        db.collection("messages").where("to", "==", context.state.user.email).onSnapshot(function (querySnapshot) {
            querySnapshot.docChanges.forEach(function (change) {
                if (change.type === "added") {
                    context.commit('addMessage', {
                        id: change.doc.id,
                        message: change.doc.data()
                    })
                }
            })
        })
    },

    unfriend(contex, id) {
        contex.commit('removeFriend', id)
        context.dispatch('saveFreinds')
    },

    addFriend(context, email) {
        context.commit('addingFriend', email)
        firebase.firestore().collection('users').where("email" , "==", email).get().then( snapshot => {
            snapshot.forEach( doc => {
                let friend = doc.data()
                friend['id'] = doc.id
                context.commit('addFriend', friend)
            })
            context.dispatch('saveFriends')  
        })
    },

    saveFriends(context) {
        let friends = context.state.friends.map( friend => friend.id )
        console.log(friends)
        firebase.firestore().collection("users").doc(context.state.user.uid).update({
            friends
        })
        context.commit('finishedAddingFriend')
    }
}