<template>
    <h3 class="text-sm">{{ time }}</h3>
</template>

<script>
import { format } from 'date-fns'
export default {
    data() {
        return {
            time: null,
        }
    },
    mounted() {
        this.time = format(new Date(), 'HH:mm:ss')
        setInterval(() => {
            this.time = format(new Date(), 'HH:mm:ss')
        }, 1000)
    },
}
</script>
