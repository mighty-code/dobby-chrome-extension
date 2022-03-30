<template>
    <div class="block">
        <div class="flex">
            <div
                class="col-5 flex w-2/5 flex-col items-center justify-center text-center"
            >
                <span class="mb-3 justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                        />
                    </svg>
                </span>
                <span class="">{{ connection.from }}</span>
                <span class="connection-subtext block text-sm">{{
                    departureTime
                }}</span>
            </div>
            <div
                class="col-2 flex w-1/5 flex-col items-center justify-center text-center"
            >
                <span v-if="timetableEntry.departure_platform" class="text-sm"
                    >Plt. {{ timetableEntry.departure_platform }}</span
                >
                <span class="display-block">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </span>
                <span v-if="timetableEntry.arrival_platform" class="text-sm"
                    >Plt. {{ timetableEntry.arrival_platform }}</span
                >
            </div>
            <div
                class="col-5 flex w-2/5 flex-col items-center justify-center text-center"
            >
                <span class="mb-3 block">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
                <span class="">{{ connection.to }}</span>
                <span class="connection-subtext block text-sm">{{
                    arrivalTime
                }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { format, parseISO } from 'date-fns'

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
            return this.timetableEntry.departure_at
                ? format(parseISO(this.timetableEntry.departure_at), 'H:mm')
                : '--:--'
        },
        arrivalTime() {
            return this.timetableEntry.arrival_at
                ? format(parseISO(this.timetableEntry.arrival_at), 'H:mm')
                : '--:--'
        },
    },
    mounted() {},
}
</script>
<style></style>
