import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home/Home'

// import Posts from '@/components/Post/Posts'
import CreatePost from '@/components/Post/CreatePost'
// lazy loading Single Post
const Post = resolve => {
  require.ensure(['@/components/Post/Post.vue'], () => {
    resolve(require('@/components/Post/Post.vue'))
  }, 'post')
}

// user
const Wish = resolve => {
  require.ensure(['@/components/Wish/Wish.vue'], () => {
    resolve(require('@/components/Wish/Wish.vue'))
  }, 'wish')
}
// user's account
const Account = resolve => {
  require.ensure(['@/components/User/Account.vue'], () => {
    resolve(require('@/components/User/Account.vue'))
  }, 'account')
}
const EditAccount = resolve => {
  require.ensure(['@/components/User/EditAccount.vue'], () => {
    resolve(require('@/components/User/EditAccount.vue'))
  }, 'edit-account')
}
// user's messages
const Messages = resolve => {
  require.ensure(['@/components/User/Messages.vue'], () => {
    resolve(require('@/components/User/Messages.vue'))
  }, 'messages')
}
// user's posts
const _Posts = resolve => {
  require.ensure(['@/components/User/Posts.vue'], () => {
    resolve(require('@/components/User/Posts.vue'))
  }, '_posts')
}

import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'

// statics
import Contact from '@/components/Statics/Contact'
import Terms from '@/components/Statics/Terms'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: { title: 'Achetez tout à moins cher en comparant les prix. Vendez à votre tour.' }
    },
    {
      path: '/post/create',
      component: CreatePost,
      beforeEnter: AuthGuard,
      meta: { title: 'Postez votre article' }
    },
    {
      path: '/posts/:id',
      component: Post,
      props: true,
    },
    {
      path: '/wish',
      component: Wish,
      meta: { title: 'Mes Coups de coeur' }
    },
    {
      path: '/signin',
      component: Signin,
      meta: { title: 'Connexion' }
    },
    {
      path: '/signup',
      component: Signup,
      meta: { title: 'Inscription' }
    },
    {
      path: '/user/account/:id',
      component: Account,
      meta: { title: 'Mon compte' },
      beforeEnter: AuthGuard
    },
    {
      path: '/user/edit/:id',
      component: EditAccount,
      meta: { title: 'Modifier mon compte' },
      beforeEnter: AuthGuard
    },
    {
      path: '/user/messages',
      component: Messages,
      meta: { title: 'Mes messages' },
      beforeEnter: AuthGuard
    },
    {
      path: '/user/posts',
      component: _Posts,
      meta: { title: 'Mes posts' },
      beforeEnter: AuthGuard
    },
    {
      path: '/contact-us',
      component: Contact,
      meta: { title: 'Nous contacter' }
    },
    {
      path: '/terms-and-conditions',
      component: Terms,
      meta: { title: 'Les conditions d\'utlisation' }
    },
    {
      path: '*',
      component: Home
    }
  ],
  mode: 'history',
  scrollBehaviol: (to, next) => {
    return {x: 0, y: 0}
  }
})
