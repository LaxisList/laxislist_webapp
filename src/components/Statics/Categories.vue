<template lang="html">
  <div class="container-fluid mb-5" v-if="categories.length > 1">
    <div class="__categories text-center align-items-center">
      <div class="eachCat d-flex flex-column justify-content-center" v-for="category in categories">
        <div class="">
          <img :src="`https://firebasestorage.googleapis.com/v0/b/laxislist.appspot.com/o/categories%2F${category.image}.png?alt=media&token=45d8dde8-7f17-4fef-8236-c171a87a4893`" alt="" class="mb-1" v-if="category.image">
        </div>
        <div class="">
          <h6><b>{{category.name}}</b></h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectedCategory'],
  data () {
    return {

      categories: [
        // {name: 'Accessoires', image: 'icon-cat-tools4x'},
        {name: 'Appareils photo', image: 'icon-cat-photo4x'},
        {name: 'Automobile', image: 'icon-cat-auto4x'},
        // {name: 'Beautés', image: 'icon-cat-beauty4x'},
        // {name: 'Bricolades', image: 'icon-cat-handmade4x'},
        // {name: 'Business', image: 'icon-cat-business4x'},
        {name: 'Electromenagers', image: 'icon-cat-appliance4x'},
        {name: 'Electroniques', image: 'icon-cat-electronics4x'},
        {name: 'Femme', image: 'icon-cat-wclothes4x'},
        {name: 'Homme', image: 'icon-cat-mclothes4x'},
        {name: 'Jeux vidéos', image: 'icon-cat-games4x'},
        // {name: '', image: 'icon-cat-kids4x'},
        {name: 'Maisons', image: 'icon-cat-home4x'},
        {name: 'Ordinateurs', image: 'icon-cat-pc4x'},
        // {name: '', image: 'icon-cat-pets4x'},
        // {name: '', image: 'icon-cat-realty4x'},
        // {name: 'Services', image: 'icon-cat-services4x'},
        {name: 'Smartphones', image: 'icon-cat-gadgets4x'},
        // {name: 'Sport', image: 'icon-cat-sport4x'},
        // {name: 'Enfant', image: 'icon-cat-kidswear4x'},
        {name: 'Autres', image: 'icon-cat-other4x'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width: 40px;
}
h6{
  font-size: 14px;
}
.eachCat{
  padding: 5px;
  margin-right: 20px;
  cursor: pointer;
  transition: width .1 ease-out;

  &:hover{
    transform: scale(1.1);
  }
}
.__categories{
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}
.container-fluid{
  margin-left: 30px;
}
@media only screen and (max-width: 767px) {
  .container-fluid{
    display: none;
  }
}
@media (min-width: 1200px) {
  .__categories{
    justify-content: center;
  }
}
</style>
