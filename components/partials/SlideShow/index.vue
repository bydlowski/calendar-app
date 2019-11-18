<template>
  <section>
    <client-only>
      <flickity ref="flickity" :options="flickityOptions">
        <div
          v-for="highlight in highlights"
          :key="highlight.name"
          :style="{ backgroundImage: `url(${highlight.cover})` }"
          :title="`Learn more about the event ${highlight.name}`"
          @click="openEventModal(highlight)"
          class="carousel-cell is-pointer"
        >
          <span class="overlay" />
          <div class="content m-b-lg has-text-centered">
            <p class="title is-3 has-text-white m-b-xs">
              {{ highlight.name }}
            </p>
            <p class="title is-5 has-text-white">
              {{ highlight.startDate | moment("MMMM Do YYYY") }}
            </p>
          </div>
        </div>
      </flickity>
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'SlideShow',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      highlights: [],
      flickityOptions: {
        initialIndex: 0,
        // autoPlay: true,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        draggable: false
      }
    }
  },
  created () {
    this.highlights = this.events
      .filter(event => event.promoted)
      .map(event => ({
        id: event.id,
        name: event.name,
        cover: event.cover,
        startDate: event.startDate
      }))
  },
  methods: {
    openEventModal (highlight) {
      const event = this.events.find(event => event.id === highlight.id)
      this.$store.dispatch('modal/openEventModal', event)
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
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(17,17,17,0.9570203081232493) 0%, rgba(17,17,17,0.654499299719888) 60%, rgba(255,255,255,0.052258403361344574) 100%);
  }
  .content {
    z-index: 15;
  }
</style>
