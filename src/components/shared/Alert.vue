<template>
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    {{text}}
    <button type="button" class="close" aria-label="Close" @click="onClose">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      // this.$emit('dismissi')
      this.$store.dispatch('clearErro')
    }
  }
}
</script>
