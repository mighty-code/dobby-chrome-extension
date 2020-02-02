'use strict'

require('./bootstrap')

window.Vue = require('vue')

import Options from './components/Options.vue'

const app = new Vue({
    el: '#app',
    render: c => c(Options),
})
