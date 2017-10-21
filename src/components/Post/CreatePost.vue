<template lang="html">
  <div class="container mt-4 mb-5">
    <div class="row">
      <div class="col-md-3 hidden-sm-down"></div>
      <div class="col-md-6">
        <h4 class="mb-4 mt-3">
          Postez votre publication
        </h4>
        <div v-if="errorMessage" class="mb-2">
          <app-alert :alert="errorMessage"/>
        </div>
        <form @submit.prevent="onCreatePost">
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   v-model.trim="title"
                   placeholder="Nom de l'article, à vendre ou à louer"
                   required>
          </div>

          <div class="form-row align-items-center">
            <div class="pl-2 mr-3 form-group">
              <input type="number"
                     class="form-control"
                     v-model.trim="price"
                     placeholder="Prix"
                     required>
            </div>

            <div>
              <label class="custom-control custom-radio">
                <input id="radio1" name="radio" type="radio" class="custom-control-input" v-model="currency" value="usd">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">$US</span>
              </label>
              <label class="custom-control custom-radio">
                <input id="radio2" name="radio" type="radio" class="custom-control-input" v-model="currency" value="cdf">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">FC</span>
              </label>
              <label class="custom-control custom-radio">
                <input id="radio2" name="radio" type="radio" class="custom-control-input" v-model="currency" value="euro">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">€</span>
              </label>
              <label class="custom-control custom-radio">
                <input id="radio2" name="radio" type="radio" class="custom-control-input" v-model="currency" value="fcfa">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">FCFA</span>
              </label>
            </div>
          </div>

          <!-- categories -->
          <!-- <div class="form-group d-flex flex-row align-items-center">
            <h6 class="mr-2">Sélectionner les categories:</h6>
            <div class="btn-group">
            <button type="button" class="btn btn_outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <div class="dropdown-item" v-for="i in 20" :key="i">
                <label class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">Hotel</span>
                </label>
              </div>
              <span class="p-3">Ajouter catégorie</span>
            </div>
          </div>
          </div> -->



          <div class="form-group">
            <textarea name="name" class="form-control" v-model.trim="description" placeholder="Description" rows="3" cols="20" required></textarea>
            <small class="text-danger mt-2">
              <i class="fa fa-exclamation-circle mr-1" aria-hidden="true"></i> Maximum 160 characterès.
            </small>
          </div>

          <div class="form-group">
            <textarea name="name" class="form-control" v-model.trim="details" placeholder="Détails" rows="8" cols="40"></textarea>
            <small class="text-danger mt-2">
              <i class="fa fa-exclamation-circle mr-1" aria-hidden="true"></i> Expliquez votre produit, votre annonce ou ce que vous vendez en détail.
            </small>
          </div>

          <div class="form-group mt-4 mb-2">
            <h6 class="mr-2"><b>Ajouter des images</b></h6>
            <small class="text-danger"><i class="fa fa-exclamation-circle mr-1" aria-hidden="true"></i> Maximum 10 images</small>
            <div class="d-flex align-items-center flex-column">
              <input type="file"
                        style="display: none;"
                        name="fileInput"
                        ref="fileInput"
                        accept="image/*"
                        @change="onFilePicked"
                        multiple
                        required>
              <button type="button"
                      name="button"
                      @click="onPickFile"
                      class="mt-4 mb-4 btn btn_outline d-flex align-items-center">
                <i class="material-icons mr-1" style="font-size: 18px;">add_a_photo</i>
                Ajouter une image
              </button>
            </div>
          </div>

          <!-- <div class=""> -->
            <div class="d-flex flex-row __imageDownloads" >
              <div v-for="(imageUrl, i) in imageURLs" class="single__image">
                <img :src="imageUrl"
                    alt="Image"
                    class="rounded mb-3 mr-3"
                    v-if="imageUrl"
                    style="max-width: 120px; max-height: 100px;">
                    <i class="material-icons" @click="remove(i)" style="cursor: pointer; font-size: 22px;">remove_circle</i>
              </div>
            </div>
          <!-- </div> -->

          <div class="form-group row mt-4">
            <div class="col-sm-10">
              <button type="submit" class="btn btn__login">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="font-size: 16px;"
                   v-if="loading"></i>
                Poster
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  data () {
    return {
      title: '',
      price: '',
      description: '',
      details: '',
      imageURLs: [],
      images: [],
      currency: 'cdf',
      errorMessage: null,
      selectedCategories: []
    }
  },
  computed: {
    categories () {
      return this.$store.getters.categories
    },
    loading () {
      return this.$store.getters.loading
    },
    formIsValid () {
      if (this.title.trim() === '' || this.description.trim() === '' || this.details.trim() === '') {
        return false
      }
      return true
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    user () {
      return this.$store.gettes.user
    }
  },
  watch: {
    description (value) {
      if (value.length >= 160) {
        return alert('La brêve description ne doit contenir que 160 charactères.') // to review
      }
    }
  },
  methods: {
    remove (i) {
      return this.imageURLs.splice(i, 1)
    },
    onCreatePost () {
      if(!this.description || !this.price || !this.title || !this.images) return

      const post = {
        title: this.title,
        price: this.price,
        description: this.description,
        details: this.details,
        images: this.images,
        currency: this.currency,
        categories: this.selectedCategories
      }
      this.$store.dispatch('createPost', post)
      this.$router.push({path: '/', query: { alert: 'Votre post a été publié.'} })
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (e) {
      if (this.images.length >= 10) {
        return alert("Le nombre des images atteints! Supprimer les images pour ajouter d'autres.")
      }

      const files = e.target.files
      let filename = files[0].name

      let imageYet = this.images.find(image => image.name === filename)

      if (imageYet) return

      if (files[0].size / 1024 > 1024) {
        return alert('La photo téléchargée est trop grande. Veuillez réessayez avec une photo de petite taille, maximum 1MB.')
      }
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Photo invalide. Veuillez réessayez avec une autre photo.')
      }

      const fileReader = new FileReader()
        fileReader.readAsDataURL(files[0])
        fileReader.addEventListener('load', () => {
          this.imageURLs.push(fileReader.result)
        })
        this.images.push(files[0])
     },
  }, 
  created () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
$app-color: #3498db;
.btn_outline{
  background: none;
  border: 2px solid $app-color;
  color: $app-color;
}
input[type=number].form-control{
  width: 110px;
}
h6{
  margin: 0;
  font-size: 17px;
}
.__imageDownloads{@click="remove(i)"
  display: flex;
  flex-flow: row wrap;
}
.single__image{
  position: relative;

  i{
    font-size: 42px;
    position: absolute;
    top: -10px;
    right: 8px;
    z-index: 2;
    color: #c0392b;
  }
}
</style>
