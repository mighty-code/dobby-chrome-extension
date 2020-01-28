import ApiClient from './api-client'
import settings from './settings-service'
import chrome from './chrome-service'
import countdownService from './countdown-service'

export default {
    async updateConnection(location = null) {
        const client = new ApiClient()
        const showNearestLocation = settings.getSetting('showNearestLocation')
        log.debug('showNearestLocation:=', showNearestLocation)
        if (!showNearestLocation) {
            location = null
        }

        const connection = await client.getNextConnection(location)
        if (!connection) {
            return
        }

        const countdown = countdownService.calculateCountdown(
            connection,
            this.getNextConnection(connection)
        )
        chrome.setBadge(countdown)
        return connection
    },

    setConnection(connection) {
        localStorage.setItem('connection', JSON.stringify(connection))
    },

    getConnection() {
        const connection = localStorage.getItem('connection')
        if (connection) {
            return JSON.parse(connection)
        }

        return null
    },

    getNextConnection(connection) {
        return connection.timetable[0]
    },
}
