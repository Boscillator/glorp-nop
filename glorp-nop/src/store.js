import Vuex from 'vuex'

export const state = {
    show_message_editor: false,
    sending_message: false,
    user: null,
    messages: [
        {
            id:'1',
            from:'Billy Bob',
            body:'Hello'
        },
        {
            id:'2',
            from:'Billy the Buffalo',
            body:'Goodbye'
        }
    ]
}

export const getters = {
    isSignedIn: state => user!=null
}

export const mutations = {
    addMessage(state, payload) {
        state.messages.push( { 
            id: payload.id,
            from: payload.message.from_name,
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
    }
}

export const actions = {
    deleteMessage(context, id) {
        context.commit('removeMessage', id)
    },
    sendMessage(context, message) {
        context.commit('startSendMessage')
        console.log(message)
        setTimeout(() => {
            context.commit('messageSent')
            context.commit('hideMessageEditor')
        }, 1000)
    }
}