<template lang="html">
  <div class="mt-1 mb-5">
    <div class="row mb-3">
      <div class="col-sm-12 __thumbnail">
        <i class="material-icons __no-picture" v-if="!selectedImage">photo</i>
        <img :src="selectedImage" alt="" class="__mainImage">
        <div class="__price">
          <b>{{post.price}}{{post.currency | currency}}</b>
        </div>
        <div class="previous" @click="previous"><i class="__chevron __chevron_left material-icons">chevron_left</i></div>
        <div class="next" @click="next"><i class="__chevron __chevron_right material-icons">chevron_right</i></div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 __image-sub">
        <div class="__mini" v-for="image in imageURLs">
          <img :src="image" class="rounded" alt="Image" @click="imageSelected(image)" :class="{active: image === selectedImage}" width="100%" height="100%">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      selectedImage: '',
      index: 0,
    }
  },
  computed: {
    imageURLsCount () {
      return this.imageURLs.length
    },
    imageURLs () {
      return Object.values(this.post.imageURLs)
    }
  },
  methods: {
    imageSelected (selectedImage) {
      return this.selectedImage = selectedImage
    },
    previous () {
      // for (let i = 0; i < this.imageURLsCount; i--) {
      //   this.selectedImage = this.imageURLs[i]
      // }
    },
    next () {
      // for (let i = 0; i < this.imageURLsCount; i++) {
      //   this.selectedImage = this.imageURLs[i]
      // }
    }
  },
  created () {
    this.selectedImage = this.imageURLs[0]
  }
}
</script>

<style lang="scss" scoped>
$app-color: #3498db;
.__chevron {
  position: absolute;
  top: 45%;
  cursor: pointer;
  font-size: 38px;
  font-weight: lighter;
  background-color: #000;
  background: rgba(0,0,0,.5);
  color: #FFF;
  border-radius: 50%;
  transition: color .1s ease-in forwards;

  &:hover {
    color: $app-color;
  }
}
.__chevron_right {
  right: 15px;
}
.__chevron_left {
  left: 15px;
}

.__image-sub {
  display: flex;
  flex-flow: row wrap;
}
.__thumbnail{
  position: relative;
  background-color: #000;
  background-color: rgba(0, 0, 0, .85);
  display: flex;
  justify-content: center;

  .__price, .__wish{
    position: absolute;
    top: 20px;
    font-size: 18px;
  }
  .__price{
    right: 0px;
    padding: 8px 10px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    color: #FFF;
    background: $app-color;
  }
  .__wish{
    left: 20px;
  }
}
.__mini{
  max-width: 10%;
  max-height: 65px;
  border-radius: 4px;
  background: #888;
  margin: 1% 1% 1% 0;
  cursor: pointer;
  transition: height .1s ease-out;
  .active{
    border: 3px solid $app-color;
    transform: scale(1.05);
  }
}
.__mainImage {
  background: #000;
  background: rgba(0,0,0,.85);
  max-width: 100%;
  height: 40vh;
  max-height: 40vh;
}
i{
  font-size: 32px;
  color: #333;
  cursor: pointer;
  transition: color .1s ease-in;
  &:hover, &.active{
    color: #FFF;
    color: $app-color;
  }
}
.__no-picture {
  text-align: center;
  vertical-align: middle;
  font-size: 64px;
  padding-top: calc(30% - 164px);
  color: #FFF;
  cursor: auto;

  &:hover {
    color: #FFF;
  }
}
@media only screen and (max-width: 767px) {
  .__no-picture {
    padding-top: 30%
  }
  .__price{
    right: 0px;
  }
  .__mainImage {
    max-width: 100%;
    max-height: 40vh;
  }
  .__mini{
    max-width: 18%;
    max-height: 60px;
    margin-right: 1%;
  }
}
</style>
