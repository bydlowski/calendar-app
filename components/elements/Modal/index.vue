<template>
  <div v-if="idModalOpen">
    <b-modal
      :active="idModalOpen"
      :on-cancel="clearEventModal"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card event-modal">
        <div class="modal-card-body event-modal-body">
          <figure class="image is-3by1">
            <img
              :src="modalContent.cover"
              :alt="`${modalContent.name} cover`"
            >
          </figure>
          <div class="p-lg">
            <p class="title is-3 has-text-centered m-b-md">
              {{ modalContent.name }}
            </p>
            <p class="title is-5 m-b-xs">
              Type
            </p>
            <div
              @click.prevent="selectSpecificTag('type')"
              class="is-vertical-center-flex"
            >
              <b-tooltip
                :label="`Filter only events of this type`"
                type="is-van-primary"
                class="m-l-xs is-vertical-center-flex is-pointer"
                position="is-right"
              >
                <p class="m-r-xs">
                  {{ modalContent.type }}
                </p>
                <font-awesome-icon :icon="['fas', 'tag']" size="xs" />
              </b-tooltip>
            </div>
            <p class="title is-5 m-b-xs m-t-md">
              Location
            </p>
            <div
              @click.prevent="selectSpecificTag('location')"
              class="is-vertical-center-flex"
            >
              <b-tooltip
                :label="getLocationTooltip()"
                type="is-van-primary"
                class="m-l-xs is-vertical-center-flex is-pointer"
                position="is-right"
              >
                <p class="m-r-xs">
                  {{ modalContent.city }} <span v-if="modalContent.country !== 'Online'">({{ modalContent.country }})</span>
                </p>
                <font-awesome-icon :icon="['fas', 'tag']" size="xs" />
              </b-tooltip>
            </div>
            <p class="title is-5 m-b-xs m-t-md">
              Dates
            </p>
            <div class="">
              <p class="is-4">
                Application start: {{ modalContent.startApplicationDate | moment("MMMM Do YYYY") }}
              </p>
              <p class="is-4">
                Application end: {{ modalContent.endApplicationDate | moment("MMMM Do YYYY") }}
              </p>
              <hr class="horizontal-line">
              <p class="is-4">
                Event start: {{ modalContent.startDate | moment("MMMM Do YYYY") }}
              </p>
              <p class="is-4">
                Event end: {{ modalContent.endDate | moment("MMMM Do YYYY") }}
              </p>
            </div>
            <div v-if="modalContent.premium" class="is-center-column-flex">
              <p class="has-text-centered is-size-6 m-t-lg m-b-xs has-text-danger">
                This is a Premium only event!
              </p>
              <b-button
                type="is-van-primary"
                class="m-b-xs"
                tag="a"
                href="https://vanhack.com/platform/Checkout"
              >
                Become a VanHack Premium
              </b-button>
            </div>
            <div v-else-if="areApplicationsOpen">
              <b-button
                v-if="isApplying"
                @click.prevent="toggleApplied"
                type="is-van-primary"
                expanded
                loading
                class="m-t-lg m-b-md"
              >
                Apply to this Event!
              </b-button>
              <b-button
                v-else-if="!isApplied"
                @click.prevent="toggleApplied"
                type="is-van-primary"
                expanded
                class="m-t-lg m-b-md"
              >
                Apply to this Event!
              </b-button>
              <div v-else class="is-center-column-flex">
                <b-button
                  type="is-van-primary"
                  expanded
                  outlined
                  class="m-t-lg m-b-xs is-not-pointer no-hover"
                >
                  You applied to this event!
                </b-button>
                <p
                  @click.prevent="toggleApplied"
                  class="has-text-centered is-pointer is-size-7 m-t-none has-underline"
                  title="Cancel application to this event"
                >
                  Cancel application
                </p>
              </div>
            </div>
            <p class="title is-5 m-b-md m-t-md">
              Description
            </p>
            <p
              v-html="modalContent.theEvent"
              class="is-6"
            />
            <p class="title is-5 m-b-md m-t-md">
              Other information
            </p>
            <p
              v-html="modalContent.theCandidates"
              class="is-6"
            />
            <b-button
              :href="`https://vanhack.com/platform/#/events/${modalContent.slug}`"
              type="is-van-primary"
              outlined
              class="m-t-lg m-b-md"
              tag="a"
            >
              Go to event page
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Modal',
  data () {
    return {
      isApplying: false,
      isApplied: false,
      areApplicationsOpen: true
    }
  },
  computed: {
    idModalOpen () {
      return this.$store.state.modal.modalOpen
    },
    modalContent () {
      return this.$store.state.modal.modalEventContent
    },
    appliedList () {
      return this.$store.state.user.appliedList
    }
  },
  watch: {
    appliedList () {
      this.isApplied = this.appliedList.find(applied => applied === this.modalContent.id)
    }
  },
  created () {
    this.areApplicationsOpen = moment(this.modalContent.endApplicationDate).isAfter(moment())
  },
  mounted () {
    this.isApplied = this.appliedList.find(applied => applied === this.modalContent.id)
  },
  methods: {
    clearEventModal () {
      this.$store.dispatch('modal/clearEventModal')
    },
    getLocationTooltip () {
      const city = this.modalContent.city
      return (city === 'Online') ? 'Filter only online events' : `Filter only events in ${city}`
    },
    selectSpecificTag (type) {
      this.$store.dispatch('tags/selectSpecificTag', { type, event: this.modalContent })
      this.$store.dispatch('modal/clearEventModal')
    },
    toggleApplied () {
      if (!this.isApplied) {
        this.isApplying = true
        this.isApplied = true
        this.$store.dispatch('user/toggleAppliedEvent', this.modalContent.id)
        setTimeout(() => { this.isApplying = false }, 1000)
      } else {
        this.isApplied = false
        this.$store.dispatch('user/toggleAppliedEvent', this.modalContent.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .event-modal {
    width: 100%;
    // max-height: 80%;

    &-body {
      padding: 0;
    }
  }
  .horizontal-line {
    margin: 2px 20px;
    width: 20%;
  }
</style>
