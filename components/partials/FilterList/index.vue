<template>
  <div class="m-l-md">
    <h2
      class="title is-4 has-text-centered"
    >
      How can we help you?
    </h2>
    <div class="columns">
      <div class="tag-list m-b-md column is-half">
        <p class="has-text-grey m-b-md">
          Event types
        </p>
        <b-taglist class="columns is-aligned-flex-start">
          <div
            @click.prevent="toggleTag('type', type)"
            class="tag-div"
          >
            <b-tag
              v-for="(type, index) in allTypeTags"
              :key="`${type}-${index}`"
              :type="checkActiveTypeTag(type)"
              class="is-pointer tag-div-parent column is-10 is-offset-1"
              rounded
              is-medium
            >
              {{ type }}
            </b-tag>
          </div>
          <div
            @click.prevent="resetTags('type')"
            class="tag-div"
          >
            <b-tag
              v-if="allTypeTags.length !== activeTypeTags.length"
              type="is-light"
              class="is-pointer tag-div-parent reset-tag"
              rounded
              is-medium
            >
              <font-awesome-icon :icon="['fas', 'redo-alt']" size="xs" />
            </b-tag>
          </div>
        </b-taglist>
      </div>
      <div class="tag-list m-b-md column is-half">
        <p class="has-text-grey m-b-md">
          Where?
        </p>
        <b-taglist class="columns is-aligned-flex-start">
          <b-tag
            v-for="(location, index) in allLocationTags"
            :key="`${location}-${index}`"
            :type="checkActiveLocationTag(location)"
            class="is-pointer tag-div-parent column is-10 is-offset-1"
            rounded
            is-medium
          >
            <div
              @click.prevent="toggleTag('location', location)"
              class="tag-div"
            >
              {{ location }}
            </div>
          </b-tag>
          <b-tag
            v-if="allLocationTags.length !== activeLocationTags.length"
            type="is-light"
            class="is-pointer tag-div-parent reset-tag"
            rounded
            is-medium
          >
            <div
              @click.prevent="resetTags('location')"
              class="tag-div"
            >
              <font-awesome-icon :icon="['fas', 'redo-alt']" size="xs" />
            </div>
          </b-tag>
        </b-taglist>
      </div>
    </div>
    <div class="tag-list m-b-md">
      <p class="has-text-grey m-b-sm">
        When is the application date limit?
      </p>
      <b-taglist class="is-center-flex">
        <b-tag
          v-for="(date, index) in allApplicationTags"
          :key="`${date}-${index}-application`"
          :type="checkActiveApplicationTag(date)"
          class="is-pointer tag-div-parent"
          rounded
          is-medium
        >
          <div
            @click.prevent="toggleDateTag('application', date)"
            class="tag-div"
          >
            {{ date.label }}
          </div>
        </b-tag>
      </b-taglist>
    </div>
    <div class="tag-list m-b-md">
      <p class="has-text-grey m-b-sm">
        When does the event start?
      </p>
      <b-taglist class="is-center-flex">
        <b-tag
          v-for="(date, index) in allStartTags"
          :key="`${date}-${index}-start`"
          :type="checkActiveStartTag(date)"
          class="is-pointer tag-div-parent"
          rounded
          is-medium
        >
          <div
            @click.prevent="toggleDateTag('start', date)"
            class="tag-div"
          >
            {{ date.label }}
          </div>
        </b-tag>
      </b-taglist>
    </div>
    <div class="tag-list">
      <p class="has-text-grey m-b-sm">
        Want to see only your favorites?
      </p>
      <b-taglist>
        <b-tag
          :type="checkOnlyFavorites()"
          class="is-pointer tag-div-parent"
          rounded
          is-medium
        >
          <div
            @click.prevent="toggleOnlyFavorites()"
            class="tag-div"
          >
            Sure!
          </div>
        </b-tag>
      </b-taglist>
    </div>
    <!-- {{ countries }} -->
    <!-- {{ events }} -->
    <!-- {{ allApplicationTags }} -->
    <!-- {{ activeStartTagValue }} -->
  </div>
</template>

<script>
export default {
  name: 'FilterList',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  computed: {
    allTypeTags () {
      return this.$store.state.tags.allTypeTags
    },
    activeTypeTags () {
      return this.$store.state.tags.activeTypeTags
    },
    allLocationTags () {
      return this.$store.state.tags.allLocationTags
    },
    activeLocationTags () {
      return this.$store.state.tags.activeLocationTags
    },
    allApplicationTags () {
      return this.$store.state.tags.allApplicationTags
    },
    activeApplicationTagValue () {
      return this.$store.state.tags.activeApplicationTagValue
    },
    allStartTags () {
      return this.$store.state.tags.allStartTags
    },
    activeStartTagValue () {
      return this.$store.state.tags.activeStartTagValue
    },
    onlyFavorites () {
      return this.$store.state.tags.onlyFavorites
    }
  },
  methods: {
    checkActiveLocationTag (location) {
      return this.activeLocationTags.includes(location) ? 'is-van-secondary' : 'is-light'
    },
    checkActiveTypeTag (type) {
      return this.activeTypeTags.includes(type) ? 'is-van-secondary' : 'is-light'
    },
    checkActiveApplicationTag (date) {
      return (this.activeApplicationTagValue === date.value) ? 'is-van-secondary' : 'is-light'
    },
    checkActiveStartTag (date) {
      return (this.activeStartTagValue === date.value) ? 'is-van-secondary' : 'is-light'
    },
    checkOnlyFavorites (date) {
      return (this.onlyFavorites) ? 'is-van-secondary' : 'is-light'
    },
    toggleTag (tagType, value) {
      this.$store.dispatch('tags/toggleTag', { tagType, value })
    },
    toggleDateTag (dateType, date) {
      this.$store.dispatch('tags/toggleDateTag', { dateType, date })
    },
    toggleOnlyFavorites () {
      this.$store.dispatch('tags/toggleOnlyFavorites')
    },
    resetTags (type) {
      this.$store.dispatch('tags/resetTags', type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .tag-div-parent {
    padding-left: 0;
    padding-right: 0;

    &.reset-tag {
      background-color: transparent;
      box-shadow: 0 0 2px rgba(10, 10, 10, 0.4);
      margin: 10px auto 0;
    }
  }
  .tag-div {
    padding-left: .75em;
    padding-right: .75em;
  }
</style>
