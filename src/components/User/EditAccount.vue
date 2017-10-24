<template lang="html">
  <div class="container pt-2">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-10 col-md-9">
        <div class="d-flex flex-column mb-3">
          <div class="d-flex align-items-center mb-2" @click="$router.back()" style="cursor: pointer;">
            <i class="material-icons mr-1">navigate_before</i>Retour
          </div>
          <h5 style="font-weight: 300;"><b>Modifier mon compte</b></h5>
        </div>
        <ul class="list-group">
          <li class="list-group-item">
            <div>Nom de famille:</div>
            <div><input type="text" v-model.trim="lastname" class="form-control" placeholder="Nom de famille"></div>
          </li>
          <li class="list-group-item">
            <div>Prénom:</div>
            <div><input type="text" v-model.trim="firstname" class="form-control" placeholder="Prénom"></div>
          </li>
          <li class="list-group-item">
            <div>Nom du business:</div>
            <div>
              <input type="text" v-model.trim="business" class="form-control" placeholder="Nom du business">
            </div>
          </li>
          <li class="list-group-item">
            <div>Téléphone:</div>
            <div>
              <input type="text" v-model.trim="phoneNumber" class="form-control" placeholder="Téléphone">
            </div>
          </li>
          <li class="list-group-item">
            <div>Sexe:</div>
            <div>
              <select class="custom-select" v-model="gender">
                <option v-for="gender in selectedGender">{{ gender }}</option>
              </select>
            </div>
          </li>
          <li class="list-group-item">
            <div>Photo de profil:</div>
            <div class="d-flex flex-row align-items-center">
                <img :src="imageUrl"
                      alt="avatar"
                      height="70px"
                      width="70px"
                      style="border-radius: 100%;">
                <!-- picker image input -->
                <input type="file"
                    style="display: none;"
                    name="fileInput"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked">
                    <button @click="onPickFile"
                            class="ml-3 btn btn-warning d-flex align-items-center" style="cursor: pointer; font-size: 14px;">
                    <i class="material-icons mr-1"
                       style="font-size: 18px;">add_a_photo</i> Modifier photo
                    </button>
            </div>
          </li>
        </ul>
        <button class="btn btn-success mt-4 mb-5" @click="onEditUser">Enregistrer</button>
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
      lastname: '',
      firstname: '',
      business: '',
      gender: 'Homme',
      imageUrl: '',
      phoneNumber: '+243',
      image: null,
      selectedGender: ['Homme', 'Femme']
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    onEditUser () {
      const userProfile = {
          lastname: this.lastname,
          firstname: this.firstname,
          phoneNumber: this.phoneNumber,
          business: this.business,
          gender: this.gender,
          image: this.image
      }
      this.$store.dispatch('updateUserProfile', userProfile)
      this.$router.push({path: `/user/account/${this.user.id}`, query: { alert: 'Votre profil a été modifié.'}})
    }
  },
  created () {
    this.lastname = this.user.lastname ? this.user.lastname : ''
    this.firstname = this.user.firstname ? this.user.firstname : ''
    this.business = this.user.business ? this.user.business : ''
    this.phoneNumber = this.user.phoneNumber ? this.user.phoneNumber : '+243'
    this.gender = this.user.gender
    this.imageUrl = this.user.avatar ? this.user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  }
}

// export default {
//   mixins: [photoPicker],
//   data () {
//     return {
//         lastname: this.user.lastname,
//         firstname: this.user.firstname,
//         phoneNumber: this.user.phoneNumber,
//         business: this.user.business,
//         gender: this.user.gender,
//         imageUrl: this.user.avatar,
//         image: null,
//         selectedGender: ['Homme', 'Femme'],
//     }
//   },
//   computed: {
//     user () {
//       return this.$store.getters.user
//     }
//   },
  // methods: {
  //   onEditUser () {
  //     const userProfile = {
  //         lastname: this.lastname,
  //         firstname: this.firstname,
  //         phoneNumber: this.phoneNumber,
  //         business: this.business,
  //         gender: this.gender,
  //         image: this.image
  //     }
  //     this.$store.dispatch('updateUserProfile', userProfile)
  //     this.$router.push({path: '/', query: { alert: 'Votre profil a été modifié.'}})
  //   }
  // }
// }
</script>

<style lang="scss" scoped>
.list-group-item {
  display: flex;
  flex-grow: row wrap;
  justify-content: space-between;
  align-items: center;
}
input[type=text] {
  width: auto;
}
</style>
