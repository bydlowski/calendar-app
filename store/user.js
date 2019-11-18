export const state = () => ({
  favorites: [],
  appliedList: []
})

// COMMIT
export const mutations = {
  toggleFavorite (state, id) {
    const current = state.favorites
    state.favorites = (current) ? addOrRemove(current, id) : [id]
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  toggleApplied (state, id) {
    const current = state.appliedList
    state.appliedList = (current) ? addOrRemove(current, id) : [id]
    localStorage.setItem('applied', JSON.stringify(state.appliedList))
  },
  stateFromLocalStorage (state) {
    state.favorites = JSON.parse(localStorage.getItem('favorites'))
    state.appliedList = JSON.parse(localStorage.getItem('applied'))
  }
}

// DISPATCH
export const actions = {
  toggleFavoriteEvent (vuexContext, id) {
    vuexContext.commit('toggleFavorite', id)
  },
  toggleAppliedEvent (vuexContext, id) {
    vuexContext.commit('toggleApplied', id)
  },
  setStateFromLocalStorage (vuexContext) {
    vuexContext.commit('stateFromLocalStorage')
  }
}

const addOrRemove = (array, value) => {
  const index = array.indexOf(value)
  if (index === -1) {
    array.push(value)
  } else {
    array.splice(index, 1)
  }
  return array
}
