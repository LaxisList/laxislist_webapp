<template lang="html">
  <div class="container-fluid fixed-bottom mt-5">
    <div class="container">
      <div class="__footer">
        <div class="">
          <ul class="list-inline">
            <router-link to="/" tag="li" class="list-inline-item text"><a><b>Accueil</b></a></router-link>
            <router-link to="/terms-and-conditions" tag="li" class="list-inline-item text"><a><b>Conditions d'utilisation</b></a></router-link>
            <!-- <router-link to="/about" tag="li" class="list-inline-item text"><strong>À propos</strong></router-link> -->
            <router-link to="/contact-us" tag="li" class="list-inline-item text"><a style="text-decoration: none;"><b>Contact</b></a></router-link>
          </ul>
        </div>
        <div class="">
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="https://fb.me/LaxisList" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
            </li>
            <li class="list-inline-item">
              <a href="#" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
            </li>
            <li class="list-inline-item">
              <a href="https://twitter.com/LaxisList" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.__footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.fixed-bottom{
  background: white;
  z-index: 30;
  // border-top: .5px solid #eee;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.12), 1px 0 2px rgba(0, 0, 0, 0.24);
  padding-top: 15px;
}
.text{
  margin-right: 20px;
}
i{
  margin-left: 10px;
}
.fa {
  color: #333;
  font-size: 28px;
}
.list-inline-item {
  cursor: pointer;
}
a{
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
  }
}
// Small devices (landscape phones, 576px and up)
@media only screen and (max-width: 767px) {
  .__footer{
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
    padding: 0;
  }
  .fa {
    font-size: 24px;
  }
}
</style>
