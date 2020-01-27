<template>
    <div class="options-page w-full">
        <div class="text-xs float-right">
            <clock></clock>
        </div>
        <div class="login-form">
            <a
                v-if="!userAuthenticated"
                target="_blank"
                class="text-white"
                href="options.html"
                >Login on Options page</a
            >
            <a
                v-if="userAuthenticated"
                target="_blank"
                class="text-white text-sm no-underline"
                href="options.html"
                >Options</a
            >
        </div>
        <div class="flex w-full">
            <div v-if="userAuthenticated" class="w-full timetable text-center">
                <countdown></countdown>
            </div>
        </div>
        <p class="text-xs mt-4">
            Logged in as {{ user.name }} <span v-if="isDev"> / ENV: dev</span>
        </p>
    </div>
</template>
<script>
import Countdown from './Countdown.vue'
import Clock from './Clock.vue'
import connectionService from '../core/connection-service'
import userService from '../core/user-service'
import location from './../core/location'

export default {
    components: { Countdown, Clock },
    data() {
        return {
            userAuthenticated: false,
            user: {},
            connection: null,
            isDev: process.env.NODE_ENV === 'development',
        }
    },
    mounted() {
        this.userAuthenticated = this.checkAuth()
        if (this.userAuthenticated) {
            this.loadConnection()

            setInterval(() => {
                this.connection = connectionService.getConnection()
            }, 1000)
        }
    },
    methods: {
        checkAuth() {
            const user = userService.getUser()
            return user !== null
        },
        async loadConnection() {
            this.connection = connectionService.getConnection()

            if (!this.connection) {
                const loc = await location.getLocation()
                if (loc) {
                    this.connection = await connectionService.updateConnection(
                        loc
                    )
                } else {
                    this.connection = await connectionService.updateConnection()
                }
            }
        },
    },
}
</script>
