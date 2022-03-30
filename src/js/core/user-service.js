import storage from '../core/storage'

export default {
    async getUser() {
        const user = await storage.get('user')
        try {
            return user
        } catch (e) {
            console.error("can't load user...", e)
        }

        return null
    },
}
