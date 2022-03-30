<template>
    <div class="flex h-full flex-col justify-between">
        <div>
            <h1 class="my-3 text-2xl">Dobby ({{ version }})</h1>
            <p class="my-3">
                Create new Personal Access Token under
                <a
                    class="text-white"
                    target="_blank"
                    :href="apiUrl + '/api/manage'"
                    >your Dobby Account</a
                >
                and paste it in the following text field.
            </p>
            <form @submit.prevent="setAccessToken()">
                <input
                    v-model="accessToken"
                    class="w-full rounded-full border bg-transparent p-4 text-white"
                    type="text"
                    placeholder
                />
                <div class="mt-1">
                    <span class="text-sm italic"
                        >By adding an access token you confirm our usage
                        <a class="text-white" :href="imprintUrl"
                            >agreement and policy</a
                        >.</span
                    >
                </div>
                <button
                    type="submit"
                    class="mt-3 rounded-full border py-2 px-4 text-white"
                >
                    Save
                </button>
            </form>
            <div class="my-6">
                <label>
                    Show Connection where starting point is nearest.
                    <input
                        type="checkbox"
                        :checked="showNearestLocation"
                        @change="setShowNearestLocation()"
                    />
                </label>
            </div>
            <div v-if="user && user.id" class="mt-3">
                <p>
                    <b>
                        You are logged in as
                        <i>{{ user.name }}</i>
                    </b>
                </p>
                <p>
                    <a
                        :href="manageConnectionsUrl"
                        target="_blank"
                        class="mt-3 inline-block rounded-full border py-2 px-4 text-white no-underline"
                        >Manage connections</a
                    >
                </p>
            </div>
            <div v-else>Not authenticated</div>
        </div>
        <div class="footer">
            <div v-if="lat && lng && showNearestLocation">
                <p>Your current position: (Lat: {{ lat }}, Long: {{ lng }})</p>
            </div>
        </div>
    </div>
</template>
<script>
let getVersion = () => {
    let manifestData = chrome.runtime.getManifest()
    return manifestData.version
}

import ApiClient from './../core/api-client'
import location from './../core/location'
import settings from './../core/settings-service'
import storage from '../core/storage'

const client = new ApiClient()
export default {
    data() {
        return {
            apiUrl: client.getApiUrl(),
            version: getVersion(),
            accessToken: null,
            user: null,
            lat: null,
            lng: null,
            showNearestLocation: false,
        }
    },

    computed: {
        manageConnectionsUrl() {
            return this.apiUrl + '/manage'
        },
        imprintUrl() {
            return this.apiUrl + '/imprint'
        },
    },

    async mounted() {
        this.accessToken = await storage.get('access_token')
        this.user = await client.getUser()
        console.log('user', this.user)
        await this.getLocation()
        this.showNearestLocation = await settings.getSetting(
            'showNearestLocation'
        )
    },

    methods: {
        async setAccessToken() {
            await storage.set('access_token', this.accessToken)
            try {
                const user = await client.getUser()
                this.user = user
                await storage.set('user', this.user)
            } catch (error) {
                this.user = null
                let message = 'error while loading user'
                if (error.response && error.response.status === 401) {
                    message = 'not authenticated, please provide valid token'
                }
                alert(message)
            }
        },

        async getLocation() {
            const loc = await location.getLocation()
            this.lat = loc.latitude.toFixed(8)
            this.lng = loc.longitude.toFixed(8)
        },

        setShowNearestLocation() {
            this.showNearestLocation = !this.showNearestLocation
            settings.setSetting('showNearestLocation', this.showNearestLocation)
        },
    },
}
</script>
