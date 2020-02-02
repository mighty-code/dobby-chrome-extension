import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/fontawesome-free-solid'
import { far } from '@fortawesome/fontawesome-free-regular'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far)

import Vue from 'vue'
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
