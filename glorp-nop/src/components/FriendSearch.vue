<template>
      <div class="md-layout">
        <div class="md-layout-item md-size-80">
        <md-field >
            <label>Email</label>
            <md-input type="email" v-model="email"></md-input>
        </md-field>
        </div>
        <div class="md-layout-item">
            <md-button @click="addFriend()" class="md-icon-button">
                <md-icon>add</md-icon>
            </md-button>
        </div>
      </div>
</template>

<script>
export default {
    name: 'FriendSearch',
    data: () => ({
        email: ""
    }),
    methods: {
        addFriend() {
            this.$store.dispatch('addFriend', this.email)
        }
    }
}
</script>

<style>

</style>
