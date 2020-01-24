<template>
  <div class="pt-5" v-if="connection">
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
            <FontAwesomeIcon :icon="['fas', 'home']"></FontAwesomeIcon>
        </span>
        <br>
        <span class="connection-text text-lg">{{ connection.from }}</span>
        <span class="connection-subtext block">{{ departureTime }}</span>
      </div>
      <div
        class="w-1/5 text-center justify-center col-2 d-flex justify-content-center align-items-center flex-column"
      >
        <span
          class
          v-if="connection.departure_platform"
        >Platform {{ connection.departure_platform }}</span>
        <br>
        <span class="display-block">
            <FontAwesomeIcon :icon="['fas', 'long-arrow-alt-right']" size="3x"></FontAwesomeIcon>
        </span>
      </div>
      <div
        class="w-2/5 text-center justify-center col-5 d-flex flex-column justify-content-center align-items-center"
      >
        <span class="display-block connection-text mb-3">
            <FontAwesomeIcon :icon="['fas', 'map-marker-alt']"></FontAwesomeIcon>
        </span>
        <br>
        <span class="connection-text text-lg">{{ connection.to }}</span>
        <span class="connection-subtext block">{{ arrivalTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CountdownService from './../core/countdown-service';

export default {
    props: ['connection'],
    computed: {
        departureTime() {
            return moment.unix(this.connection.departure).format('H:mm');
        },
        arrivalTime() {
            return moment.unix(this.connection.arrival).format('H:mm');
        },
        countdown() {
            const minutes = CountdownService.calculateCountdown(this.connection);
            if (minutes > 60) {
                return '>60';
            }

            return minutes;
        },
    },
};
</script>
