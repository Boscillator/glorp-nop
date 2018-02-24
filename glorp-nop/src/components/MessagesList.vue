<template>
  <div>
        <div v-if="messages.length > 0">
            <Message v-for="message in messages" 
                :key="message.id" 
                :id="message.id" 
                :from="message.from" 
                :body="message.body"
                />
        </div>
        <div v-else>
            <md-empty-state
                md-icon="message"
                md-label="You have no new messages!"
                md-description="Get some friends!"
                />
        </div>
  </div>
</template>

<script>
import Message from './Message'

export default {
    name: "MessageList",
    data: ()=> ({}),
    computed: {
        messages() {
            
            return this.$store.state.messages
        }
    },
    components: {
        Message
    }
}
</script>

<style>

</style>
