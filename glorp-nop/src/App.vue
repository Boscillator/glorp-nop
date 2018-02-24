<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
          <div class="md-toolbar-section-start">
            <span class="md-title">Glorp Nop</span>
          </div>
          <div class="md-toolbar-section-end">
            <md-button @click="composeMessage" class="md-icon-button">
              <md-icon>add</md-icon>
            </md-button>
          </div>
      </md-app-toolbar>
      <md-app-content>
        <h4>Hello, {{displayName}}</h4>
        <MessagesList />
      </md-app-content>
    </md-app>

    <!--Popups-->
    <MessageEditor />
    <Signin />
  </div>
</template>

<script>
import MessagesList from '@/components/MessagesList'
import MessageEditor from '@/components/MessageEditor'
import Signin from '@/components/Signin'

export default {
  name: "app",
  data: () => ({}),
  computed: {
    displayName() {
      return this.$store.state.user != null ? this.$store.state.user.email : ""
    }
  },
  components: {
    MessagesList,
    MessageEditor,
    Signin
  },
  methods: {
    composeMessage() {
      this.$store.commit('showMessageEditor')
    }
  }
};
</script>

<style>
.md-app {
  height: 100%;
  border: 1px solid rgba(#000, 0.12);
}
</style>
