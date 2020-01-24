import axios from 'axios';

export default class {
    constructor() {
        this.apiUrl = process.env.MIX_API_URL;
    }

    getHeaders(token) {
        return {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }

    async getNextConnection(location = null) {
        let url = `${this.apiUrl}/api/connection/next`;
        if (location) {
            url += `?lat=${location.latitude}&lng=${location.longitude}`;
        }

        log.debug('getNextConnection() url:=', url);

        const connection = await this.request(url);
        log.debug('getNextConnection() connection:=', connection);
        return connection;
    }

    async getUser() {
        return await this.request(`${this.apiUrl}/api/user`);
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        return accessToken;
    }

    getApiUrl() {
        return this.apiUrl;
    }

    isOnline() {
        if (navigator.onLine) {
            return true;
        } else {
            return false;
        }
    }

    async request(url) {

        if(!this.isOnline()) {
            log.warn('huston, we have a problem: no internet here...')
            return Promise.resolve(null);
        }

        const accessToken = this.getAccessToken();
        if (!accessToken) {
            log.warn('has no access token!')
            return Promise.resolve(null);
        }

        let headers = this.getHeaders(accessToken);
        const { data } = await axios.get(url, { headers });
        return data.data;
    }
}
