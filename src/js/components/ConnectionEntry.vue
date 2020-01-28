<template>
    <div class="block">
        <div class="flex">
            <div
                class="w-2/5 text-center justify-center col-5 flex flex-col justify-center items-center"
            >
                <span class="justify-center connection-text mb-3">
                    <FontAwesomeIcon :icon="['fas', 'home']"></FontAwesomeIcon>
                </span>
                <span class="connection-text text-lg">{{
                    connection.from
                }}</span>
                <span class="connection-subtext block">{{
                    departureTime
                }}</span>
            </div>
            <div
                class="w-1/5 text-center justify-center col-2 flex justify-center items-center flex-col"
            >
                <span v-if="timetableEntry.departure_platform" class
                    >Platform {{ timetableEntry.departure_platform }}</span
                >
                <span class="display-block">
                    <FontAwesomeIcon
                        :icon="['fas', 'long-arrow-alt-right']"
                        size="3x"
                    ></FontAwesomeIcon>
                </span>
            </div>
            <div
                class="w-2/5 text-center justify-center col-5 flex flex-col justify-center items-center"
            >
                <span class="block connection-text mb-3">
                    <FontAwesomeIcon
                        :icon="['fas', 'map-marker-alt']"
                    ></FontAwesomeIcon>
                </span>
                <span class="connection-text text-lg">{{ connection.to }}</span>
                <span class="connection-subtext block">{{ arrivalTime }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import connectionService from './../core/connection-service'

export default {
    props: {
        connection: {
            required: true,
            type: Object,
        },
        timetableEntry: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {}
    },
    computed: {
        departureTime() {
            return moment.unix(this.timetableEntry.departure_at).format('H:mm')
        },
        arrivalTime() {
            return moment.unix(this.timetableEntry.arrival_at).format('H:mm')
        },
    },
    mounted() {},
}
</script>
<style></style>
