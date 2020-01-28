<template>
    <div class="pt-5">
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="countdown">{{ countdown }}</h1>
            </div>
        </div>
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
            timetableEntry: null,
        }
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
            this.timetableEntry = connectionService.getNextConnection(
                this.connection
            )
            this.countdown = countdownService.calculateCountdown(
                this.connection,
                this.timetableEntry
            )
        },
    },
}
</script>
