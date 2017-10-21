<template lang="html">
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 hidden-sm-down"></div>
      <div class="col-md-6">
        <h4 class="mb-4 mt-3"><b>Se connecter</b></h4>
        <div class="__popup">
          <div class="__social">
            <button class="btn btn-danger mr-3" @click="onSigninWithGoogle">
              <i class="fa fa-google mr-2" aria-hidden="true" style="color: #FFF; font-size: 20px;"></i> Google
            </button>
            <button class="btn btn-primary" @click="onSigninWithFacebook">
              <i class="fa fa-facebook-official mr-2" aria-hidden="true" style="color: #FFF; font-size: 20px;"></i> Facebook
            </button>
          </div>
        </div>
        <div v-if="error" class="mb-2">
          <app-alert :alert="error"/>
        </div>
        <form @submit.prevent="onSignin">
          <h6 class="mb-3 mt-3"><b>Email et mot de passe</b></h6>
          <div class="form-group row">
            <div class="col-sm-10">
              <input type="email"
                     class="form-control"
                     placeholder="Email"
                     v-model.trim="email">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <input type="password"
                     class="form-control"
                     placeholder="Mot de passe"
                     v-model.trim="password">
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-10">
              <button type="submit"
                      class="btn btn__login click__sign"
                      :disabled="!formIsValid">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"
                   v-if="loading"
                   style="font-size: 16px;"></i>
                Se connecter
              </button>
            </div>
          </div>
          <div class="mt-3 mb-5">
            <small>Vous n'avez pas un compte? <router-link tag="a" to="/signup" class="__text"><b>Inscrivez-vous</b></router-link></small>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    formIsValid () {
      return this.email.trim() !== '' && this.password.trim() !== ''
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) { // user's computed property gets back a value
      if (value !== null && value !== undefined) {
        this.$router.push({path: '/', query: { alert: 'Vous êtes connecté.'} })
      }
    }
  },
  methods: {
    onSignin () {
      if(!this.formIsValid) return
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUserIn', user)
    },
    onSigninWithFacebook () {
      return this.$store.dispatch('signInWithFacebook')
    },
    onSigninWithGoogle () {
      return this.$store.dispatch('signInWithGoogle')
    },
  },
  mounted () {
    this.$store.dispatch('clearError')
  }
}
</script>

<style lang="scss" scoped>
h6, h3, h4, small {
  font-weight: 300;
}
.__social {
  display: flex;
  flex-direction: row;
  // justify-content: center;

  button {
    // margin-right: 20px;
    cursor: pointer;
    margin-bottom: 20px;
    width: 40%;
  }
}
@media only screen and (max-width: 767px) {
  // .__social {
  //   display: flex;
  //   flex-flow: column;
  //   button {
  //     margin-bottom: 10px;
  //   }
  // }
  .click__sign{
    width: 100%;
    // align-items: center;
  }
}
</style>
