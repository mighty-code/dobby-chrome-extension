import location from './../core/location'
import connectionService from '../core/connection-service'

export default class {
    init() {
        this.apiUrl = process.env.MIX_API_URL
        this.registerScheduler()
        this.refresh()
    }

    registerScheduler() {
        chrome.alarms.create('refresh', { periodInMinutes: 1 })

        let self = this
        chrome.alarms.onAlarm.addListener((alarm) => {
            self.onAlarm(alarm, self)
        })
    }

    onAlarm(alarm, instance) {
        if (alarm.name === 'refresh') {
            instance.refresh()
        }
    }

    async refresh() {
        let connection = null
        try {
            const loc = await location.getLocation()
            console.log('loc', loc)
            if (loc) {
                connection = await connectionService.updateConnection(loc)
            } else {
                connection = await connectionService.updateConnection()
            }
        } catch (error) {
            console.error(error)
            connection = await connectionService.updateConnection()
        }

        connectionService.setConnection(connection)
    }
}
