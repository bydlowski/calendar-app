<template>
  <header class="columns">
    <div class="column is-8 is-offset-2">
      Header
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      name: 'Pedro Bydlowski',
      subtitle: 'Front-end developer',
      textLoaded: false
    }
  },
  mounted () {
    this.textLoaded = true
  }
}
</script>

<style scoped>

</style>
