import moment from 'moment'

export default {
    calculateCountdown(connection, nextConnection) {
        if (!connection || !nextConnection) {
            return null
        }
        let departure = moment.unix(nextConnection.departure_at).utc()
        let now = moment().utc()
        let leaveIn = departure.diff(now, 'minutes')
        let leaveInHours = departure.diff(now, 'hours')
        leaveIn += leaveInHours * 60
        leaveIn = leaveIn - connection.time_to_station

        if (leaveIn > 60) {
            return '>60'
        }

        if (leaveIn <= 0) {
            return 'now'
        }

        return leaveIn
    },
}
