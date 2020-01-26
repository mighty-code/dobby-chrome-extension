'use strict'

require('./bootstrap')

window.Vue = require('vue')

import Popup from './components/Popup.vue'

const app = new Vue({
    el: '#app',
    render: c => c(Popup),
})
