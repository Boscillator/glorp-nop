<template>
    <md-card md-with-hover>
        <md-card-header>
            <div class="md-title">{{from}}</div>
        </md-card-header>
        <md-card-content>
            {{body}}
        </md-card-content>
        <md-card-actions>
            <md-button @click="deleteMessage" class="md-icon-button">
                <md-icon>delete</md-icon>
            </md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
export default {
  name: "Message",
  props: ["id","from", "body"],
  methods: {
      deleteMessage() {
          this.$store.dispatch('deleteMessage', this.id)
      }
  }
};
</script>

<style>

</style>
