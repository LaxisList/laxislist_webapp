<template lang="html">
  <div class="container mt-5 mb-5">
    <div class="row" v-if="!goToUserProfile">
      <div class="col-md-3 hidden-sm-down"></div>
      <div class="col-md-6">
        <h4 class="mb-4 mt-3"><b>Créer un nouveau compte</b></h4>
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
        <form @submit.prevent="onSignup" class="mt-2">
          <h6 class="mb-3 mt-3">Email et mot de passe</h6>
          <div class="form-group">
            <input type="email" class="form-control" v-model.trim="email" placeholder="Email" required email>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <input type="password" class="form-control" v-model.trim="password" placeholder="Mot de passe" require password>
            </div>
            <div class="form-group col-md-6">
              <input type="password" class="form-control" v-model.trim="confirmPassword" placeholder="Confimer le mot de passe" require password>
            </div>
          </div>

          <div class="form-group mt-3 __sign_group">
            <div><button class="btn btn__login" type="submit" :disabled="!formIsValid">
              <i class="fa fa-spinner fa-pulse fa-3x fa-fw" v-if="loading" style="font-size: 16px;"></i>
              Continuer
            </button></div>
            <div>
              <small class="ml-md-5">En continuant, vous acceptez nos <router-link tag="a" to="/terms-and-conditions" class="main__color"><b>conditions d'utilisation.</b></router-link></small>
            </div>
          </div>

          <div class="mt-3 mb-5">
            <small>Vous avez un compte? <router-link tag="a" to="/signin" class="__text"><b>Connectez-vous</b></router-link></small>
          </div>
        </form>
      </div>
    </div>

  <div class="row" v-else>
    <div class="col-md-3 hidden-sm-down"></div>
    <div class="col-md-6">
      <h4 class="mb-4 mt-3">Créer votre profil</h4>
      <div v-if="error" class="mb-2">
        <app-alert :alert="error"/>
      </div>
      <form @submit.prevent="onUserProfile">
        <div class="form-row">
          <div class="form-group col-md-6">
            <input type="text" class="form-control" v-model.trim="lastname" placeholder="Nom de famille" required>
          </div>
          <div class="form-group col-md-6">
            <input type="text" class="form-control" v-model.trim="firstname" placeholder="Prénom">
          </div>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model.trim="phoneNumber" placeholder="Téléphone" required>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model.trim="business" placeholder="Nom de l'entreprise ou de la boutique, etc...">
          <small class="text-danger mt-2">
            <i class="fa fa-exclamation-circle mr-1" aria-hidden="true"></i> Votre profil sera au nom de votre business.
          </small>
        </div>
        <div class="form-group d-flex flex-row align-items-center">
          <label class="mr-2">Sexe: </label>
          <select class="custom-select" v-model="gender">
            <option v-for="gender in selectedGender">{{ gender }}</option>
          </select>
        </div>
        <div class="form-group">
          <h6 class="mt-4 mb-5">Ajouter votre photo de profil</h6>
          <div class="d-flex flex-row align-items-center">
            <div class="image__profile">
              <img :src="selectedImage" alt="" width="50%" class="avatar">
            </div>
            <input type="file"
                      style="display: none;"
                      name="fileInput"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFilePicked">
            <button type="button"
                    name="button"
                    @click="onPickFile"
                    class="ml-5 btn btn__normal d-flex align-items-center" style="cursor: pointer;">
            <i class="material-icons mr-1"
               style="font-size: 18px;">add_a_photo</i> Ajouter une photo
            </button>
          </div>
        </div>
        <button class="mt-5 btn btn__login" type="submit" :disabled="!formIsValid">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw" v-if="loading" style="font-size: 16px;"></i>
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { photoPicker } from './PhotoPicker'

export default {
  mixins: [photoPicker],
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      goToUserProfile: false,
      lastname: '',
      firstname: '',
      phoneNumber: '+243',
      business: '',
      gender: 'Homme',
      selectedGender: ['Homme', 'Femme'],
      imageUrl: '',
      image: null,
    }
  },
  computed: {
    formIsValid () {
      if (this.password !== this.confirmPassword) {
        return false
      }
      return true
    },
    comparePasswords () {
        return this.password !== this.confirmPassword ? 'Les mots de passe ne correspondent pas' : ''
    },
    user () {
        return this.$store.getters.user
    },
    error () {
        return this.$store.getters.error
    },
    loading () {
        return this.$store.getters.loading
    },
    selectedImage () {
        return this.imageUrl === '' ? this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' : this.imageUrl
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.goToUserProfile = true
      }
    }
  },
  methods: {
    onSigninWithFacebook () {
      this.$store.dispatch('signInWithFacebook')
    },
    onSigninWithGoogle () {
      this.$store.dispatch('signInWithGoogle')
    },
    onUserProfile () {
        if(!this.firstname || !this.phoneNumber || !this.selectedGender) return
        const newUser = {
            lastname: this.lastname,
            firstname: this.firstname,
            phoneNumber: this.phoneNumber,
            business: this.business,
            gender: this.gender,
            image: this.image !== null ? this.image : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            email: this.email
        }
        this.$store.dispatch('setUserProfile', newUser)
        this.$router.push({path: '/', query: { alert: `Votre compte a été créé. Vous êtes connecté comme ${this.firstname}.`} })
    },
    onSignup () {
        if (this.password !== this.confirmPassword) return
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
  },
  mounted () {
    this.$store.dispatch('clearError')
  },
  created () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.__sign_group{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.avatar{
  height: 100px;
  width: 100px;
  border-radius: 100%;
}
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
    width: 49%;
  }
}
@media only screen and (max-width: 767px) {
  // .__social {
  //   display: flex;
  //   flex-flow: column;
  //   button {
  //     width: 100%;
  //     margin-bottom: 10px;
  //   }
  // }
  .__social {
    justify-content: center;
  }
  .click__sign{
    display: flex;
    flex-direction: column;
    small{
      margin: 10px 0 5px;
    }
    button {
      width: 100%;
    }
  }
  .__sign_group{
    display: flex;
    flex-direction: column;
    .btn__login{
      width: 100%;
    }
    small{
      margin: 10px 0 5px;
    }
  }
}
</style>
