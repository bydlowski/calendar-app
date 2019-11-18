import Vue from 'vue'

// https://github.com/FortAwesome/vue-fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// library.add(fab)
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const moment = require('moment')
Vue.use(require('vue-moment'), {
  moment
})
