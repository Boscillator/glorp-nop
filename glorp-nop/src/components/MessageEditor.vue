<template>
  <md-dialog id="editor" :md-active="shown">
      <md-dialog-title>Compose Message</md-dialog-title>
      <template v-if="!isSending">
        <md-dialog-content>
            <md-autocomplete v-model="to" :md-options="friends">
                <label>To</label>
            </md-autocomplete>
            <md-field>
              <label>Message</label>
              <md-input v-model="body"></md-input>
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
            md-description="Your message is being hand delivered across the tubes"
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
      return this.$store.state.show_message_editor;
    },
    isSending() {
      return this.$store.state.sending_message;
    },
    friends() {
      let f = this.$store.state.friends.map(friend => friend.email)
      console.log(f);
      return f;
    }
  },
  methods: {
    clear() {
      (this.to = ""), (this.body = "");
    },
    cancel() {
      this.$store.commit("hideMessageEditor");
      this.clear();
    },
    send() {
      this.$store.dispatch("sendMessage", {
        to: this.to,
        body: this.body
      });
      this.clear();
    }
  }
};
</script>

<style>
#editor {
    width: 120%;
    z-index: 10;
}
.md-menu-content {
    z-index: 110;
  }

</style>
