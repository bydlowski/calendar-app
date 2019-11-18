// https://www.mockapi.io/projects/5dcf555775f9360014c2684c
// https://5dcf555775f9360014c2684b.mockapi.io/api/events

// const apiUrl = 'https://5dcf555775f9360014c2684b.mockapi.io/api/events'

// export const state = () => ({
//   events: null
// })

// export const mutations = {
//   async getEventsFromApi (state) {
//     console.log('GET EVNTS')
//     const events = await this.$axios.$get(apiUrl)
//     state.events = events
//   }
// }

// export const actions = {
//   // async nuxtServerInit({ commit }, { app }) {
//   //   // const result = await app.apolloProvider.defaultClient.query({ query: gqlAuthCurrentUser }).then(({ data }) => data.authCurrentUser);
//   //   // commit('auth/SET_USER', result);
//   //   // const result = await app.apolloProvider.defaultClient.query({ query: gqlPost })
//   //   //   .then(({ data }) => {
//   //   //     console.log('RETORNO');
//   //   //   });
//   //   let result = app.apolloProvider.defaultClient
//   //   // console.log('RETORNO: ', result.query({ query: gqlPost }));
//   // },

//   // FUNCONAOU
//   // nuxtServerInit(store, context) {
//   //   let client = context.app.apolloProvider.defaultClient
//   // }

//   // async nuxtServerInit (store, context) {
//   async nuxtServerInit (vuexContext) {
//     // await store.dispatch('post/getPostsFromPrisma', context.app.apolloProvider)
//     await vuexContext.commit('getEventsFromApi')
//   }
// }
