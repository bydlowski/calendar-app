<template>
  <main>
    <Header />
    <SlideShow v-if="loaded" />
    <section v-if="loaded" class="columns m-t-xl">
      <div class="column is-3">
        <FilterList :events="events.result" />
      </div>
      <div class="column is-9">
        <EventList :events="events.result" />
      </div>
    </section>
    {{ events }}
  </main>
</template>

<script>
// import jsonEvents from '~/events.json'
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
      // loaded: false
      // events: null
      loadingComponent: null
    }
  },
  // async fetch ({ store, params }) {
  //   await store.dispatch('getEventsFromApi')
  //   // .then(await store.dispatch('purchase/getPlanDueDates'))
  // },
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
    // this.events = jsonEvents
    this.$store.dispatch('events/getEventsFromApi')
  },
  mounted () {
    this.loadingComponent = this.$buefy.loading.open({
      container: null
    })
  }
}
</script>
