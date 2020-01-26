window._ = require('lodash')
window.moment = require('moment')
window.axios = require('axios')
import * as log from 'loglevel'
if (process.env.NODE_ENV === 'production') {
    log.setLevel(log.levels.ERROR)
} else {
    log.setLevel(log.levels.DEBUG)
}
window.log = log

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/fontawesome-free-solid'
import { far } from '@fortawesome/fontawesome-free-regular'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far)

import Vue from 'vue'
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
