import storage from '../core/storage'

export default class {
    constructor() {
        this.apiUrl = process.env.MIX_API_URL
    }

    getHeaders(token) {
        return {
            Accept: 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        }
    }

    async getNextConnection(location = null) {
        let url = `${this.apiUrl}/api/connections/timetable`
        if (location) {
            url += `?lat=${location.latitude}&lng=${location.longitude}`
        }

        console.debug('getNextConnection() url:=', url)

        const connection = await this.request(url)
        console.debug('getNextConnection() connection:=', connection)
        return connection
    }

    async getUser() {
        return await this.request(`${this.apiUrl}/api/user`)
    }

    async getAccessToken() {
        const accessToken = await storage.get('access_token')
        return accessToken
    }

    getApiUrl() {
        return this.apiUrl
    }

    isOnline() {
        if (navigator.onLine) {
            return true
        } else {
            return false
        }
    }

    async request(url) {
        if (!this.isOnline()) {
            console.warn('huston, we have a problem: no internet here...')
            return null
        }

        const accessToken = await this.getAccessToken()
        if (!accessToken) {
            console.warn('has no access token!')
            return Promise.resolve(null)
        }

        let headers = this.getHeaders(accessToken)
        const response = await fetch(url, { headers })

        const data = await response.json()
        return data.data ?? data
    }
}
