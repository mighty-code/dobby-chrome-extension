import Echo from 'laravel-echo'
const Pusher = require('pusher-js')

const token = localStorage.getItem('access_token')

let options = {
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    wsHost: process.env.MIX_PUSHER_HOST,
    wsPort: 443,
    enabledTransports: ['ws'],
    encrypted: true,
    authEndpoint: `${process.env.MIX_API_URL}/broadcasting/auth`,
    disableStats: true,
    auth: {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
    },
}

Pusher.logToConsole = process.env.NODE_ENV === 'development'
options.client = new Pusher(options.key, options)

let echo = new Echo(options)

export default echo
