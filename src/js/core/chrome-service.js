export default {
    setBadge(countdown) {
        if (!countdown) {
            chrome.browserAction.setBadgeText({ text: 'setup' })
            chrome.browserAction.setBadgeBackgroundColor({ color: 'blue' })
            return
        }

        if (countdown < 5) {
            chrome.browserAction.setBadgeBackgroundColor({ color: 'red' })
        } else {
            chrome.browserAction.setBadgeBackgroundColor({ color: 'green' })
        }

        if (countdown > 60) {
            chrome.browserAction.setBadgeText({ text: '>60' })
        } else {
            chrome.browserAction.setBadgeText({ text: countdown + '' })
        }
    },
}
