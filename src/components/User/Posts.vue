<template lang="html">
  <div class="container">
    <!-- <div class="row">
      <div class="col-sm-9">
        <div class="row">
          <div class="card col-sm-5 col-md-5 p-0" v-for="post in posts" :key="post.id">
            <div class="no_picture" v-if="!post.imageURLs">
              <i class="material-icons">photo</i>
            </div>
            <div class="imageURLs" v-else>
              <img class="card-img-top __image" :src="selectedImage" alt="Card image cap" v-if="post.imageURLs" style="background: #bdc3c7;">
              <div class="imageURLsSize"><i class="material-icons mr-1">camera_alt</i>{{imageURLsSize}}</div>
            </div>
            <div class="card-body">
              <h5 class="card-title mb-0">{{post.title}}</h5>
              <p class="mb-0"><small class="card-subtitle text-muted">Posté: {{post.timestamp | date}}</small></p>
              <p class="card-text">{{post.description}}</p>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <router-link tag="a" :to="`/posts/${post.id}`" class="btn btn__more">Voir</router-link>
                <a class="card-link __price" style="font-size: 18px;"><b>{{post.price}}{{post.currency | currency}}</b></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 hidden-sm-and-down">
        <!-- ads -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    posts () {
      return this.$store.getters.loadedUserPosts(this.user.id)
    }
  },
  methods: {
    loadSinglePost (id) {
      return this.$router.push(`/posts/${id}`)
    },
  }
}
</script>

<style lang="scss" scoped>
// $app-color: #ff5a5f;
$app-color: #3498db;
.card {
  margin: 0 20px 20px 0px;
}
.imageURLs {
  position: relative;

  .imageURLsSize {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgba(0,0,0,.6);
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 14px;
    color: #FFF;

    i {
      font-size: 18px;
    }
  }
}
.__author {
  margin-top: -5px;
}
.no_picture {
  background: #000;
  background: rgba(0,0,0,.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 200px;

  i {
    font-size: 62px;
    color: #FFF;
  }
}

img{
  width: 100%;
  border-bottom: .5px solid #eee;
}
.__image{
  max-height: 200px;
}
a:hover{
  color: #FFF;
}
.card{
  transition: .1s ease-in;
  &:hover{
    // box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.08);
    // border: 2px solid $app-color;
    box-shadow: 0 10px 40px 0 rgba(62, 57, 107, 0.07), 0 2px 9px 0 rgba(62, 57, 107, 0.06);
    cursor: pointer;
  }
}
button.btn__more{
  margin: 0;
  padding: 6px 8px;
  transition: padding .1s ease-out;
  &:hover{
    transform: scale(1.06);
  }
}
@media only screen and (max-width: 767px) {

}
</style>
