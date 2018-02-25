<template>
  <md-list-item>
      <md-avatar>
          <img :src="photoURL" :alt="displayName" />
      </md-avatar>
      <span class="md-list-item-text">{{displayName}}</span>
      <md-button @click="remove()" class="md-icon-button md-list-action">
          <md-icon>delete</md-icon>
      </md-button>
  </md-list-item>
</template>

<script>
export default {
    name: 'Friend',
    props: ["id","displayName","photoURL"],
    methods: {
        remove() {
            this.$store.dispatch('unfriend', this.id)
        }
    }
}
</script>

<style>

</style>
