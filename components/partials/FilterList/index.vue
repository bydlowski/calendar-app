<template>
  <div class="m-l-md">
    <h2 class="title is-4 has-text-centered">
      How can we help you?
    </h2>
    <b-field>
      <b-input
        v-model="searchText"
        placeholder="Search"
        type="search"
        icon="magnify"
        icon-clickable
      />
    </b-field>
    <h2 class="title is-5 has-text-centered m-b-sm m-t-md">
      Want some filters?
    </h2>
    <div class="columns is-aligned-flex-start">
      <div class="tag-list m-b-md column is-half">
        <p class="has-text-grey m-b-md">
          Event types
        </p>
        <b-taglist class="columns is-center-flex">
          <div
            v-for="(type, index) in allTypeTags"
            :key="`${type}-${index}`"
            @click.prevent="toggleTag('type', type)"
            class="tag-div column is-10-widescreen is-offset-1-widescreen is-4-desktop is-4-tablet is-4-mobile"
          >
            <b-tag
              :type="checkActiveTypeTag(type)"
              class="is-pointer"
              rounded
              is-medium
            >
              {{ type }}
            </b-tag>
          </div>
          <div
            @click.prevent="resetTags('type')"
            v-if="allTypeTags.length !== activeTypeTags.length"
            class="reset-div-parent is-center-flex"
          >
            <b-tag
              type="is-light"
              class="is-pointer reset-tag"
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
        <b-taglist class="columns is-center-flex">
          <div
            v-for="(location, index) in allLocationTags"
            :key="`${location}-${index}`"
            @click.prevent="toggleTag('location', location)"
            class="tag-div column is-10-widescreen is-offset-1-widescreen is-4-desktop is-4-tablet is-4-mobile"
          >
            <b-tag
              :type="checkActiveLocationTag(location)"
              class="is-pointer"
              rounded
              is-medium
            >
              {{ location }}
            </b-tag>
          </div>
          <div
            @click.prevent="resetTags('location')"
            class="reset-div-parent is-center-flex"
          >
            <b-tag
              v-if="allLocationTags.length !== activeLocationTags.length"
              type="is-light"
              class="is-pointer reset-tag"
              rounded
              is-medium
            >
              <font-awesome-icon :icon="['fas', 'redo-alt']" size="xs" />
            </b-tag>
          </div>
        </b-taglist>
      </div>
    </div>
    <div class="columns is-aligned-flex-start has-text-centered">
      <div class="tag-list m-b-md column is-half">
        <p class="has-text-grey m-b-md">
          When is the application date limit?
        </p>
        <b-taglist class="columns is-center-flex">
          <div
            v-for="(date, index) in allApplicationTags"
            :key="`${date}-${index}-application`"
            @click.prevent="toggleDateTag('application', date)"
            class="tag-div column is-10 is-offset-1"
          >
            <b-tag
              :type="checkActiveApplicationTag(date)"
              class="is-pointer"
              rounded
              is-medium
            >
              {{ date.label }}
            </b-tag>
          </div>
        </b-taglist>
      </div>
      <div class="tag-list m-b-md column is-half">
        <p class="has-text-grey m-b-md">
          When is the event start date?
        </p>
        <b-taglist class="columns is-center-flex">
          <div
            v-for="(date, index) in allStartTags"
            :key="`${date}-${index}-start`"
            @click.prevent="toggleDateTag('start', date)"
            class="tag-div column is-10 is-offset-1"
          >
            <b-tag
              :type="checkActiveStartTag(date)"
              class="is-pointer"
              rounded
              is-medium
            >
              {{ date.label }}
            </b-tag>
          </div>
        </b-taglist>
      </div>
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
            class="tag-div sure-tag"
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
  data () {
    return {
      searchText: null
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
  watch: {
    searchText () {
      this.$store.dispatch('tags/changeSearchText', this.searchText)
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
  .reset-div-parent {
    // margin-left: 16%;
    width: 100%;

    .reset-tag {
      background-color: transparent;
      box-shadow: 0 0 2px rgba(10, 10, 10, 0.4);
      margin: 2px auto 0;
    }
  }
  .tag-div {
    padding: 0;
    margin-bottom: 2px;
    span {
      width: 100%;
    }
    @media screen and (max-width: 1215px) {
      width: 140px;
      margin: 0 20px;
    }
  }
  .sure-tag {
    width: 30px !important;
  }
</style>
