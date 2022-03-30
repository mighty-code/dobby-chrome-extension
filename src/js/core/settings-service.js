import storage from '../core/storage'

async function getSettings() {
    let settings = await storage.get('settings')
    if (!settings) {
        settings = {}
    }
    return settings
}

export default {
    async setSetting(name, value) {
        const settings = await getSettings()

        settings[name] = value

        await storage.set('settings', settings)
    },
    async getSetting(name) {
        const settings = await getSettings()

        return settings[name]
    },
}
