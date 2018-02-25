<template>
    <md-dialog id="friends" :md-active="shown">
        <md-dialog-title>Friends</md-dialog-title>

        <md-dialog-content>
            <template v-if="addingFriend == false">
                <FriendSearch />
                <FriendsList />
            </template>
            <template v-else>
                <md-empty-state
                    md-icon="hourglass_empty"
                    md-label="Adding friend"
                    :md-description="addingFriendMessage"
                    />
            </template>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="close()">Close</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
import FriendsList from '@/components/FriendsList'
import FriendSearch from '@/components/FriendSearch'

export default {
    name: 'FriendsPopup',
    computed: {
        shown() {
            return this.$store.state.show_friends
        },
        addingFriend() {
            return this.$store.state.adding_friend !== false
        },
        addingFriendMessage() {
            return "You are friending " + this.$store.state.adding_friend
        }
    },
    methods: {
        close() {
            this.$store.commit("hideFriends")
        }
    },
    components: {
        FriendsList,
        FriendSearch
    }
}
</script>

<style>
</style>
