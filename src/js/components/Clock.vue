<template>
    <h3>{{ time }}</h3>
</template>

<script>
export default {
    data() {
        return {
            time: null,
        }
    },
    mounted() {
        this.time = moment().format('HH:mm:ss')
        setInterval(() => {
            this.time = moment().format('HH:mm:ss')
        }, 1000)
    },
}
</script>
