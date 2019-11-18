<template>
  <div class="column is-one-third-widescreen is-half-desktop">
    <div class="card">
      <div
        @click.prevent="toggleFavorite"
        :class="[ isFavorite ? 'has-text-danger' : 'has-text-grey-light' ]"
        title="Select event as favorite"
        class="card-favorite"
      >
        <font-awesome-icon
          :icon="['fas', 'heart']"
          size="lg"
        />
      </div>
      <div
        v-if="content.premium"
        class="card-premium"
      >
        <b-tooltip
          label="Event only for Premium Members"
          type="is-light"
          position="is-top"
        >
          <font-awesome-icon
            :icon="['fas', 'trophy']"
            class="has-text-warning"
            size="lg"
          />
        </b-tooltip>
      </div>
      <div
        @click="openEventModal"
        :title="`Learn more about the event ${content.name}`"
        class="card-image is-pointer"
      >
        <figure class="image is-2by1">
          <img
            :src="content.thumb"
            :alt="`${content.name} thumb`"
          >
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                :src="content.flag"
                :alt="`${content.country} flag`"
              >
            </figure>
          </div>
          <div class="media-content">
            <p
              @click="openEventModal"
              :title="`Learn more about the event ${content.name}`"
              class="title is-5 is-pointer has-ellipsis card-title"
            >
              {{ content.name }}
            </p>
            <p class="subtitle is-6">
              {{ content.city }}
            </p>
          </div>
        </div>
        <div class="content">
          <div class="is-vertical-center-flex">
            <font-awesome-icon :icon="['fas', 'clipboard-list']" />
            <p class="is-5 m-b-none m-l-sm">
              Type
            </p>
          </div>
          <p class="is-5">
            {{ content.type }}
          </p>
          <div class="is-vertical-center-flex">
            <font-awesome-icon :icon="['fas', 'calendar-plus']" />
            <p class="is-5 m-b-none m-l-sm">
              Application deadline
            </p>
          </div>
          <p class="is-5">
            {{ content.endApplicationDate | moment("DD/MM/YYYY") }}
          </p>
          <div class="is-vertical-center-flex">
            <font-awesome-icon :icon="['fas', 'calendar-check']" />
            <p class="is-5 m-b-none m-l-sm">
              Event dates
            </p>
          </div>
          <p class="is-5 m-b-none">
            <!-- {{ content.startDate | moment("dddd, MMMM Do YYYY") }} - -->
            {{ content.startDate | moment("DD/MM/YYYY") }} - {{ content.endDate | moment("DD/MM/YYYY") }}
          </p>
        </div>
        <b-button
          @click="openEventModal"
          :title="`Learn more about the event ${content.name}`"
          type="is-van-primary"
        >
          More details
        </b-button>
        <div
          v-if="isApplied"
          class="applied-tag"
        >
          <font-awesome-icon
            :icon="['fas', 'check-circle']"
            size="lg"
            class="has-text-success"
          />
          <p class="has-text-success">
            You have applied to this event
          </p>
        </div>
      </div>
      <!-- Event
      Content:{{ content }} -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Event',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isFavorite: false,
      isApplied: false
    }
  },
  computed: {
    favorites () {
      return this.$store.state.user.favorites
    },
    appliedList () {
      return this.$store.state.user.appliedList
    }
  },
  watch: {
    favorites () {
      this.isFavorite = this.favorites.find(favorite => favorite === this.content.id)
    },
    appliedList () {
      this.isApplied = this.appliedList.find(applied => applied === this.content.id)
    }
  },
  mounted () {
    this.isFavorite = this.favorites.find(favorite => favorite === this.content.id)
    this.isApplied = this.appliedList.find(applied => applied === this.content.id)
  },
  methods: {
    openEventModal () {
      this.$store.dispatch('modal/openEventModal', this.content)
    },
    toggleFavorite () {
      this.$store.dispatch('user/toggleFavoriteEvent', this.content.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    position: relative;

    &:hover {
      box-shadow: 0 2px 3px rgba(50, 50, 50, 0.2), 0 0 0 2px rgba(50, 50, 200, 0.2);
    }
  }
  .card-favorite,
  .card-premium {
    position: absolute;
    top: 1rem;
    z-index: 10;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }
  .card-favorite {
    right: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }
  .card-premium {
    right: 4rem;
    background-color: rgba(5, 5, 5, 0.5);
  }
  .card-title {
    width: 320px;

    @media screen and (max-width: 1800px) {
      width: 270px;
    }
    @media screen and (max-width: 1600px) {
      width: 230px;
    }
    @media screen and (max-width: 1400px) {
      width: 180px;
    }
  }
  .applied-tag {
    text-align: center;
    max-width: 120px;
    position: absolute;
    bottom: 1.25rem;
    right: 1rem;
    z-index: 10;

    p {
      font-size: 14px;
      line-height: 16px;
    }
  }
</style>
