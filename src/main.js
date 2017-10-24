import Vue from 'vue'
import App from './App'
import router from './router'
import InstantSearch from 'vue-instantsearch'
import DateFilter from './filters/date'
import CurrencyFilter from './filters/currency'
import firebase from 'firebase'
import $ from 'jquery'
import { store } from './store'
import { createFromAlgoliaCredentials } from 'vue-instantsearch'
import moment from 'moment'
import Alert from '@/components/Statics/Alert'
import _ from 'lodash'


const searchStore = createFromAlgoliaCredentials(
  'latency',
  '3d9875e51fbd20c7754e65422f7ce5e1'
);
searchStore.indexName = 'bestbuy'

window.searchStore = searchStore
window._ = _


Vue.use(InstantSearch)
Vue.filter('date', DateFilter)
Vue.filter('currency', CurrencyFilter)
Vue.component('app-alert', Alert)
Vue.config.productionTip = false

// router
router.beforeEach((to, from, next) => {
  document.title = to.meta.title !== undefined ? 'LaxisList - ' + to.meta.title : 'LaxisList'
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    window.scrollTo(0, 0)
    firebase.initializeApp({
      apiKey: "AIzaSyCbhJUP15DcQLoE9E_ekFgQjJT9RLwSCzM",
      authDomain: "laxislist.firebaseapp.com",
      databaseURL: "https://laxislist.firebaseio.com",
      projectId: "laxislist",
      storageBucket: "laxislist.appspot.com",
      messagingSenderId: "339938237754"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserProfile')
        this.$store.dispatch('fetchUserData')
        this.$store.dispatch('fetchUserMessages')
      }
    })
    this.$store.dispatch('loadPosts')
  }
})
