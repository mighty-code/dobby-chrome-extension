<template>
    <div>
        <div v-if="connection" class="pt-5">
            <div class="row">
                <div class="col-12 text-center">
                    <h1 class="countdown">{{ countdown }}</h1>
                </div>
            </div>
            <div class="flex mt-2 border p-4 rounded-full">
                <div
                    class="w-2/5 text-center justify-center col-5 d-flex flex-column justify-content-center align-items-center"
                >
                    <span class="justify-center connection-text mb-3">
                        <FontAwesomeIcon
                            :icon="['fas', 'home']"
                        ></FontAwesomeIcon>
                    </span>
                    <br />
                    <span class="connection-text text-lg">{{
                        connection.from
                    }}</span>
                    <span class="connection-subtext block">{{
                        departureTime
                    }}</span>
                </div>
                <div
                    class="w-1/5 text-center justify-center col-2 d-flex justify-content-center align-items-center flex-column"
                >
                    <span v-if="nextConnection.departure_platform" class
                        >Platform {{ nextConnection.departure_platform }}</span
                    >
                    <br />
                    <span class="display-block">
                        <FontAwesomeIcon
                            :icon="['fas', 'long-arrow-alt-right']"
                            size="3x"
                        ></FontAwesomeIcon>
                    </span>
                </div>
                <div
                    class="w-2/5 text-center justify-center col-5 d-flex flex-column justify-content-center align-items-center"
                >
                    <span class="display-block connection-text mb-3">
                        <FontAwesomeIcon
                            :icon="['fas', 'map-marker-alt']"
                        ></FontAwesomeIcon>
                    </span>
                    <br />
                    <span class="connection-text text-lg">{{
                        connection.to
                    }}</span>
                    <span class="connection-subtext block">{{
                        arrivalTime
                    }}</span>
                </div>
            </div>
        </div>
        <p v-if="!connection">
            You haven't yet created a connection
        </p>
    </div>
</template>

<script>
import connectionService from './../core/connection-service'
import countdownService from './../core/countdown-service'

export default {
    data() {
        return {
            connection: null,
            countdown: null,
            nextConnection: null,
        }
    },
    computed: {
        departureTime() {
            return moment.unix(this.nextConnection.departure_at).format('H:mm')
        },
        arrivalTime() {
            return moment.unix(this.nextConnection.arrival_at).format('H:mm')
        },
    },
    mounted() {
        this.setData()

        setInterval(() => {
            this.setData()
        }, 1000)
    },
    methods: {
        setData() {
            this.connection = connectionService.getConnection()
            this.nextConnection = connectionService.getNextConnection()
            this.countdown = countdownService.calculateCountdown(
                this.connection,
                this.nextConnection
            )
        },
    },
}
</script>
