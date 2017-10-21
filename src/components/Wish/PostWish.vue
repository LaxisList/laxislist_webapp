<template lang="html">
  <router-link tag="div" :to="`/posts/${post.id}`" class="card col-sm-6 col-md-4 mr-3 mb-3 p-0">
    <div class="image__group">
      <i :class="{activeWish: postInWish}" class="fa fa-heart" aria-hidden="true" @click="triggerWish(post.id)"></i>
      <img class="__image" :src="selectedImage" alt="Image">
      <span class="city">{{post.creatorCity}}</span>
    </div>
    <div class="card-body">
      <h4 class="card-title">{{post.title}}</h4>
      <p class="card-text"><small class="text-muted">Posté: {{post.timestamp | date}}</small></p>
      <p class="card-text">{{post.description}}</p>
    </div>
    <div class="card-body">
      <a class="card-link btn price">{{post.price}}{{post.currency | currency}}</a>
      <router-link tag="a" :to="`/posts/${post.id}`" class="btn btn__more">Voir</router-link>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    postInWish () {
      return this.user.registeredWish.findIndex(postId => postId === this.id) >= 0
    },
  },
  methods: {
    removeFromWish (id) {
      this.$store.dispatch('unsaveWish', id)
    }
  }
}
</script>

<style lang="scss" scoped>
$app-color: #ff5a5f;
.image__group {
  position: relative;

  i{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 32px;
    transition: .1s ease-out;

    &:hover{
      color: $app-color;
      cursor: pointer;
    }
    .activeWish {
      color: $app-color;
    }
  }
  .city {
    position: absolute;
    background: black;
    background: rgba(0, 0, 0, .4);
    color: white;
    padding: 5px 10px;
    bottom: 10px;
    left: 10px;
  }
}
img{
  width: 100%;
  border-bottom: .5px solid #eee;
}
.__image{
  height: 200px;
}
a:hover{
  color: #FFF;
}
.card{
  transition: .1s ease-in;
  &:hover{
    box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
}
.price{
  background: #333;
  color: #FFF;
}
button.btn__more{
  margin: 0;
  padding: 6px 8px;
  transition: padding .1s ease-out;
  &:hover{
    transform: scale(1.06);
  }
}
</style>
