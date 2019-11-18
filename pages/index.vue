<template>
  <main>
    <Header v-if="loaded" />
    <SlideShow v-if="loaded" />
    <section v-if="loaded" class="columns m-t-xl">
      <div class="column is-3">
        <FilterList :events="events.result" />
      </div>
      <div class="column is-9">
        <EventList :events="events.result" />
      </div>
    </section>
  </main>
</template>

<script>
import Header from '~/components/partials/Header'
import SlideShow from '~/components/partials/SlideShow'
import FilterList from '~/components/partials/FilterList'
import EventList from '~/components/partials/EventList'
export default {
  name: 'HomePage',
  components: {
    Header,
    SlideShow,
    FilterList,
    EventList
  },
  data () {
    return {
      loadingComponent: null
    }
  },
  computed: {
    events () {
      return this.$store.state.events.allEvents
    },
    loaded () {
      return this.$store.state.events.loaded
    }
  },
  watch: {
    loaded () {
      // const loadingComponent = this.$buefy.loading.open({
      //   container: null
      // })
      // this.$store.dispatch('user/setStateFromLocalStorage')
      // this.$store.dispatch('tags/initiateTags', this.events)
      // setTimeout(() => {
      //   this.loaded = true
      //   loadingComponent.close()
      // }, 1000)
      // this.loaded = true
      this.$store.dispatch('user/setStateFromLocalStorage')
      this.$store.dispatch('tags/initiateTags', this.events)
      setTimeout(() => {
        this.loadingComponent.close()
      }, 500)
    }
  },
  created () {
    this.$store.dispatch('events/getEventsFromApi')
  },
  mounted () {
    this.loadingComponent = this.$buefy.loading.open({
      container: null
    })
  }
}
</script>
