function getSettings() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    if (!settings) {
        settings = {};
    }
    return settings;
}

export default {
    setSetting(name, value) {
        const settings = getSettings();

        settings[name] = value;

        localStorage.setItem('settings', JSON.stringify(settings));
    },
    getSetting(name) {
        const settings = getSettings();

        return settings[name];
    },
};
