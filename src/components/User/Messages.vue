<template lang="html">
  <div class="container pt-4">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-9 col-md-9">
        <h5 class="mb-4"><b>Mes messages</b></h5>
        <div class="list-group" v-if="messages.length > 0">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="message in messages">
            <div class="d-flex w-100 justify-content-between">
              <div class="d-flex flex-row">
                <img :src="message.creatorAvatar" alt="" height="30px" width="30px" style="border-radius: 100%" class="mr-2">
                <h6 class="mb-1"><b>{{message.creatorName}} ({{message.creatorPhoneNumber}})</b></h6>
              </div>
              <small>{{message.timestamp | date}}</small>
            </div>
            <p class="mb-1"><b>{{message.postTitle}} - {{message.postPrice}}{{message.postPrice | currency}}</b></p>
            <p class="mb-1">{{message.content}}</p>
            <!-- <small>Donec id elit non mi porta.</small> -->
          </a>
        </div>
        <div class="text-center pt-5" v-else>
          <h6><b>Vous n'avez aucun nouveaux messages.</b></h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages () {
      return this.$store.getters.messages
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
h5,h6 {
  font-weight: 300;
}
</style>
