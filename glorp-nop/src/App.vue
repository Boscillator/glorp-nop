<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Glorp Nop</span>
          </div>
          <div class="md-toolbar-section-end">
            <md-button @click="composeMessage" class="md-icon-button">
              <md-icon>add</md-icon>
            </md-button>
          </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>
        <md-list>
          <md-list-item @click="showFriends()">
            <md-icon>people</md-icon>
            <span class="md-list-item-text">Friends</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <h4>Hello, {{displayName}}</h4>
        <MessagesList />
      </md-app-content>
    </md-app>

    <!--Popups-->
    <MessageEditor />
    <Signin />
    <FriendsPopup />
  </div>
</template>

<script>
import MessagesList from '@/components/MessagesList'
import MessageEditor from '@/components/MessageEditor'
import Signin from '@/components/Signin'
import FriendsPopup from '@/components/FriendsPopup'

export default {
  name: "app",
  data: () => ({
    menuVisible: false
  }),
  computed: {
    displayName() {
      return this.$store.state.user != null ? this.$store.state.user.email : ""
    }
  },
  components: {
    MessagesList,
    MessageEditor,
    Signin,
    FriendsPopup
  },
  methods: {
    composeMessage() {
      this.menuVisible = false
      this.$store.commit('showMessageEditor')
    },
    showFriends() {
      this.menuVisible = false
      this.$store.commit('showFriends')
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
