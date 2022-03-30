<template>
    <div class="flex w-full flex-col">
        <div class="flex justify-between">
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
                    class="text-sm text-white no-underline"
                    href="options.html"
                    >Options</a
                >
            </div>
            <div class="flex space-x-1 text-xs">
                <button type="button" @click="refresh">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </button>
                <clock></clock>
            </div>
        </div>
        <div class="flex w-full">
            <div v-if="userAuthenticated" class="timetable w-full text-center">
                <countdown></countdown>
                <div v-if="connection && timetableEntry" class="mt-2 p-4">
                    <div
                        v-for="(entry, index) in connection.timetable"
                        :key="index"
                        class="border-blue-dark border-b"
                    >
                        <ConnectionEntry
                            class="my-2"
                            :connection="connection"
                            :timetable-entry="entry"
                        ></ConnectionEntry>
                    </div>
                </div>
                <p v-if="!connection">You haven't yet created a connection</p>
            </div>
        </div>
        <p class="mt-4 text-xs">
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
import BackgroundWorker from './background'

export default {
    components: { Countdown, Clock, ConnectionEntry },
    data() {
        return {
            connection: null,
            timetableEntry: null,
            isDev: process.env.NODE_ENV === 'development',
        }
    },
    computed: {
        user() {
            return userService.getUser()
        },
        userAuthenticated() {
            return this.user !== null
        },
    },
    mounted() {
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
        async refresh() {
            await new BackgroundWorker().refresh()
        },
        async setData() {
            this.connection = await this.loadConnection()
            this.timetableEntry = connectionService.getNextConnection(
                this.connection
            )
        },
        async loadConnection() {
            let connection = await connectionService.getConnection()

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
