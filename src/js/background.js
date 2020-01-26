'use strict'

// this need to be and event page: https://developer.chrome.com/extensions/event_pages
// based on example https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/extensions/gmail/

import BackgroundWorker from './components/background'
const worker = new BackgroundWorker()
worker.init()

import * as log from 'loglevel'
if (process.env.NODE_ENV === 'production') {
    log.setLevel(log.levels.ERROR)
} else {
    log.setLevel(log.levels.DEBUG)
}
window.log = log

chrome.runtime.onInstalled.addListener(details => {
    log.debug('previousVersion', details.previousVersion)

    let manifestData = chrome.runtime.getManifest()

    // https://developer.chrome.com/extensions/runtime#event-onInstalled

    // "install", "update", "chrome_update", or "shared_module_update"
    let reason = details.reason
    let previousVersion = details.previousVersion

    if (reason === 'update' && previousVersion !== manifestData.version) {
        let message = chrome.i18n.getMessage(
            'updateSuccessful',
            previousVersion
        )
        alert(message)
    }
})
