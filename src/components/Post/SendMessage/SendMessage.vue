<template lang="html">
  <div class="">
    <button type="button" class="btn btn__message ml-2"  v-if="!userIsAuthenticated">Connectez-vous pour écrire à l'hôte</button>
    <button type="button" class="btn btn__message ml-2" @click="sendMessage" v-else>Ecrire à l'hôte</button>
    <div class="modal sendMessageModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <b>Envoyer le message à {{post.creatorName}}</b>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea v-model.trim="message" placeholder="Ecrivez votre message " rows="4" class="form-control"></textarea>
          </div>
          <div class="modal-footer">
            <button
            type="button"
            class="btn btn__message"
            @click.prevent="onSendMessage">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw" v-if="loading" style="font-size: 16px;"></i>
            Envoyer
          </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          </div>
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
        message: ''
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      sendMessage () {
        $('.sendMessageModal').modal('show')
      },
      onSendMessage () {
        if (this.message.trim() == '') return
        const newMessage = {
          content: this.message,
          postId: this.post.id,
          creatorId: this.post.creatorId,
          creatorName: this.post.creatorName,
          creatorPhoneNumber: this.post.creatorPhoneNumber
        }
        this.$store.dispatch('sendMessageToCreator', newMessage)
        $('.sendMessageModal').modal('hide')
      }
    }
  }
</script>

<style lang="scss" scoped>
$app-color: #3498db;
.btn {
  cursor: pointer;
}
.btn__message{
  background: none;
  color: $app-color;
  border: 2px solid $app-color;
}
textarea {
  resize: none;
  border: 2px solid $app-color;
}
</style>
