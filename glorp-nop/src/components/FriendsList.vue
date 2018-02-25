<template>
  <div>
      <md-list>
          <Friend v-for="friend in friends"
            :key="friend.id"
            :id="friend.id"
            :displayName="friend.displayName"
            :photoURL="friend.photoURL"
            />
      </md-list>
  </div>
</template>

<script>
import Friend from '@/components/Friend'

export default {
    name:'FriendsList',
    computed: {
        friends() {
            return this.$store.state.friends
        }
    },
    components: {
        Friend
    }
}
</script>

<style>

</style>
