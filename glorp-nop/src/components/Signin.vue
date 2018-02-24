<template>
  <md-dialog :md-active="shown == true">
      <md-dialog-title>Sign In</md-dialog-title>
      <template v-if="isSigningIn == false">
        <md-dialog-content>
              You need to sign in to use Glorp Nop
        </md-dialog-content>
        <md-dialog-actions>
              <md-button @click="signInWithGoogle" class="md-primary">Sign in With Google</md-button>
        </md-dialog-actions>
      </template>
      <template v-else>
          <md-empty-state
            md-icon="verified_user"
            md-label="Signing In"
            md-description="A popup should direct you."
            />
      </template>
  </md-dialog>
</template>

<script>
export default {
    name: 'Signin',
    computed: {
        shown() {
            return !this.$store.getters.isSignedIn
        },
        isSigningIn() {
            return this.$store.state.is_signing_in
        }
    },
    methods: {
        signInWithGoogle() {
            this.$store.dispatch('signInWithGoogle')
        }
    }
}
</script>

<style>

</style>
