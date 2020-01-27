import countdownService from '../core/connection-service'
import location from './../core/location'
import connectionService from '../core/connection-service'

export default class {
    init() {
        this.apiUrl = process.env.MIX_API_URL
        this.registerScheduler()
        this.refresh()

        // navigator.geolocation.watchPosition(location => {
        //     this.refresh();
        // }, error => {
        //     log.error(`ERROR(${error.code}): ${error.message}`);
        // })
    }
    registerScheduler() {
        chrome.alarms.create('refresh', { periodInMinutes: 1 })

        let self = this
        chrome.alarms.onAlarm.addListener(alarm => {
            self.onAlarm(alarm, self)
        })
    }
    onAlarm(alarm, intance) {
        log.debug(alarm)
        // chrome.notifications.create(
        //     alarm.scheduledTime + '',
        //     {
        //         type: 'basic',
        //         iconUrl: 'images/icon.png',
        //         title: 'This is a notification',
        //         message: `alarm: ${alarm.name}`,
        //     },
        //     function() {}
        // );

        if (alarm.name === 'refresh') {
            intance.refresh()
        }
    }

    async refresh() {
        let connection = null
        try {
            const loc = await location.getLocation()
            if (loc) {
                connection = await connectionService.updateConnection(loc)
            } else {
                connection = await connectionService.updateConnection()
            }
        } catch (error) {
            connection = await connectionService.updateConnection()
        }

        connectionService.setConnection(connection)
    }
}
