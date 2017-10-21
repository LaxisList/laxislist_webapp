<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-9 col-sm-12">
        <h5 class="mb-4"><strong>Vos coups de cœur</strong></h5>
        <div v-if="!userIsAuthenticated">
          <p>Veuillez vous connecter pour voir vos coups de coeur.</p>
        </div>

        <div class="row" v-if="loading">
          <div class="col-sm-12 d-flex justify-content-center mt-5 mb-5" v-if="loading">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="font-size: 70px;"></i>
          </div>
        </div>
        <div v-if="userIsAuthenticated">
          <div v-if="wishExists">
            <app-post-wish v-for="post in posts"
            :key="post.id"
            :post="post"/>
          </div>
          <div class="d-flex justify-content-center" v-else>
            Vous n'avez pas des coups de cœur.
          </div>
        </div>
      </div>
      <div class="col-md-3 hidden-sm-down">
      </div>
    </div>
  </div>
</template>

<script>
import AppPostWish from './PostWish'
export default {
  computed: {
    posts () {
      return this.$store.getters.user.registeredWish
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    wishExists () {
      if(!this.userIsAuthenticated) return
      this.$store.getters.user.registeredWish > 0
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    this.posts
  },
  components: {
    AppPostWish
  }
}
</script>

<style lang="scss" scoped>
</style>
