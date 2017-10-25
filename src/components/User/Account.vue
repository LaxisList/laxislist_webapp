<template lang="html">
  <div class="container pt-2">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-10 col-md-9">
        <div class="d-flex flex-row justify-content-between align-items-center mb-3">
          <h5 style="font-weight: 300;"><b>Mon compte</b></h5>
          <router-link tag="button" :to="`/user/edit/${user.id}`" class="btn btn__normal" style="font-size: 14px;">Modifier</router-link>
        </div>
        <ul class="list-group">
          <li class="list-group-item">
            <span>Nom de famille:</span>
            <span>{{user.lastname ? user.lastname : ''}}</span>
          </li>
          <li class="list-group-item">
            <span>Prénom:</span>
            <span>{{user.firstname ? user.firstname : ''}}</span>
          </li>
          <li class="list-group-item">
            <span>Nom du business:</span>
            <span>{{user.business ? user.business : ''}}</span>
          </li>
          <li class="list-group-item">
            <span>Email:</span>
            <span>{{user.email ? user.email : ''}}</span>
          </li>
          <li class="list-group-item">
            <span>Téléphone:</span>
            <span>{{user.phoneNumber}}</span>
          </li>
          <li class="list-group-item">
            <span>Sexe:</span>
            <span>{{user.gender}}</span>
          </li>
          <li class="list-group-item">
            <span>Date d'enregistrement:</span>
            <span>{{user.timestamp | date}}</span>
          </li>
          <li class="list-group-item">
            <span>Photo de profil:</span>
            <span>
                <img :src="user.avatar" alt="avatar" height="70px" width="70px" style="border-radius: 50%;">
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
