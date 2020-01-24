import ApiClient from './api-client';
import moment from 'moment';
import settings from './settings';


export default {
    async updateConnection(location = null) {
        const client = new ApiClient();
        const showNearestLocation = settings.getSetting('showNearestLocation')
        log.debug('showNearestLocation:=', showNearestLocation)
        if (!showNearestLocation) {
            location = null;
        }

        log.debug('location:=', location);

        const connection = await client.getNextConnection(location);
        if (!connection) {
            return;
        }

        localStorage.setItem('connection', JSON.stringify(connection));
        const countdown = this.calculateCountdown(connection);
        this.setBadge(countdown);
        return connection;
    },

    calculateCountdown(connection) {
        let departure = moment.unix(connection.departure).utc();
        let now = moment().utc();
        let leaveIn = departure.diff(now, 'minutes');
        let leaveInHours = departure.diff(now, 'hours');
        leaveIn += leaveInHours * 60;
        leaveIn = leaveIn - connection.time_to_station;

        return leaveIn;
    },

    setBadge(countdown) {
        if (!countdown) {
            chrome.browserAction.setBadgeText({ text: 'setup' });
            chrome.browserAction.setBadgeBackgroundColor({ color: 'blue' });
            return;
        }

        if (countdown < 5) {
            chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
        } else {
            chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });
        }

        if (countdown > 60) {
            chrome.browserAction.setBadgeText({ text: '>60' });
        } else {
            chrome.browserAction.setBadgeText({ text: countdown + '' });
        }

    },
};
