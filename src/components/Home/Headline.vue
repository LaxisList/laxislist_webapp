<template lang="html">
  <div class="row mb-4 mb-xs-5 mb-sm-5 text-justify">
    <div class="col-sm-10 col-md-7">
      <h1 class="__name"><b>LaxisList.</b></h1>
      <!-- <p class="mb-3 __text"><b>Comparez et trouvez vos coups de cœur.</b><br></p> -->
      <p><b>Retrouvez</b> tout ce que vous désirez acheter, <b>comparez</b> les prix puis <b>contactez l'hôte</b>. <b>Faites de l'argent</b> en publiant vous aussi.</p>
      <router-link tag="button" to="/post/new" class="mt-4 btn btn__normal d-flex align-items-center">Publier maintenant <i class="material-icons ml-1">arrow_forward</i></router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.__name{
  font-size: 48px;
  font-weight: 300;
}
.btn__normal{
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
}
p{
  font-weight: 300;
  font-size: 18px;
}
@media only screen and (max-width: 767px) {
  .__name{
    font-size: 38px;
  }
}
</style>
