<template>
  <md-dialog :md-active="shown">
      <md-dialog-title>Compose Message</md-dialog-title>
      <template v-if="!isSending">
        <md-dialog-content>
            <md-field>
                <label>To</label>
                <md-input v-model="to"></md-input>
            </md-field>
            <md-field>
              <label>Message</label>
              <md-textarea v-model="body"></md-textarea>
            </md-field>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button @click="cancel" class="md-primary">Cancel</md-button>
          <md-button @click="send" class="md-accent">Send</md-button>
        </md-dialog-actions>
      </template>
      <template v-else>
          <md-empty-state
            md-icon="send"
            md-label="Sending"
            md-description="Make some friends!"
            />
      </template>
  </md-dialog>
</template>

<script>
export default {
    name: "MessageEditor",
    data: () => ({
        to: "",
        body: ""
    }),
    computed: {
        shown() {
            return this.$store.state.show_message_editor
        },
        isSending() {
            return this.$store.state.sending_message
        }
    },
    methods: {
        clear() {
            this.to = "",
            this.body = ""
        },
        cancel() {
            this.$store.commit('hideMessageEditor')
            this.clear()
        },
        send() {
            this.$store.dispatch('sendMessage', {
                to: this.to,
                body: this.body
            })
            this.clear()
        }
    }
}
</script>

<style>

</style>
