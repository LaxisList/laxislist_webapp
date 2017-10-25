<template lang="html">
  <div class="container __home">

    <!-- headline -->
    <app-headline/>

    <!-- search bar -->
    <div class="row">
      <div class="col-sm-12 ">
        <div class="flex xs12">
          <div class="d-flex flex-row align-items-center search__bar">
            <i aria-hidden="true"
               class="material-icons __icon_search icon input-group__prepend-icon"
               @click.prevent="foundPost">search</i>
            <input tabindex="0"
                   v-model.trim="query"
                   placeholder="Qu'est-ce que vous recherchez?"
                   type="search"
                   @keyup.enter.prevent="foundPost">
          </div>
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
      <div class="col-sm-12 d-flex justify-content-center" v-if="loading">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="font-size: 52px;"></i>
      </div>
      <div class="col-sm-12 col-md-9" v-else>
        <div class="row">
          <div class="col-sm-6 col-md-6 col-lg-4 mb-4" v-for="post in filterSearch(loadedPosts, query)">
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
        return post.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || post.description.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || post.creatorName.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || post.creatorBusiness.toLowerCase().indexOf(this.query.toLowerCase()) > -1
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
$bg-search: #f7f7f7;
.__icon_search {
  color: rgba(0,0,0,.54);
  transition: color .2s;

  &:hover {
    cursor: pointer;
  }
}
.search__bar {
  background: $bg-search;
  width: 100%;
  padding: 8px 16px;
  border-radius: 2px;
  transition: background .1s ease-in;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.05);
  input {
    width: 100%;
    padding-left: 8px;
    background: none;
    color: rgba(0,0,0,.54);
    border: none;
    outline: none;
  }
  &:hover {
    background: #EEE;
  }
}
.__full {
  display: flex;
  flex-flow: row wrap;
}
// .input_searchbar {
//   flex-grow: 2;
//   // box-shadow: 0 10px 40px 0 rgba(62, 57, 107, 0.07), 0 2px 9px 0 rgba(62, 57, 107, 0.06);
//   background: #f6f6f6;
// }
// input.form-control:focus{
//   border: 2px solid $app-color;
// }

.__home {
  margin-bottom: 200px;
}
@media only screen and (max-width: 767px) {
  .btn_search {
    width: 100%;
  }
}
</style>
