export default {
    async get(key) {
        // console.log('getting key:=', key)
        try {
            const result = await chrome.storage.sync.get([key])
            if (chrome.runtime.lastError) {
                throw new Error(chrome.runtime.lastError)
            }
            if (Object.keys(result).length === 0) {
                return null
            }

            return JSON.parse(result[key])
        } catch (e) {
            console.error(e)
            return null
        }
    },

    async set(key, value) {
        // console.log('setting key:=', key, 'value:=', value)
        const obj = {}
        obj[key] = JSON.stringify(value)
        await chrome.storage.sync.set(obj)
        if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError)
        }

        // console.log('setting set!')
    },
}
