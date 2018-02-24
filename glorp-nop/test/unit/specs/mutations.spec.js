import { mutations } from '@/store'

describe('mutations', () =>
    it('should add a message when a addMessage is called', () => {
        const state = { messages: [] }
        const message = {
            'id': 'some_unique_key',
            'message': {
                'to': 'some_user_id',
                'from': 'some_other_user_id',
                'from_name': 'Billy Bob',
                'body': 'Hi There!'
            }
        }

        mutations.addMessage(state, message)

        console.log(state)

        expect(state.messages).include({
            'id': 'some_unique_key',
            'from': 'Billy Bob',
            'body': 'Hi There!'
        })

    })
)