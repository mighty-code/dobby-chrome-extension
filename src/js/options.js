'use strict'

require('./bootstrap')

import Vue from 'vue'

window.Vue = Vue

import Options from './components/Options.vue'

const app = new Vue({
    el: '#app',
    render: (c) => c(Options),
})
