<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-9">
        <div class="mb-3 d-flex align-items-center" @click="$router.back()" style="cursor: pointer;">
          <i class="material-icons mr-1">navigate_before</i>Retour
        </div>
        <div class="__header mb-2 d-flex flex-row justify-content-between align-items-center">
          <h5 class="post__title">{{postTitle}}</h5>
          <!-- <button type="button" name="button" @click.prevent="shareOnFacebook" class="btn">Partagez sur Facebook</button> -->
        </div>

        <app-lightbox :post="post"/>

        <div class="__creatorInfo">
          <div class="mb-3 d-flex align-items-center">
            <i class="material-icons mr-1">date_range</i>
            <span class="mr-1">Posté :</span> <b>{{post.timestamp | date}}</b>
          </div>
          <div class="__description mb-3">
            <h5 class="
            mb-2">Description :</h5>
            <p>{{post.description}}</p>
          </div>
          <div class="__host d-flex flex-column mb-4 mt-4">
            <div class="d-flex align-items-center">
              <img :src="post.creatorAvatar" alt="" class="avatar mr-3" v-if="post.creatorAvatar">
              <!-- <div v-if="post.creatorBusiness"><b>Hôte: {{post.creatorBusiness}}</b></div> -->
              <div><b>Hôte: {{post.creatorName}}</b></div>
            </div>
            <div class="d-flex flex-row mt-3">
              <button class="btn btn__normal mr-3" @click="callCreator = !callCreator">{{ callCreator !== true ? 'Voir numéro' : post.creatorPhoneNumber}}</button>
              <app-send-message :post="post"/>
            </div>
          </div>
        </div>
        <hr>

        <div class="mt-3 mb-5" v-if="post.details">
          <h5 class="mb-2">Détails :</h5>
          <p>{{post.details}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLightbox from './Lightbox'
import AppSendMessage from './SendMessage/SendMessage'

export default {
  props: ['id'],
  data () {
    return {
      callCreator: false
    }
  },
  computed: {
    postInWish () {
      return this.user.registeredWish.findIndex(postId => postId === this.id) >= 0
    },
    post () {
      return this.$store.getters.loadedSinglePost(this.id)
    },
    postTitle () {
      return _.capitalize(this.post.title);
    },
    user () {
      return this.$store.getters.user
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (this.userIsAuthenticated) {
        return this.post.creatorId === this.user.id
      }
    }
  },
  methods: {
    triggerWish () {
       if (this.postInWish) {
         this.$store.dispatch('unsaveWish', this.id)
       }else{
         this.$store.dispatch('saveWish', this.id)
       }
     },
     shareOnTwitter () {
       let postUrl = `https://www.laxislist.com/posts/${this.post.id}`
       let shareUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(this.post.title)}"&via=LaxisList&url="${encodeURIComponent(postUrl)}"`

       this.popupCenter(shareUrl, `Partagez sur Twitter`)
     },
     shareOnFacebook () {
       let postUrl = `https://www.laxislist.com/posts/${this.post.id}`
       let shareUrl = `https://wwww.facebook.com/sharer/sharer.php?u="${postUrl}"`
       this.popupCenter(shareUrl, `Partagez sur Facebook`)
     },
     popupCenter (url, title, width, height) {
       let popupWidth = width || 640
       let popupHeight = height || 320
       let left = window.screenLeft || window.screenX
       let top = window.screenTop || window.screenY
       let windowWidth = window.innerWidth || document.documentElement.clientWidth
       let windowHeight = window.innerHeight || document.documentElement.clientHeight
       let popupLeft = left + windowWidth / 2 - popupWidth / 2
       let popupTop = top + windowHeight / 2 - popupHeight / 2

       return window.open(url, title, `scrollbars=yes, width=${popupWidth}, height=${popupHeight}, top=${popupTop}, left=${popupLeft}`)
     }
  },
  components: {
    AppLightbox,
    AppSendMessage
  },
  created () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.avatar{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #999;
}
i.fa{
  font-size: 32px;
}
</style>
