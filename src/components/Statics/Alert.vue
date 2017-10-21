<template lang="html">
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <i class="fa fa-exclamation-triangle mr-2" aria-hidden="true"></i>
    {{alert}}
  </div>
</template>

<script>
export default {
  props: ['alert']
}
</script>

<style lang="css">
</style>
