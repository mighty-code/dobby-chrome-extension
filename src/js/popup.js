'use strict'

require('./bootstrap')

import Vue from 'vue'

window.Vue = Vue

import Popup from './components/Popup.vue'

const app = new Vue({
    el: '#app',
    render: (c) => c(Popup),
})
