export const state = () => ({
  allTypeTags: [],
  activeTypeTags: [],
  allLocationTags: [],
  activeLocationTags: [],
  allApplicationTags: [],
  activeApplicationTagValue: 90,
  allStartTags: [],
  activeStartTagValue: 180,
  onlyFavorites: false,
  searchText: ''
})

// COMMIT
export const mutations = {
  setInitialTags (state, tags) {
    state.allTypeTags = [...tags.types]
    state.activeTypeTags = [...tags.types]
    state.allLocationTags = [...tags.cities]
    state.activeLocationTags = [...tags.cities]
    state.allApplicationTags = [...dateTags]
    state.allStartTags = [...dateTags]
  },
  toggleActiveTag (state, obj) {
    if (obj.tagType === 'location') {
      const current = state.activeLocationTags
      state.activeLocationTags = addOrRemove(current, obj.value)
    } else if (obj.tagType === 'type') {
      const current = state.activeTypeTags
      state.activeTypeTags = addOrRemove(current, obj.value)
    }
  },
  setActiveDateTag (state, obj) {
    if (obj.dateType === 'application') {
      state.activeApplicationTagValue = obj.date.value
    } else if (obj.dateType === 'start') {
      state.activeStartTagValue = obj.date.value
    }
  },
  toggleOnlyFavoritesTag (state) {
    state.onlyFavorites = !state.onlyFavorites
    state.activeTypeTags = [...state.allTypeTags]
    state.activeLocationTags = [...state.allLocationTags]
    state.activeApplicationTagValue = 365
    state.activeStartTagValue = 365
  },
  setSpecificTag (state, obj) {
    if (obj.type === 'type') {
      state.activeTypeTags = [obj.event.type]
    } else if (obj.type === 'location') {
      state.activeLocationTags = [obj.event.city]
    }
  },
  resetSpecificTags (state, selection) {
    if (selection === 'type') {
      state.activeTypeTags = [...state.allTypeTags]
    } else if (selection === 'location') {
      state.activeLocationTags = [...state.allLocationTags]
    }
  },
  setSearchText (state, value) {
    state.searchText = value
  }
}

// DISPATCH
export const actions = {
  initiateTags (vuexContext, events) {
    const cities = [...new Set(events.result.map(event => event.city))]
    const types = [...new Set(events.result.map(event => event.type))]
    vuexContext.commit('setInitialTags', { cities, types })
  },
  toggleTag (vuexContext, obj) {
    vuexContext.commit('toggleActiveTag', obj)
  },
  toggleDateTag (vuexContext, obj) {
    vuexContext.commit('setActiveDateTag', obj)
  },
  toggleOnlyFavorites (vuexContext, obj) {
    vuexContext.commit('toggleOnlyFavoritesTag', obj)
  },
  selectSpecificTag (vuexContext, obj) {
    vuexContext.commit('setSpecificTag', obj)
  },
  resetTags (vuexContext, selection) {
    vuexContext.commit('resetSpecificTags', selection)
  },
  changeSearchText (vuexContext, value) {
    vuexContext.commit('setSearchText', value)
  }
}

const dateTags = [
  {
    label: 'Next 15 days',
    value: 15
  },
  {
    label: 'Next month',
    value: 30
  },
  {
    label: 'Next 3 months',
    value: 90
  },
  {
    label: 'Next 6 months',
    value: 180
  },
  {
    label: 'Next year',
    value: 365
  }
]

const addOrRemove = (array, value) => {
  const index = array.indexOf(value)
  if (index === -1) {
    array.push(value)
  } else {
    array.splice(index, 1)
  }
  return array
}
