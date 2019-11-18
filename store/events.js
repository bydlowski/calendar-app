// https://www.mockapi.io/projects/5dcf555775f9360014c2684c
// https://5dcf555775f9360014c2684b.mockapi.io/api/events

const apiUrl = 'https://5dcf555775f9360014c2684b.mockapi.io/api/events'

export const state = () => ({
  allEvents: null,
  loaded: false
})

export const mutations = {
  saveEventsFromApi (state, value) {
    state.allEvents = value
    state.loaded = true
  }
}

export const actions = {
  async getEventsFromApi (vuexContext) {
    const events = await this.$axios.$get(apiUrl)
    vuexContext.commit('saveEventsFromApi', events)
  }
}
