import Vuex from 'vuex'

export const state = {
    messages: []
}

export const mutations = {
    addMessage(state, payload) {
        state.messages.push( { 
            id: payload.id,
            from: payload.message.from_name,
            body: payload.message.body
        })
    }
}