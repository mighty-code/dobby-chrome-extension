import ApiClient from './api-client'
import settings from './settings-service'
import chrome from './chrome-service'
import countdownService from './countdown-service'
import storage from '../core/storage'

export default {
    async updateConnection(location = null) {
        const client = new ApiClient()
        const showNearestLocation = await settings.getSetting(
            'showNearestLocation'
        )
        console.debug('showNearestLocation:=', showNearestLocation)
        if (!showNearestLocation) {
            location = null
        }

        const connection = await client.getNextConnection(location)
        if (!connection) {
            return
        }

        const countdown = countdownService.calculateCountdown(
            connection,
            await this.getNextConnection(connection)
        )

        chrome.setBadge(countdown)
        return connection
    },

    async setConnection(connection) {
        return storage.set('connection', connection)
    },

    async getConnection() {
        const connection = await storage.get('connection')
        if (connection) {
            return connection
        }

        return null
    },

    getNextConnection(connection) {
        return Array.isArray(connection.timetable)
            ? connection.timetable[0]
            : null
    },
}
