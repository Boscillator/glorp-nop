<template>
  <md-dialog :md-active="shown">
      <md-dialog-title>Sign In</md-dialog-title>
      <md-dialog-content>
          You need to sign in to use Glorp Nop
      </md-dialog-content>
      <md-dialog-actions>
          <md-button class="md-primary">Sign in With Google</md-button>
      </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
    name: 'Signin',
    computed: {
        shown() {
            return !this.$store.isSignedIn
        }
    }
}
</script>

<style>

</style>
