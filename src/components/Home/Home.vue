<template lang="html">
  <div class="container __home">

    <!-- headline -->
    <app-headline/>

    <!-- search bar -->
    <div class="row">
      <div class="col-sm-12 ">
        <div class="form-inline searchbar">
          <input type="text" v-model.trim="query" placeholder="Qu'est-ce que vous recherchez?" class="form-control input_searchbar" @keyup.enter.prevent="foundPost">
          <!-- <button class="btn btn-danger btn_search my-2 my-sm-0 ml-md-2" type="submit" style="cursor: pointer;">Effacer</button> -->
          <button class="btn btn__normal btn_search my-2 ml-md-2" type="button" @click.prevent="foundPost">Trouver</button>
        </div>
      </div>
    </div>
    <!-- result statics -->
    <div class="row">
      <div class="col-sm-12">

      </div>
    </div>
    <!-- result grid and filter -->
    <div class="row mt-5 mb-5">
      <!-- filter -->
      <!-- <div class="col-md-3 col-sm-0 col-xs-0">
        <div class="card p-3">
          <div class="card-block">
            <div class="card-title">
              <h5 class="d-flex align-items-center"><i class="material-icons mr-2">filter_list</i> Filter par</h5>
            </div>
            <div class="priceRange">
              Prix maximum: <input type="number" v-model.trim="priceRange" class="form-control mt-1" style="width: 90px;">
            </div>
          </div>
        </div>
      </div> -->
      <!-- results -->
      <!-- <div class="col-sm-12 col-md-6" v-for="post in filteredPosts(query, selectedCategory, priceRange, loadedPosts)" :key="post.id"> -->
      <!-- <div class="row" v-if="loading"> -->
        <div class="col-sm-12 d-flex justify-content-center" v-if="loading">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="font-size: 52px;"></i>
        </div>
      <!-- </div> -->
      <div class="col-sm-12 col-md-9" v-else>
        <div class="row">
          <div class="col-sm-6 col-md-4 mb-4" v-for="post in filterSearch(loadedPosts, query)">
            <app-post-card :post="post" :key="post.id"/>
          </div>
        </div>
      </div>
      <!-- ads -->
    </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import AppHeadline from './Headline'
import AppPostCard from './PostCard'

export default {
  data () {
    return {
      selectedFilter: '',
      selectedCategory: '',
      query: '',
      alert: '',
      snackbar: false,
      priceRange: null
    }
  },
  computed: {
    loadedPosts () {
      return this.$store.getters.loadedPosts
    },
    loading () {
      return this.$store.getters.loading
    },
  },
  methods: {
    filterSearch (loadedPosts, query) {
      return _.filter(loadedPosts, (post) => {
        return post.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || post.description.toLowerCase().indexOf(this.query.toLowerCase()) > -1
      })
    },
    foundPost () {
      return this.filterSearch()
    }
  },
  mounted () {
    this.$store.dispatch('loadPosts')
  },
  created () {
    if (this.$route.query.alert) {
      this.snackbar = true
      this.alert = this.$route.query.alert
    }
    window.scrollTo(0, 0)
  },
  components: {
    AppHeadline,
    AppPostCard
  }
}
</script>

<style lang="scss" scoped>
$app-color: #3498db;
.__full {
  display: flex;
  flex-flow: row wrap;
}
.input_searchbar {
  flex-grow: 2;
  // box-shadow: 0 10px 40px 0 rgba(62, 57, 107, 0.07), 0 2px 9px 0 rgba(62, 57, 107, 0.06);
  background: #f6f6f6;
}
input.form-control:focus{
  border: 2px solid $app-color;
}

.__home {
  margin-bottom: 200px;
}
@media only screen and (max-width: 767px) {
  .btn_search {
    width: 100%;
  }
}
</style>
