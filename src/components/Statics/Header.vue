<template lang="html">
  <div class="container-fluid __header fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="navbar-brand d-flex flex-row">
        <router-link tag="a" to="/">
          <img src="../../assets/logo-min.png" alt="" style="border-radius: 50%; height: 36px; width: 36px;">
        </router-link>
        <router-link tag="a" to="/post/create" class="ml-4 __post">
          <button type="button" class="btn btn__normal pl-2 pr-2" style="color: white;">Poster</button>
        </router-link>
      </div>

      <button class="navbar-toggler hidden-sm-down" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="material-icons __opener" style="font-size: 24px;">menu</i>
      </button>

      <div class="collapse navbar-collapse navbar-toggleable-xs" id="navbarSupportedContent">
        <div class="mr-auto"></div>
        <ul class="navbar-nav navbar-right order-xs-1 order-sm-1 order-md-2 navbar__search">
          <router-link tag="a" activeClass="active" to="/post/create" class="nav-item mr-md-3 __when_post">
            <button type="button" class="nav-link btn btn__normal pl-2 pr-2" style="color: white;">Poster</button>
          </router-link>
          <!-- <span v-if="!userIsAuthenticated"> -->
          <router-link tag="a" activeClass="active" :to="menu.link" class="nav-item" v-for="menu in menuDrawer" :key="menu.title">
            <a class="nav-link __text d-flex align-items-center">{{menu.title}}</a>
          </router-link>
          <!-- </span> -->
          <li class="nav-item dropdown" v-if="userIsAuthenticated">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img :src="user.avatar" alt="" class="avatar mr-2" width="20px" height="20px" v-if="user.avatar" style="border-radius: 50%;"> Compte
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <span v-if="user.lastname">
                <a class="dropdown-item">@<b>{{userName}}</b></a>
                <div class="dropdown-divider"></div>
              </span>
              <router-link tag="a" to="/user/posts" class="dropdown-item">Mes posts</router-link>
              <div class="dropdown-divider"></div>
              <router-link tag="a" to="/user/messages" class="dropdown-item">Mes messages</router-link>
              <div class="dropdown-divider"></div>
              <router-link tag="a" :to="`/user/account/${user.id}`" class="dropdown-item">Mon compte</router-link>
            </div>
          </li>
          <li class="nav-item" v-if="userIsAuthenticated"><a class="nav-link" @click="onLogout">Déconnexion</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      isOpen: false,
      searchInput: '',
      selectedCategory: '',
      logo: 'https://firebasestorage.googleapis.com/v0/b/laxislist.appspot.com/o/statics%2Flogo-min.png?alt=media&token=1d471fea-5bc5-4a39-bf9e-5560589a1c5c',
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    userName () {
      return `${this.user.lastname}`
    },
    wishLength () {
      return _.size(this.user.registeredWish )
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    menuDrawer () {
      let menuItems
      if (!this.userIsAuthenticated) {
        menuItems = [
          {title: 'Connexion', link: '/signin', icon: 'person'},
          {title: 'Inscription', link: '/signup', icon: 'person_add'},
        ]
      }
      return menuItems
    }
  },
  methods: {
    onLogout () {
      return this.$store.dispatch('logout')
    },
  }
}
</script>

<style lang="scss" scoped>
$app-color: #3498db;
// $app-color: #ff5a5f;
a {
  text-decoration: none;
}
.__post {
  display: none;
}
button.navbar-toggler{
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
}
.__opener {
  padding: 6px;
  background: #333;
  color: #FFF;
  cursor: pointer;
  font-size: 24px;
  border-radius: 100%;
}
.__header{
  // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 2.25rem #9da5ab;
  background: white;
  z-index: 30;
  font-weight: 400;
}
.__wish{
  font-size: 28px;
  color: $app-color;
  position: relative;

  .__badge{
      position: absolute;
      width: 20px;
      height: 20px;
      padding-left: 3px;
      padding-top: 3px;
      border-radius: 50px;
      font-size: 11px;
      color: #FFF;
      background: $app-color;
      top: -5px;
      right: -10px;
  }
}
.active{
  color: $app-color;
}
::placeholder{
  // color: #333;
}
.my_search {
  width: 320px;
}
input.form-control:focus{
  border: 2px solid $app-color;
}
@media only screen and (max-width: 991px) {
  .navbar__search {
    display: flex;
    flex-flow: row wrap;

    .nav-item {
      margin-right: 20px;
    }
  }
  .__post {
    display: block;
  }
  .__when_post {
    display: none;
  }
}

</style>
