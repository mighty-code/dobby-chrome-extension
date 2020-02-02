export default {
    getUser() {
        const user = localStorage.getItem('user')
        try {
            return JSON.parse(user)
        } catch (e) {
            log.error("can't load user...", e)
        }

        return null
    },
}
