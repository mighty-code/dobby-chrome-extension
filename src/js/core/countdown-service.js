import { parseISO, differenceInMinutes, differenceInHours } from 'date-fns'

export default {
    calculateCountdown(connection, nextConnection) {
        if (!connection || !nextConnection) {
            return null
        }

        let departure = parseISO(nextConnection.departure_at)
        let now = new Date()
        let leaveIn = differenceInMinutes(departure, now)
        let leaveInHours = differenceInHours(departure, now)
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
