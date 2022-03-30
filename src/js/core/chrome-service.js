export default {
    setBadge(countdown) {
        if (!countdown) {
            chrome.action.setBadgeText({ text: 'setup' })
            chrome.action.setBadgeBackgroundColor({ color: 'blue' })
            return
        }

        if (countdown < 5) {
            chrome.action.setBadgeBackgroundColor({ color: 'red' })
        } else {
            chrome.action.setBadgeBackgroundColor({ color: 'green' })
        }

        if (countdown > 60) {
            chrome.action.setBadgeText({ text: '>60' })
        } else {
            chrome.action.setBadgeText({ text: countdown + '' })
        }
    },
}
