export const state = () => ({
  modalOpen: false,
  modalEventContent: null
})

// COMMIT
export const mutations = {
  clearModal (state) {
    state.modalOpen = false
    state.modalEventContent = null
  },
  openModal (state, content) {
    state.modalEventContent = content
    state.modalOpen = true
  }
}

// DISPATCH
export const actions = {
  clearEventModal (vuexContext) {
    vuexContext.commit('clearModal')
  },
  openEventModal (vuexContext, content) {
    vuexContext.commit('openModal', content)
  }
}
