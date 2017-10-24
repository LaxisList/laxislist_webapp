<template>
  <div id="app">
    <app-header/>
    <div class="main">
      <router-view></router-view>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from '@/components/Statics/Header'
import AppFooter from '@/components/Statics/Footer'

export default {
  name: 'app',
  created () {
    window.scrollTo(0, 0)
  },
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss">
$app-color: #2980b9;

html, body {
  box-sizing: border-box;
  margin: 0;
  overflow-x: hidden;
  word-wrap: break-word;
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-weight: 300;
  // background-color: #f6f6f6;
}
.main {
  margin: 100px 0 200px 0;
}
a {
  text-decoration: none;
  cursor: pointer;
}
.__text {
  color: $app-color;
}
.btn__normal, .btn__more, .btn__login, {
  background: #333;
  color: white;
  cursor: pointer;
}
button {
  cursor: pointer;
}
.form-control {
  font-weight: 300;
}
</style>
