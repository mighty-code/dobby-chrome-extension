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
                <div class="flex mt-2 border p-4 rounded-full">
                    <ConnectionEntry
                        v-if="connection && timetableEntry"
                        :connection="connection"
                        :timetable-entry="timetableEntry"
                    ></ConnectionEntry>
                </div>
                <p v-if="!connection">
                    You haven't yet created a connection
                </p>
            </div>
        </div>
        <p class="text-xs mt-4">
            Logged in as {{ user.name }} <span v-if="isDev"> / ENV: dev</span>
        </p>
    </div>
</template>
<script>
import Countdown from './Countdown.vue'
import ConnectionEntry from './ConnectionEntry.vue'
import Clock from './Clock.vue'
import connectionService from '../core/connection-service'
import userService from '../core/user-service'
import location from './../core/location'
import countdownService from '../core/countdown-service'

export default {
    components: { Countdown, Clock, ConnectionEntry },
    data() {
        return {
            userAuthenticated: false,
            user: {},
            connection: null,
            timetableEntry: null,
            isDev: process.env.NODE_ENV === 'development',
        }
    },
    mounted() {
        this.userAuthenticated = this.checkAuth()
        if (this.userAuthenticated) {
            this.setData()

            setInterval(() => {
                this.setData()
            }, 1000)
        }
    },
    methods: {
        checkAuth() {
            const user = userService.getUser()
            return user !== null
        },
        async setData() {
            this.connection = await this.loadConnection()
            this.timetableEntry = connectionService.getNextConnection(
                this.connection
            )
            console.log('setData() : timetableEntry:=', this.timetableEntry)
        },
        async loadConnection() {
            let connection = connectionService.getConnection()

            if (!connection) {
                const loc = await location.getLocation()
                if (loc) {
                    connection = await connectionService.updateConnection(loc)
                } else {
                    connection = await connectionService.updateConnection()
                }
            }

            return connection
        },
    },
}
</script>
