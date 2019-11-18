<template>
  <section>
    <client-only>
      <flickity ref="flickity" :options="flickityOptions">
        <div
          v-for="highlight in highlights"
          :key="highlight.title"
          :style="{ backgroundColor: highlight.bg }"
          class="carousel-cell is-center-flex"
        >
          <p class="title is-4">
            {{ highlight.title }}
          </p>
        </div>
      </flickity>
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'SlideShow',
  data () {
    return {
      highlights: [
        {
          title: 'Highlight event 1',
          bg: '#00BD9D'
        },
        {
          title: 'Highlight event 2',
          bg: '#F0D2D1'
        },
        {
          title: 'Highlight event 3',
          bg: '#F6EFA6'
        }
      ],
      flickityOptions: {
        initialIndex: 0,
        autoPlay: true,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .carousel-cell {
    width: 66%;
    height: 400px;
    margin-right: 10px;
    background: #8C8;
    border-radius: 5px;
    counter-increment: carousel-cell;
  }
</style>
