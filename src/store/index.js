import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts'
import categories from './categories'
import messages from './messages'
import shared from './shared'
import user from './user'



Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    posts,
    categories,
    messages,
    user,
    shared
  }
})
