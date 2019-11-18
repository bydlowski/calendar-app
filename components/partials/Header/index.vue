<template>
  <header class="columns is-mobile">
    <div class="column is-8 is-offset-2 header">
      <img
        :src="require(`@/static/logo.svg`)"
        class="header-img"
      >
      <font-awesome-icon
        :icon="['fas', 'smile']"
        size="2x"
        class="has-text-grey-light"
      />
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

<style lang="scss" scoped>
  .header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin-bottom: -20px;

    &-img {
      height: 30px;
    }
  }
</style>
