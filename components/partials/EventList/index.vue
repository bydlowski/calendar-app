<template>
  <div class="m-r-lg m-l-lg">
    <p v-if="upcomingEvents.length" class="title is-2">
      Upcoming Events
    </p>
    <div class="columns is-multiline">
      <Event
        v-for="event in upcomingEvents"
        :key="`Upcoming ${event.id}`"
        :content="event"
      />
    </div>
    <p
      v-if="deadlineClosed.length"
      class="title is-2"
    >
      Events with closed application
    </p>
    <div class="columns is-multiline">
      <Event
        v-for="event in deadlineClosed"
        :key="`Deadline closed ${event.id}`"
        :content="event"
      />
    </div>
    <div
      v-if="filteredEvents.length === 0"
      class="is-vertical-center-flex"
    >
      <font-awesome-icon :icon="['fas', 'times-circle']" size="lg" />
      <p class="title is-4 m-l-sm">
        No events were found with these tags
      </p>
    </div>
    <Modal v-if="idModalOpen" />
  </div>
</template>

<script>
import moment from 'moment'
import Event from '~/components/elements/Event'
import Modal from '~/components/elements/Modal'
export default {
  name: 'EventList',
  components: {
    Event,
    Modal
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      filteredEvents: [],
      upcomingEvents: [],
      deadlineClosed: [],
      passedEvents: []
    }
  },
  computed: {
    idModalOpen () {
      return this.$store.state.modal.modalOpen
    },
    activeTypeTags () {
      return this.$store.state.tags.activeTypeTags
    },
    activeLocationTags () {
      return this.$store.state.tags.activeLocationTags
    },
    activeApplicationTagValue () {
      return this.$store.state.tags.activeApplicationTagValue
    },
    activeStartTagValue () {
      return this.$store.state.tags.activeStartTagValue
    },
    onlyFavorites () {
      return this.$store.state.tags.onlyFavorites
    },
    favorites () {
      return this.$store.state.user.favorites
    }
  },
  watch: {
    activeTypeTags () {
      this.getFilteredEvents()
      this.sortEvents(this.filteredEvents)
    },
    activeLocationTags () {
      this.getFilteredEvents()
      this.sortEvents(this.filteredEvents)
    },
    activeApplicationTagValue () {
      this.getFilteredEvents()
      this.sortEvents(this.filteredEvents)
    },
    activeStartTagValue () {
      this.getFilteredEvents()
      this.sortEvents(this.filteredEvents)
    },
    onlyFavorites () {
      this.getFilteredEvents()
      this.sortEvents(this.filteredEvents)
    },
    favorites () {
      this.getFilteredEvents()
      this.sortEvents(this.filteredEvents)
    }
  },
  created () {
    this.getFilteredEvents()
    this.sortEvents(this.filteredEvents)
  },
  methods: {
    getFilteredEvents () {
      const now = new Date()
      const lastApplicationDate = moment(now).add(this.activeApplicationTagValue, 'days')
      const lastStartDate = moment(now).add(this.activeStartTagValue, 'days')
      if (this.onlyFavorites) {
        if (!this.favorites) {
          this.filteredEvents = []
        } else {
          this.filteredEvents = this.events
            .filter(event => this.favorites.includes(event.id))
            .filter(event => this.activeTypeTags.includes(event.type))
            .filter(event => this.activeLocationTags.includes(event.city))
            .filter(event => moment(event.endApplicationDate).isBefore(lastApplicationDate))
            .filter(event => moment(event.startDate).isBefore(lastStartDate))
        }
      } else {
        this.filteredEvents = this.events
          .filter(event => this.activeTypeTags.includes(event.type))
          .filter(event => this.activeLocationTags.includes(event.city))
          .filter(event => moment(event.endApplicationDate).isBefore(lastApplicationDate))
          .filter(event => moment(event.startDate).isBefore(lastStartDate))
      }
    },
    sortEvents (events) {
      this.passedEvents = []
      this.deadlineClosed = []
      this.upcomingEvents = []
      const now = moment()
      for (let i = 0; i < events.length; i++) {
        if (moment(events[i].endDate).isBefore(now)) {
          this.passedEvents.push(events[i])
        } else if (moment(events[i].endApplicationDate).isBefore(now)) {
          this.deadlineClosed.push(events[i])
        } else {
          this.upcomingEvents.push(events[i])
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-list {
    display: flex;
  }
</style>
