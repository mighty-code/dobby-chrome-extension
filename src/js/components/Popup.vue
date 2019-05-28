<template>
  <div class="options-page w-full">
    <div class="text-xs float-right">
      <clock></clock>
    </div>
    <div class="login-form">
      <a target="_blank" class="text-white" href="options.html" v-if="!userAuthenticated">Login on Options page</a>
      <a target="_blank" class="text-white text-sm no-underline" href="options.html" v-if="userAuthenticated">Options</a>
    </div>
    <div class="flex w-full">
      <div class="w-full timetable text-center" v-if="userAuthenticated">
        <countdown v-if="connection && connection.id" :connection="connection"></countdown>
        <p v-if="!connection.id">You haven't yet created a connection</p>
      </div>
    </div>
    <p class="text-xs mt-4">Logged in as {{user.name}}</p>
  </div>
</template>
<script>
import Countdown from './Countdown.vue';
import Clock from './Clock.vue';
import countdown from '../core/countdown-service';
import location from './../core/location';

export default {
    components: { Countdown, Clock },
    data() {
        return {
            userAuthenticated: false,
            user: {},
            connection: {},
        };
    },
    mounted() {
        this.userAuthenticated = this.checkAuth();
        if (this.userAuthenticated) {
            this.loadConnection();

            setInterval(() => {
                 let connection = localStorage.getItem('connection');

                if (connection) {
                    this.connection = JSON.parse(connection);
                }
            }, 1000)
        }
    },
    methods: {
        checkAuth() {
            const user = localStorage.getItem('user');
            try {
                this.user = JSON.parse(user);
                if (this.user) {
                    return true;
                }
            } catch (e) {
                log.error("can't load user...", e);
            }

            return false;
        },
        async loadConnection() {
            let connection = localStorage.getItem('connection');

            if (connection) {
                this.connection = JSON.parse(connection);
            } else {
                const loc = await location.getLocation();
                if (loc) {
                    this.connection = await countdown.updateConnection(loc);
                } else {
                    this.connection = await countdown.updateConnection();
                }
            }

            log.debug('loadConnection() : connection:=', this.connection);
        },
    },
};
</script>