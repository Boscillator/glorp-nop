import Vuex from 'vuex'
import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

export const state = {
    show_message_editor: false,
    sending_message: false,

    is_signing_in: false,
    user: null,

    messages: []
}

export const getters = {
    isSignedIn: state => !(state.user === null)
}

export const mutations = {
    addMessage(state, payload) {
        state.messages.push( { 
            id: payload.id,
            from: payload.message.from,
            body: payload.message.body
        })
    },

    removeMessage(state, id) {
        //Keep all messages who id is not the one that is being deleted
        state.messages = state.messages.filter( message => message.id != id )
    },
    showMessageEditor(state) {
        state.show_message_editor = true
    },
    hideMessageEditor(state) {
        state.show_message_editor = false
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
    }
}

export const actions = {
    deleteMessage(context, id) {
        let db = firebase.firestore()
        db.collection("messages").doc(id).delete().then(function() {
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

        firebase.auth().signInWithPopup(provider).then( function(result) {
            
            let user = result.user;
            console.log('Got User')
            console.log(user)
            context.commit('signinFinished', user)
            context.dispatch('storeUserInDatabase')
            context.dispatch('createDatabaseListeners')
        })
    },
    storeUserInDatabase(context){
        let user = context.state.user
        firebase.firestore().collection("users").doc(user.uid).set({
            displayName: user.displayName,
            email: user.email
        }, {merge: true})
    },
    createDatabaseListeners(context) {
        let db = firebase.firestore()
        console.log('creating listeners')
        db.collection("messages").where("to","==",context.state.user.email).onSnapshot(function(querySnapshot) {
            console.log('got snapshot')
            querySnapshot.docChanges.forEach(function(change) {
                console.log('got change')
                if (change.type === "added") {
                    context.commit('addMessage', {
                        id: change.doc.id,
                        message: change.doc.data()
                    })
                }
            })
        })
    }
}